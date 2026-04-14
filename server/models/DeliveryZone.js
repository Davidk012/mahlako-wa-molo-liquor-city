const mongoose = require('mongoose');

const deliveryZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    lng: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    },
    radius: {
      type: Number,
      required: true,
      min: 0.1 // radius in km
    }
  },
  baseFee: {
    type: Number,
    required: true,
    min: 0
  },
  perKmFee: {
    type: Number,
    required: true,
    min: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Method to calculate delivery fee for a location
deliveryZoneSchema.methods.calculateDeliveryFee = function(destinationLat, destinationLng) {
  const distance = this.calculateDistance(
    this.coordinates.lat,
    this.coordinates.lng,
    destinationLat,
    destinationLng
  );
  
  return this.baseFee + (distance * this.perKmFee);
};

// Method to check if location is within zone
deliveryZoneSchema.methods.isLocationInZone = function(lat, lng) {
  const distance = this.calculateDistance(
    this.coordinates.lat,
    this.coordinates.lng,
    lat, lng
  );
  
  return distance <= this.coordinates.radius;
};

// Helper method to calculate distance between two points (Haversine formula)
deliveryZoneSchema.methods.calculateDistance = function(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = this.toRadians(lat2 - lat1);
  const dLng = this.toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Helper method to convert degrees to radians
deliveryZoneSchema.methods.toRadians = function(degrees) {
  return degrees * (Math.PI / 180);
};

// Static method to find applicable zone for a location
deliveryZoneSchema.statics.findApplicableZone = async function(lat, lng) {
  return this.findOne({
    active: true,
    coordinates: {
      $geoWithin: {
        $centerSphere: [[lng, lat], 50 / 6371] // 50km radius, converted to radians
      }
    }
  }).sort({ 'coordinates.radius': 1 });
};

module.exports = mongoose.model('DeliveryZone', deliveryZoneSchema);
