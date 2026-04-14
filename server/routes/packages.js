const express = require('express');
const Package = require('../models/Package');
const Equipment = require('../models/Equipment');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/packages
// @desc    Get all packages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      popular,
      active = true,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    const query = { active };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (popular === 'true') {
      query.popular = true;
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const packages = await Package.find(query)
      .populate('items.equipmentId', 'name unit basePrice')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Package.countDocuments(query);

    res.json({
      success: true,
      data: packages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching packages'
    });
  }
});

// @route   GET /api/packages/:id
// @desc    Get single package
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id)
      .populate('items.equipmentId', 'name unit basePrice description image');

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      data: packageData
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching package'
    });
  }
});

// @route   POST /api/packages
// @desc    Create new package
// @access  Private (Admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      items,
      category,
      popular,
      image
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate items
    for (const item of items) {
      if (!item.equipmentId || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have equipmentId and quantity'
        });
      }

      // Check if equipment exists
      const equipment = await Equipment.findById(item.equipmentId);
      if (!equipment) {
        return res.status(400).json({
          success: false,
          message: `Equipment with ID ${item.equipmentId} not found`
        });
      }
    }

    // Create package
    const packageData = new Package({
      name,
      description,
      price,
      items,
      category,
      popular: popular || false,
      image
    });

    await packageData.save();

    // Populate and return
    const populatedPackage = await Package.findById(packageData._id)
      .populate('items.equipmentId', 'name unit basePrice');

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: populatedPackage
    });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating package'
    });
  }
});

// @route   PUT /api/packages/:id
// @desc    Update package
// @access  Private (Admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    // Validate items if provided
    if (req.body.items) {
      for (const item of req.body.items) {
        if (item.equipmentId) {
          const equipment = await Equipment.findById(item.equipmentId);
          if (!equipment) {
            return res.status(400).json({
              success: false,
              message: `Equipment with ID ${item.equipmentId} not found`
            });
          }
        }
      }
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('items.equipmentId', 'name unit basePrice');

    res.json({
      success: true,
      message: 'Package updated successfully',
      data: updatedPackage
    });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating package'
    });
  }
});

// @route   DELETE /api/packages/:id
// @desc    Delete package
// @access  Private (Admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    await Package.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Package deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting package'
    });
  }
});

// @route   GET /api/packages/:id/availability
// @desc    Check package availability for a specific date
// @access  Public
router.get('/:id/availability', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const packageData = await Package.findById(req.params.id)
      .populate('items.equipmentId', 'name totalQuantity currentlyRented');
    
    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    const isAvailable = await packageData.isAvailable();
    const itemsAvailability = packageData.items.map(item => ({
      equipmentId: item.equipmentId._id,
      name: item.equipmentId.name,
      requiredQuantity: item.quantity,
      availableQuantity: item.equipmentId.totalQuantity - item.equipmentId.currentlyRented,
      available: item.equipmentId.totalQuantity - item.equipmentId.currentlyRented >= item.quantity
    }));

    res.json({
      success: true,
      data: {
        available: isAvailable,
        items: itemsAvailability
      }
    });
  } catch (error) {
    console.error('Error checking package availability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking package availability'
    });
  }
});

// @route   GET /api/packages/categories
// @desc    Get package categories
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Package.distinct('category');
    
    res.json({
      success: true,
      data: categories.map(cat => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1)
      }))
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching categories'
    });
  }
});

module.exports = router;
