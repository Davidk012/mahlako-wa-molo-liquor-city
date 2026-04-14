const express = require('express');
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const Package = require('../models/Package');
const DeliveryZone = require('../models/DeliveryZone');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/bookings
// @desc    Get all bookings (with filtering)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      clientId,
      startDate,
      endDate,
      sortBy = 'funeralDate',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    const query = {};

    if (status) {
      query.status = status;
    }

    if (clientId) {
      query.clientId = clientId;
    }

    if (startDate || endDate) {
      query.funeralDate = {};
      if (startDate) query.funeralDate.$gte = new Date(startDate);
      if (endDate) query.funeralDate.$lte = new Date(endDate);
    }

    // Role-based filtering
    if (req.user.role === 'client') {
      query.clientId = req.user._id;
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const bookings = await Booking.find(query)
      .populate('clientId', 'firstName lastName email company')
      .populate('items.equipmentId', 'name unit')
      .populate('packages.packageId', 'name description')
      .populate('assignedStaff.driver', 'firstName lastName')
      .populate('assignedStaff.setupCrew', 'firstName lastName')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching bookings'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('clientId', 'firstName lastName email company phone')
      .populate('items.equipmentId', 'name unit description image')
      .populate('packages.packageId', 'name description items')
      .populate('assignedStaff.driver', 'firstName lastName phone')
      .populate('assignedStaff.setupCrew', 'firstName lastName phone')
      .populate('timeline.updatedBy', 'firstName lastName');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'client' && booking.clientId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching booking'
    });
  }
});

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      funeralDate,
      funeralTime,
      cemetery,
      items,
      packages,
      contactPerson,
      contactPhone,
      notes
    } = req.body;

    // Validate required fields
    if (!funeralDate || !funeralTime || !cemetery || !cemetery.address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if ((!items || items.length === 0) && (!packages || packages.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one item or package'
      });
    }

    // Check equipment availability
    const availabilityChecks = await Promise.all(
      (items || []).map(async (item) => {
        const equipment = await Equipment.findById(item.equipmentId);
        if (!equipment) {
          return { available: false, reason: 'Equipment not found' };
        }
        return {
          equipmentId: item.equipmentId,
          available: equipment.isAvailable(item.quantity),
          name: equipment.name
        };
      })
    );

    const unavailableItems = availabilityChecks.filter(check => !check.available);
    if (unavailableItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Some items are not available',
        data: unavailableItems
      });
    }

    // Calculate delivery fee
    let deliveryFee = 0;
    try {
      // For now, use a simple calculation. In production, use geocoding
      deliveryFee = 150; // Base delivery fee
    } catch (error) {
      console.error('Error calculating delivery fee:', error);
      deliveryFee = 150; // Default fee
    }

    // Calculate total amount
    let itemsTotal = 0;
    if (items && items.length > 0) {
      itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    let packagesTotal = 0;
    if (packages && packages.length > 0) {
      packagesTotal = packages.reduce((total, pkg) => total + (pkg.price * pkg.quantity), 0);
    }

    const totalAmount = itemsTotal + packagesTotal + deliveryFee;

    // Create booking
    const booking = new Booking({
      clientId: req.user._id,
      funeralDate,
      funeralTime,
      cemetery,
      items: items || [],
      packages: packages || [],
      deliveryFee,
      totalAmount,
      contactPerson,
      contactPhone,
      notes,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Add timeline entry
    booking.addTimelineEntry('pending', 'Booking created', req.user._id);

    await booking.save();

    // Update equipment rental counts
    if (items && items.length > 0) {
      await Promise.all(
        items.map(async (item) => {
          await Equipment.findByIdAndUpdate(
            item.equipmentId,
            { $inc: { currentlyRented: item.quantity } }
          );
        })
      );
    }

    // Populate and return booking
    const populatedBooking = await Booking.findById(booking._id)
      .populate('clientId', 'firstName lastName email')
      .populate('items.equipmentId', 'name unit')
      .populate('packages.packageId', 'name');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: populatedBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating booking'
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'client' && booking.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Don't allow updates after booking is confirmed
    if (booking.status !== 'pending' && req.user.role === 'client') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update confirmed booking'
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('clientId', 'firstName lastName email')
     .populate('items.equipmentId', 'name unit')
     .populate('packages.packageId', 'name');

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating booking'
    });
  }
});

// @route   PATCH /api/bookings/:id/status
// @desc    Update booking status
// @access  Private (Admin/Staff)
router.patch('/:id/status', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const { status, notes } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Add timeline entry
    booking.addTimelineEntry(status, notes || `Status changed to ${status}`, req.user._id);
    await booking.save();

    // Update equipment counts when booking is collected
    if (status === 'collected') {
      await Promise.all(
        booking.items.map(async (item) => {
          await Equipment.findByIdAndUpdate(
            item.equipmentId,
            { $inc: { currentlyRented: -item.quantity } }
          );
        })
      );
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating booking status'
    });
  }
});

// @route   POST /api/bookings/quote
// @desc    Calculate quote for booking
// @access  Public
router.post('/quote', async (req, res) => {
  try {
    const {
      funeralDate,
      cemetery,
      items,
      packages
    } = req.body;

    if (!funeralDate || !cemetery || !cemetery.address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if ((!items || items.length === 0) && (!packages || packages.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one item or package'
      });
    }

    // Calculate items total
    let itemsTotal = 0;
    if (items && items.length > 0) {
      itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calculate packages total
    let packagesTotal = 0;
    if (packages && packages.length > 0) {
      packagesTotal = packages.reduce((total, pkg) => total + (pkg.price * pkg.quantity), 0);
    }

    // Calculate delivery fee (simplified for now)
    let deliveryFee = 150; // Base fee
    // In production, calculate based on distance from delivery zones

    const totalAmount = itemsTotal + packagesTotal + deliveryFee;

    res.json({
      success: true,
      data: {
        itemsTotal,
        packagesTotal,
        deliveryFee,
        totalAmount
      }
    });
  } catch (error) {
    console.error('Error calculating quote:', error);
    res.status(500).json({
      success: false,
      message: 'Server error calculating quote'
    });
  }
});

// @route   GET /api/bookings/client/:clientId
// @desc    Get bookings for a specific client
// @access  Private
router.get('/client/:clientId', auth, async (req, res) => {
  try {
    const { clientId } = req.params;

    // Check permissions
    if (req.user.role === 'client' && clientId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const bookings = await Booking.find({ clientId })
      .populate('items.equipmentId', 'name unit')
      .populate('packages.packageId', 'name')
      .sort({ funeralDate: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching client bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching client bookings'
    });
  }
});

// @route   GET /api/bookings/staff/:staffId
// @desc    Get bookings assigned to staff member
// @access  Private
router.get('/staff/:staffId', auth, async (req, res) => {
  try {
    const { staffId } = req.params;

    // Check permissions
    if (req.user.role === 'staff' && staffId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const bookings = await Booking.find({
      $or: [
        { 'assignedStaff.driver': staffId },
        { 'assignedStaff.setupCrew': staffId }
      ]
    })
      .populate('clientId', 'firstName lastName company')
      .populate('items.equipmentId', 'name')
      .populate('packages.packageId', 'name')
      .sort({ funeralDate: 1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching staff bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching staff bookings'
    });
  }
});

module.exports = router;
