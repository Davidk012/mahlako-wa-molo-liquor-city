import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getSpecials } from '../data/products';
import { useOrder } from '../hooks/useOrder';

const Specials: React.FC = () => {
  const { addToOrder, orderItems } = useOrder();
  const specials = getSpecials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-amber-600 rounded-full">
                <Tag className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Special <span className="text-amber-600">Offers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our exclusive deals and limited-time promotions on premium spirits, wines, and beers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-gray-700">Limited Time</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <Star className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-gray-700">Premium Selection</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {specials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {specials.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Special Badge */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      SPECIAL
                    </div>
                  </div>
                  
                  <ProductCard product={product} onAddToOrder={() => addToOrder(product)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <Tag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Special Offers Available
                </h3>
                <p className="text-gray-600 mb-8">
                  Check back soon for amazing deals on your favorite products!
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <span>Browse All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Don't Miss Out on These Amazing Deals!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our special offers are available for a limited time only. Stock up on your favorites while prices are low!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop All Products
              </Link>
              <a
                href="tel:+27000000000"
                className="bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
              >
                Call for Assistance
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Offer Terms</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Special offers are valid while stocks last</li>
              <li>Promotional prices cannot be combined with other discounts</li>
              <li>All purchases are subject to age verification (18+)</li>
              <li>Prices include VAT where applicable</li>
              <li>Management reserves the right to terminate promotions without notice</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specials;
