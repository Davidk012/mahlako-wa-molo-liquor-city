import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Menu, X, Facebook, Instagram, Wine, ChevronRight } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActivePath = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Specials', href: '/specials' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const headerBase = isHomePage && !isScrolled
    ? 'bg-transparent border-transparent'
    : 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm';

  const textBase = isHomePage && !isScrolled
    ? 'text-white'
    : 'text-gray-800';

  const textMuted = isHomePage && !isScrolled
    ? 'text-white/80 hover:text-white'
    : 'text-gray-600 hover:text-amber-700';

  const activeStyle = isHomePage && !isScrolled
    ? 'text-amber-400 border-b-2 border-amber-400'
    : 'text-amber-700 border-b-2 border-amber-600';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${headerBase}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/30 transition-shadow duration-300">
                <Wine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-serif font-bold tracking-wide transition-colors duration-300 ${textBase}`}>
                  Mahlako Wa Molo
                </h1>
                <p className="text-xs text-amber-500 font-medium tracking-widest uppercase">Liquor City</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActivePath(item.href)
                      ? activeStyle
                      : textMuted
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA + Phone */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="tel:+27000000000"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-300 ${textMuted}`}
              >
                <Phone className="w-4 h-4" />
                <span>+27 00 000 0000</span>
              </a>
              <Link
                to="/shop"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${textBase} hover:bg-black/10`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top">
            <div className="px-4 py-6 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActivePath(item.href)
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-700 hover:bg-amber-50/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-100">
                <a
                  href="tel:+27000000000"
                  className="flex items-center px-4 py-3 text-gray-600"
                >
                  <Phone className="w-5 h-5 mr-3 text-amber-600" />
                  <span>+27 00 000 0000</span>
                </a>
                <Link
                  to="/shop"
                  className="block mx-4 mt-3 text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white">
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500"></div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                  <Wine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold tracking-wide">Mahlako Wa Molo</h3>
                  <p className="text-xs text-amber-500 font-medium tracking-widest uppercase">Liquor City</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your premier destination for premium spirits, fine wines, and craft beers at Hlapo Roadway Complex.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">2019 Hlapo Roadway Complex</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <a href="tel:+27000000000" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    +27 00 000 0000
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <a href="mailto:mahlakowamolo@gmail.com" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    mahlakowamolo@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Trading Hours */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Trading Hours</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Monday - Saturday</p>
                    <p className="text-amber-500 text-sm">9:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Sunday</p>
                    <p className="text-amber-500 text-sm">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-800">
                <p className="text-gray-400 text-xs leading-relaxed">
                  <span className="text-amber-500 font-semibold">WhatsApp Orders:</span> Browse and send your order via WhatsApp for quick service!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Mahlako Wa Molo Liquor City. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs bg-gray-900 px-4 py-2 rounded-full">
                Alcohol Not for Persons Under 18 | Drink Responsibly
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
