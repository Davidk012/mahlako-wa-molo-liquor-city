import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Star, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import StoreStatus from '../components/StoreStatus';
import ProductCard from '../components/ProductCard';
import { useOrder } from '../hooks/useOrder';
import { getFeaturedProducts, getSpecials } from '../data/products';

const Home: React.FC = () => {
  const { addToOrder, orderItems } = useOrder();
  const featuredProducts = getFeaturedProducts();
  const specials = getSpecials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-amber-900/20 to-black z-10"></div>
        
        {/* Background Image/Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-gray-900">
          <img
            src="/images/hero-bg.jpg"
            alt="Premium Liquor Collection"
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Mahlako Wa Molo
            <span className="block text-amber-500 text-3xl md:text-5xl mt-2">Liquor City</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            Your Premium Destination for Fine Spirits, Wines & Beers
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Browse Collection</span>
            </Link>
            
            <a
              href="tel:+27000000000"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 border border-amber-600 flex items-center justify-center space-x-2"
            >
              <Phone className="w-6 h-6" />
              <span>Call Us</span>
            </a>
          </motion.div>
        </div>

        {/* Store Status Overlay */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <StoreStatus />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured <span className="text-amber-500">Products</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Handpicked selections from our premium collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToOrder={addToOrder}
                  isInOrder={orderItems.some(item => item.id === product.id)}
                  quantity={orderItems.find(item => item.id === product.id)?.quantity || 0}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {specials.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-r from-amber-900/20 to-red-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Special <span className="text-red-500">Offers</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Limited time deals on your favorite drinks
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specials.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onAddToOrder={addToOrder}
                    isInOrder={orderItems.some(item => item.id === product.id)}
                    quantity={orderItems.find(item => item.id === product.id)?.quantity || 0}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                About <span className="text-amber-500">Mahlako Wa Molo</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Located at 2019 Hlapo Roadway, we are your premier destination for premium spirits, 
                fine wines, and craft beers. Our carefully curated selection features best local and 
                international brands, ensuring you find exactly what you're looking for.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Whether you're planning a celebration, stocking your home bar, or looking for perfect 
                gift, our knowledgeable staff is here to help you make the perfect choice.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-amber-500" />
                  <div>
                    <h3 className="text-white font-semibold">Premium Quality</h3>
                    <p className="text-gray-400 text-sm">Only the finest selection</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-amber-500" />
                  <div>
                    <h3 className="text-white font-semibold">Convenient Hours</h3>
                    <p className="text-gray-400 text-sm">Open daily for your convenience</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-2xl p-8 border border-amber-700"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Store Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-300">2019 Hlapo Roadway</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-300">+27 00 000 0000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300">mahlakowamolo@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Trading Hours</p>
                    <p className="text-gray-300">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-300">Sunday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-800/30 rounded-lg border border-amber-600">
                <p className="text-amber-200 text-sm">
                  <strong>WhatsApp Orders:</strong> Browse our collection and send your order directly via WhatsApp for quick and convenient service!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
