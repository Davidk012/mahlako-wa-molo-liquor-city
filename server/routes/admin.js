const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', auth, authorize('admin'), async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Basic stats
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'client' });
    const totalEquipment = await Equipment.countDocuments();

    // Current month stats
    const currentMonthBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Last month stats
    const lastMonthBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
    });

    // Revenue calculations
    const currentMonthRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          paymentStatus: { $in: ['paid', 'partial'] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
          deposits: { $sum: '$depositPaid' }
        }
      }
    ]);

    const lastMonthRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth },
          paymentStatus: { $in: ['paid', 'partial'] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
          deposits: { $sum: '$depositPaid' }
        }
      }
    ]);

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('clientId', 'firstName lastName company')
      .sort({ createdAt: -1 })
      .limit(10);

    // Equipment utilization
    const equipmentStats = await Equipment.aggregate([
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$totalQuantity' },
          currentlyRented: { $sum: '$currentlyRented' }
        }
      }
    ]);

    const utilization = equipmentStats.length > 0 
      ? Math.round((equipmentStats[0].currentlyRented / equipmentStats[0].totalQuantity) * 100)
      : 0;

    // Status breakdown
    const bookingStatuses = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusBreakdown = bookingStatuses.reduce((acc, status) => {
      acc[status._id] = status.count;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        stats: {
          totalBookings,
          totalUsers,
          totalEquipment,
          currentMonthBookings,
          lastMonthBookings,
          bookingGrowth: lastMonthBookings > 0 
            ? Math.round(((currentMonthBookings - lastMonthBookings) / lastMonthBookings) * 100)
            : 0,
          currentMonthRevenue: currentMonthRevenue[0] || { total: 0, deposits: 0 },
          lastMonthRevenue: lastMonthRevenue[0] || { total: 0, deposits: 0 },
          revenueGrowth: lastMonthRevenue[0]?.total > 0
            ? Math.round(((currentMonthRevenue[0]?.total - lastMonthRevenue[0]?.total) / lastMonthRevenue[0]?.total) * 100)
            : 0,
          utilization
        },
        recentBookings,
        statusBreakdown
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard data'
    });
  }
});

// @route   GET /api/admin/reports/:type
// @desc    Generate various reports
// @access  Private (Admin only)
router.get('/reports/:type', auth, authorize('admin'), async (req, res) => {
  try {
    const { type } = req.params;
    const { 
      startDate, 
      endDate, 
      format = 'json',
      groupBy = 'day'
    } = req.query;

    let report = {};

    switch (type) {
      case 'revenue':
        const matchStage = {};
        if (startDate || endDate) {
          matchStage.createdAt = {};
          if (startDate) matchStage.createdAt.$gte = new Date(startDate);
          if (endDate) matchStage.createdAt.$lte = new Date(endDate);
        }

        const revenueData = await Booking.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: groupBy === 'month' 
                ? { $dateToString: { format: "%Y-%m", date: "$createdAt" } }
                : { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              revenue: { $sum: '$totalAmount' },
              deposits: { $sum: '$depositPaid' },
              bookings: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ]);

        report = {
          type: 'revenue',
          data: revenueData,
          summary: {
            totalRevenue: revenueData.reduce((sum, item) => sum + item.revenue, 0),
            totalDeposits: revenueData.reduce((sum, item) => sum + item.deposits, 0),
            totalBookings: revenueData.reduce((sum, item) => sum + item.bookings, 0)
          }
        };
        break;

      case 'equipment':
        const equipmentUsage = await Equipment.aggregate([
          {
            $lookup: {
              from: 'bookings',
              localField: '_id',
              foreignField: 'items.equipmentId',
              as: 'bookings'
            }
          },
          {
            $project: {
              name: 1,
              category: 1,
              totalQuantity: 1,
              currentlyRented: 1,
              utilizationRate: {
                $multiply: [
                  { $divide: ['$currentlyRented', '$totalQuantity'] },
                  100
                ]
              },
              totalBookings: { $size: '$bookings' }
            }
          },
          { $sort: { utilizationRate: -1 } }
        ]);

        report = {
          type: 'equipment',
          data: equipmentUsage,
          summary: {
            totalEquipment: equipmentUsage.length,
            averageUtilization: equipmentUsage.reduce((sum, item) => sum + item.utilizationRate, 0) / equipmentUsage.length
          }
        };
        break;

      case 'clients':
        const clientStats = await User.aggregate([
          { $match: { role: 'client' } },
          {
            $lookup: {
              from: 'bookings',
              localField: '_id',
              foreignField: 'clientId',
              as: 'bookings'
            }
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              email: 1,
              company: 1,
              createdAt: 1,
              totalBookings: { $size: '$bookings' },
              totalSpent: { $sum: '$bookings.totalAmount' },
              lastBookingDate: { $max: '$bookings.funeralDate' }
            }
          },
          { $sort: { totalSpent: -1 } }
        ]);

        report = {
          type: 'clients',
          data: clientStats,
          summary: {
            totalClients: clientStats.length,
            averageBookingsPerClient: clientStats.reduce((sum, client) => sum + client.totalBookings, 0) / clientStats.length,
            totalClientRevenue: clientStats.reduce((sum, client) => sum + client.totalSpent, 0)
          }
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    if (format === 'csv') {
      // Convert to CSV format (simplified)
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${type}-report.csv`);
      return res.send(convertToCSV(report.data));
    }

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error generating report'
    });
  }
});

// @route   GET /api/admin/settings
// @desc    Get system settings
// @access  Private (Admin only)
router.get('/settings', auth, authorize('admin'), async (req, res) => {
  try {
    // In a real application, these would be stored in a settings collection
    const settings = {
      business: {
        name: 'Style Funeral Services',
        email: 'info@sfs.co.za',
        phone: '+27 12 345 6789',
        address: '123 Funeral Street, Pretoria, South Africa'
      },
      booking: {
        defaultDeliveryFee: 150,
        depositPercentage: 50,
        cancellationHours: 24,
        autoReminders: true
      },
      payment: {
        payfastEnabled: true,
        yocoEnabled: true,
        ozowEnabled: false
      },
      notifications: {
        whatsappEnabled: true,
        emailEnabled: true,
        smsEnabled: false
      }
    };

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching settings'
    });
  }
});

// @route   PUT /api/admin/settings
// @desc    Update system settings
// @access  Private (Admin only)
router.put('/settings', auth, authorize('admin'), async (req, res) => {
  try {
    // In a real application, these would be stored in a settings collection
    const settings = req.body;

    // Validate settings structure
    const allowedSections = ['business', 'booking', 'payment', 'notifications'];
    for (const section of Object.keys(settings)) {
      if (!allowedSections.includes(section)) {
        return res.status(400).json({
          success: false,
          message: `Invalid settings section: ${section}`
        });
      }
    }

    // Update settings in database (simplified for demo)
    // await Settings.findOneAndUpdate({}, { $set: settings }, { upsert: true });

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating settings'
    });
  }
});

// Helper function to convert data to CSV
function convertToCSV(data) {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
    }).join(',');
  });

  return [csvHeaders, ...csvRows].join('\n');
}

module.exports = router;
