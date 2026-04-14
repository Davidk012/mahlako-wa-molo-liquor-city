const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
    min: 0
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
    }
  }],
  image: {
    type: String,
    default: ''
  },
  popular: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['basic', 'professional', 'vip', 'custom'],
    default: 'custom'
  }
}, {
  timestamps: true
});

// Method to check package availability
packageSchema.methods.isAvailable = async function() {
  const Equipment = mongoose.model('Equipment');
  
  for (const item of this.items) {
    const equipment = await Equipment.findById(item.equipmentId);
    if (!equipment || !equipment.isAvailable(item.quantity)) {
      return false;
    }
  }
  return true;
};

// Method to get package items with equipment details
packageSchema.methods.getItemsWithDetails = async function() {
  const Equipment = mongoose.model('Equipment');
  
  const itemsWithDetails = await Promise.all(
    this.items.map(async (item) => {
      const equipment = await Equipment.findById(item.equipmentId);
      return {
        equipment: equipment,
        quantity: item.quantity
      };
    })
  );
  
  return itemsWithDetails;
};

module.exports = mongoose.model('Package', packageSchema);
