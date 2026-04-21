import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useOrder } from '../hooks/useOrder';
import { products, categories, ProductCategory } from '../data/products';
import Select from 'react-select';

const Shop: React.FC = () => {
  const { addToOrder, orderItems } = useOrder();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => product.inStock);

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return (a.specialPrice || a.price) - (b.specialPrice || b.price);
        case 'price-high':
          return (b.specialPrice || b.price) - (a.specialPrice || a.price);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, sortBy, searchTerm]);

  const categoryOptions = [
    { value: 'all', label: 'All Products' },
    ...categories.map(cat => ({ value: cat.value, label: cat.label }))
  ];

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-amber-500">Premium Collection</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Discover our carefully selected range of premium spirits, wines, and beers
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 mb-8 border border-amber-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-amber-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={categoryOptions.find(opt => opt.value === selectedCategory)}
              onChange={(option) => setSelectedCategory((option?.value || 'all') as ProductCategory | 'all')}
              options={categoryOptions}
              className="text-gray-900"
              classNamePrefix="mahlako"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                  borderColor: '#92400e',
                  color: '#fff',
                  padding: '8px 12px'
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                  borderColor: '#92400e'
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#451a03' : '#1f2937',
                  color: '#fff'
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#fff'
                })
              }}
            />

            {/* Sort */}
            <Select
              value={sortOptions.find(opt => opt.value === sortBy)}
              onChange={(option) => setSortBy(option?.value as 'name' | 'price-low' | 'price-high')}
              options={sortOptions}
              className="text-gray-900"
              classNamePrefix="mahlako"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                  borderColor: '#92400e',
                  color: '#fff',
                  padding: '8px 12px'
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                  borderColor: '#92400e'
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#451a03' : '#1f2937',
                  color: '#fff'
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#fff'
                })
              }}
            />

            {/* View Mode */}
            <div className="flex items-center space-x-2 bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-amber-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-amber-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5 mx-auto" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300">
            Showing <span className="text-amber-400 font-semibold">{filteredAndSortedProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid/List */}
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={viewMode === 'list' ? 'w-full' : ''}
            >
              <ProductCard
                product={product}
                onAddToOrder={addToOrder}
                isInOrder={orderItems.some(item => item.id === product.id)}
                quantity={orderItems.find(item => item.id === product.id)?.quantity || 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;
