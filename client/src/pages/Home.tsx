import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Star, ArrowRight, ShoppingBag, Wine, Beer, GlassWater, Sparkles, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useOrder } from '../hooks/useOrder';
import { getFeaturedProducts, getSpecials } from '../data/products';

const heroImages = [
  '/images/hero-bg.webp',
  '/images/store-front.jpeg',
  '/images/products-showcase.webp',
];

const categories = [
  { name: 'Whiskey', icon: GlassWater, href: '/shop?category=whiskey', image: '/images/jameson-select.png', description: 'Premium whiskeys & bourbon' },
  { name: 'Wine', icon: Wine, href: '/shop?category=wine', image: '/images/nederburg-cabernet.webp', description: 'Fine reds, whites & rosés' },
  { name: 'Beer', icon: Beer, href: '/shop?category=beer', image: '/images/heineken-6pack.webp', description: 'Craft & imported beers' },
  { name: 'Spirits', icon: Sparkles, href: '/shop?category=spirits', image: '/images/hennessey-vsop.webp', description: 'Vodka, rum, gin & more' },
];

const galleryImages = [
  '/images/store-front.jpeg',
  '/images/hero-bg.webp',
  '/images/products-showcase.webp',
];

const Home: React.FC = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const { addToOrder, orderItems, updateQuantity } = useOrder();
  const featuredProducts = getFeaturedProducts();
  const specials = getSpecials();

  const nextImage = useCallback(() => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
    }),
  };

  return (
    <div className="bg-white">
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Slideshow Background */}
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentHeroImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover scale-105"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase border border-amber-400/30 px-5 py-2 rounded-full backdrop-blur-sm bg-white/5">
              Hlapo Roadway Complex
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Mahlako Wa Molo
            <span className="block text-amber-400 text-2xl sm:text-3xl md:text-4xl mt-3 font-sans font-light tracking-widest">
              LIQUOR CITY
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Your premier destination for fine spirits, wines & craft beers.
            Curated selections for every occasion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="group bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center space-x-3"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="tel:+27000000000"
              className="text-white font-semibold py-4 px-8 rounded-xl border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </a>
          </motion.div>
        </div>

        {/* Slideshow indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentHeroImage
                  ? 'w-8 bg-amber-400'
                  : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ CATEGORIES SECTION ═══════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} custom={0} className="text-amber-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Our Collection
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Browse by Category
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></motion.div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={cat.href}
                  className="group relative block h-64 md:h-80 rounded-2xl overflow-hidden"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <cat.icon className="w-5 h-5 text-amber-400" />
                      <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                    </div>
                    <p className="text-gray-300 text-sm">{cat.description}</p>
                    <div className="mt-3 flex items-center text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Shop Now</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} custom={0} className="text-amber-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Handpicked for You
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Featured Products
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  onAddToOrder={(product, quantity) => addToOrder(product, quantity)}
                  onUpdateQuantity={updateQuantity}
                  isInOrder={orderItems.some(item => item.id === product.id)}
                  quantity={orderItems.find(item => item.id === product.id)?.quantity || 0}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center space-x-2 bg-white border-2 border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SPECIAL OFFERS ═══════════ */}
      {specials.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="text-center mb-14"
            >
              <motion.p variants={fadeUp} custom={0} className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Limited Time
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Special Offers
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></motion.div>
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
                    onAddToOrder={(product, quantity) => addToOrder(product, quantity)}
                    onUpdateQuantity={updateQuantity}
                    isInOrder={orderItems.some(item => item.id === product.id)}
                    quantity={orderItems.find(item => item.id === product.id)?.quantity || 0}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ STORE GALLERY ═══════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} custom={0} className="text-amber-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Our Space
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Visit Our Store
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-xl mx-auto">
              Step into Mahlako Wa Molo at Hlapo Roadway Complex and discover our carefully curated collection.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative group overflow-hidden rounded-2xl ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 h-64 md:h-full' : 'h-64'
                }`}
              >
                <img
                  src={img}
                  alt={`Store gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS / WHY US ═══════════ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                More Than Just a <span className="text-amber-600">Liquor Store</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At Mahlako Wa Molo, we believe in offering more than products. We provide an experience.
                Our knowledgeable staff, premium selection, and commitment to quality make us the go-to
                destination at Hlapo Roadway Complex.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-1">Premium Quality</h3>
                    <p className="text-gray-500 text-sm">Only the finest local & international brands</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-1">Expert Staff</h3>
                    <p className="text-gray-500 text-sm">Knowledgeable team ready to help</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-1">Great Prices</h3>
                    <p className="text-gray-500 text-sm">Competitive pricing on all products</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-1">Convenient Hours</h3>
                    <p className="text-gray-500 text-sm">Open 7 days a week</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Image + Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/store-front.jpeg"
                  alt="Mahlako Wa Molo Store"
                  className="w-full h-[500px] object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-serif font-bold text-amber-400">500+</p>
                      <p className="text-white/80 text-sm">Products</p>
                    </div>
                    <div>
                      <p className="text-3xl font-serif font-bold text-amber-400">50+</p>
                      <p className="text-white/80 text-sm">Brands</p>
                    </div>
                    <div>
                      <p className="text-3xl font-serif font-bold text-amber-400">7</p>
                      <p className="text-white/80 text-sm">Days Open</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]">
                <MapPin className="w-8 h-8 text-amber-500 mb-2" />
                <p className="text-gray-900 font-bold text-sm">Hlapo Roadway Complex</p>
                <p className="text-gray-500 text-xs mt-1">2019 Hlapo Roadway</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.webp"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Stock Up?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Browse our full collection online or visit us in-store. WhatsApp orders available for your convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="group bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="text-white font-semibold py-4 px-8 rounded-xl border border-white/30 hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
