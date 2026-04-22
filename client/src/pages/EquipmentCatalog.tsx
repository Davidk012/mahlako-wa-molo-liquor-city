import React, { useState, useEffect } from 'react';
import { equipmentAPI } from '../services/api';
import { Search, Filter, Package, Star, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  unit: string;
  image?: string;
  available: boolean;
  totalQuantity: number;
  currentlyRented: number;
}

const EquipmentCatalog: React.FC = () => {
  const defaultEquipmentImage = '/images/products-showcase.webp';
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const categories = [
    { value: 'all', label: 'All Equipment' },
    { value: 'tent', label: 'Tents' },
    { value: 'chairs', label: 'Chairs' },
    { value: 'lowering-device', label: 'Lowering Devices' },
    { value: 'artificial-grass', label: 'Artificial Grass' },
    { value: 'drapes', label: 'Drapes' },
    { value: 'sound-system', label: 'Sound Systems' },
    { value: 'cctv', label: 'CCTV & Streaming' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    filterEquipment();
  }, [equipment, searchTerm, selectedCategory, showAvailableOnly]);

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getAll();
      setEquipment(response.data || []);
    } catch (error: any) {
      toast.error('Failed to load equipment');
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEquipment = () => {
    let filtered = equipment;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by availability
    if (showAvailableOnly) {
      filtered = filtered.filter(item => item.available && item.currentlyRented < item.totalQuantity);
    }

    setFilteredEquipment(filtered);
  };

  const formatPrice = (price: number, unit: string) => {
    switch (unit) {
      case 'per-100':
        return `R ${price} per 100 units`;
      case 'per-sqm':
        return `R ${price} per m²`;
      case 'per-hour':
        return `R ${price} per hour`;
      default:
        return `R ${price} each`;
    }
  };

  const getAvailableQuantity = (item: Equipment) => {
    return item.totalQuantity - item.currentlyRented;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Equipment Catalog</h1>
        <p className="text-gray-600 mt-2">
          Browse our complete range of funeral equipment available for rental
        </p>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Available Only */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available-only"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="available-only" className="ml-2 block text-sm text-gray-900">
              Available only
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredEquipment.length} of {equipment.length} items
        </p>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {showAvailableOnly ? 'Available items only' : 'All items'}
          </span>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((item) => (
          <div key={item.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {(item.image && item.image.trim()) ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultEquipmentImage;
                  }}
                />
              ) : (
                <img
                  src={defaultEquipmentImage}
                  alt={`${item.name} placeholder`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <div className="flex items-center space-x-2">
                  {item.available && getAvailableQuantity(item) > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(item.basePrice, item.unit)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Available:</span>
                  <span className="font-medium text-gray-900">
                    {getAvailableQuantity(item)} / {item.totalQuantity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900 capitalize">
                    {item.category.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <button
                className={`w-full btn ${
                  item.available && getAvailableQuantity(item) > 0
                    ? 'btn-primary'
                    : 'btn-secondary opacity-50 cursor-not-allowed'
                }`}
                disabled={!item.available || getAvailableQuantity(item) === 0}
              >
                {item.available && getAvailableQuantity(item) > 0
                  ? 'Add to Booking'
                  : 'Not Available'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No equipment found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default EquipmentCatalog;
