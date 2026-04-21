import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, Phone, Mail, MapPin, Clock, Menu, X, Facebook, Instagram } from 'lucide-react';
import StoreStatus from './StoreStatus';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActivePath = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Specials', href: '/specials' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-amber-600 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MW</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mahlako Wa Molo</h1>
                <p className="text-xs text-amber-600">Liquor City</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.href)
                      ? 'text-amber-700 bg-amber-50 border border-amber-600'
                      : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info & Store Status */}
            <div className="hidden lg:flex items-center space-x-6">
              <StoreStatus />
              <a
                href="tel:+27000000000"
                className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+27 00 000 0000</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-amber-600 shadow-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActivePath(item.href)
                      ? 'text-amber-700 bg-amber-50 border border-amber-600'
                      : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-amber-600 pt-4 mt-4 space-y-3">
                <div className="px-3">
                  <StoreStatus className="flex-col space-y-2" />
                </div>
                
                <a
                  href="tel:+27000000000"
                  className="flex items-center px-3 py-2 text-amber-600 hover:text-amber-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <span>+27 00 000 0000</span>
                </a>
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
      <footer className="bg-gray-50 border-t border-amber-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MW</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Mahlako Wa Molo</h3>
                  <p className="text-xs text-amber-600">Liquor City</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Your premier destination for premium spirits, fine wines, and craft beers.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/specials" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                    Specials
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">2019 Hlapo Roadway</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">+27 00 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">mahlakowamolo@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Hours */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Trading Hours</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Monday - Saturday</p>
                    <p className="text-amber-600 text-sm font-medium">9:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Sunday</p>
                    <p className="text-amber-600 text-sm font-medium">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-amber-600">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; 2024 Mahlako Wa Molo Liquor City. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
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
