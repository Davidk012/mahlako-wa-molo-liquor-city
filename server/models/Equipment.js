const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['tent', 'chairs', 'lowering-device', 'artificial-grass', 'drapes', 'sound-system', 'cctv', 'other'],
    required: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    enum: ['item', 'per-100', 'per-sqm', 'per-hour'],
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  available: {
    type: Boolean,
    default: true
  },
  totalQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  currentlyRented: {
    type: Number,
    default: 0,
    min: 0
  },
  specifications: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    material: String,
    color: String
  },
  maintenanceSchedule: {
    lastMaintenance: Date,
    nextMaintenance: Date
  }
}, {
  timestamps: true
});

// Virtual for available quantity
equipmentSchema.virtual('availableQuantity').get(function() {
  return this.totalQuantity - this.currentlyRented;
});

// Method to check availability for quantity
equipmentSchema.methods.isAvailable = function(quantity) {
  return this.available && (this.totalQuantity - this.currentlyRented) >= quantity;
};

// Index for search
equipmentSchema.index({ name: 'text', description: 'text' });
equipmentSchema.index({ category: 1 });
equipmentSchema.index({ available: 1 });

module.exports = mongoose.model('Equipment', equipmentSchema);
