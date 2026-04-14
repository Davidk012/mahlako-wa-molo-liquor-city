const express = require('express');
const Equipment = require('../models/Equipment');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/equipment
// @desc    Get all equipment
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      available,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (available === 'true') {
      query.available = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const equipment = await Equipment.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Equipment.countDocuments(query);

    res.json({
      success: true,
      data: equipment,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching equipment'
    });
  }
});

// @route   GET /api/equipment/:id
// @desc    Get single equipment item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    res.json({
      success: true,
      data: equipment
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching equipment'
    });
  }
});

// @route   POST /api/equipment
// @desc    Create new equipment
// @access  Private (Admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      basePrice,
      unit,
      totalQuantity,
      specifications,
      image
    } = req.body;

    // Validate required fields
    if (!name || !description || !category || !basePrice || !unit || !totalQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create equipment
    const equipment = new Equipment({
      name,
      description,
      category,
      basePrice,
      unit,
      totalQuantity,
      currentlyRented: 0,
      specifications,
      image
    });

    await equipment.save();

    res.status(201).json({
      success: true,
      message: 'Equipment created successfully',
      data: equipment
    });
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating equipment'
    });
  }
});

// @route   PUT /api/equipment/:id
// @desc    Update equipment
// @access  Private (Admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Equipment updated successfully',
      data: updatedEquipment
    });
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating equipment'
    });
  }
});

// @route   DELETE /api/equipment/:id
// @desc    Delete equipment
// @access  Private (Admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // Check if equipment is currently rented
    if (equipment.currentlyRented > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete equipment that is currently rented'
      });
    }

    await Equipment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Equipment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting equipment'
    });
  }
});

// @route   GET /api/equipment/:id/availability
// @desc    Check equipment availability for a specific date
// @access  Public
router.get('/:id/availability', async (req, res) => {
  try {
    const { date, quantity = 1 } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const equipment = await Equipment.findById(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    const isAvailable = equipment.isAvailable(parseInt(quantity));
    const availableQuantity = equipment.totalQuantity - equipment.currentlyRented;

    res.json({
      success: true,
      data: {
        available: isAvailable,
        availableQuantity,
        totalQuantity: equipment.totalQuantity,
        requestedQuantity: parseInt(quantity)
      }
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking availability'
    });
  }
});

// @route   POST /api/equipment/bulk-check
// @desc    Check availability for multiple equipment items
// @access  Public
router.post('/bulk-check', async (req, res) => {
  try {
    const { items, date } = req.body;

    if (!items || !Array.isArray(items) || !date) {
      return res.status(400).json({
        success: false,
        message: 'Items array and date are required'
      });
    }

    const availabilityChecks = await Promise.all(
      items.map(async (item) => {
        const equipment = await Equipment.findById(item.equipmentId);
        return {
          equipmentId: item.equipmentId,
          name: equipment ? equipment.name : 'Unknown',
          requestedQuantity: item.quantity,
          available: equipment ? equipment.isAvailable(item.quantity) : false,
          availableQuantity: equipment ? equipment.totalQuantity - equipment.currentlyRented : 0
        };
      })
    );

    const allAvailable = availabilityChecks.every(check => check.available);

    res.json({
      success: true,
      data: {
        allAvailable,
        items: availabilityChecks
      }
    });
  } catch (error) {
    console.error('Error checking bulk availability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking availability'
    });
  }
});

module.exports = router;
