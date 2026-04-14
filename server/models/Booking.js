const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'setup', 'collected', 'cancelled', 'completed'],
    default: 'pending'
  },
  funeralDate: {
    type: Date,
    required: true
  },
  funeralTime: {
    type: String,
    required: true
  },
  cemetery: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  items: [{
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  packages: [{
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  deliveryFee: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  depositPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  balancePaid: {
    type: Number,
    default: 0,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending'
  },
  assignedStaff: {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    setupCrew: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  notes: {
    type: String,
    trim: true
  },
  specialInstructions: {
    type: String,
    trim: true
  },
  contactPerson: {
    name: String,
    phone: String
  },
  timeline: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'whatsapp', 'sms'],
      required: true
    },
    scheduledFor: Date,
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ clientId: 1 });
bookingSchema.index({ funeralDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'assignedStaff.driver': 1 });
bookingSchema.index({ 'assignedStaff.setupCrew': 1 });

// Method to calculate total amount
bookingSchema.methods.calculateTotal = function() {
  let total = this.deliveryFee;
  
  // Add items total
  this.items.forEach(item => {
    total += item.price * item.quantity;
  });
  
  // Add packages total
  this.packages.forEach(pkg => {
    total += pkg.price * pkg.quantity;
  });
  
  this.totalAmount = total;
  return total;
};

// Method to update payment status
bookingSchema.methods.updatePaymentStatus = function() {
  const totalPaid = (this.depositPaid || 0) + (this.balancePaid || 0);
  
  if (totalPaid >= this.totalAmount) {
    this.paymentStatus = 'paid';
  } else if (totalPaid > 0) {
    this.paymentStatus = 'partial';
  } else {
    this.paymentStatus = 'pending';
  }
};

// Method to add timeline entry
bookingSchema.methods.addTimelineEntry = function(status, notes, updatedBy) {
  this.timeline.push({
    status,
    notes,
    updatedBy
  });
  this.status = status;
};

// Pre-save middleware to ensure funeralDate is in the future
bookingSchema.pre('save', function(next) {
  if (this.funeralDate && this.funeralDate < new Date()) {
    return next(new Error('Funeral date cannot be in the past'));
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
