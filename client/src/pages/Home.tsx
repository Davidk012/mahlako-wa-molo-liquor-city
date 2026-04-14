import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Package, 
  Phone, 
  CheckCircle, 
  Clock,
  MapPin,
  Shield,
  Users
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Real-time Availability',
      description: 'Check equipment availability instantly and book with confidence'
    },
    {
      icon: Package,
      title: 'Complete Equipment Catalog',
      description: 'Tents, chairs, lowering devices, artificial grass, and more'
    },
    {
      icon: Clock,
      title: 'Instant Quotes',
      description: 'Get transparent pricing instantly with dynamic calculation'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe online payments with PayFast, Yoco, and Ozow integration'
    },
    {
      icon: Phone,
      title: 'WhatsApp Confirmations',
      description: 'Automated booking confirmations and reminders via WhatsApp'
    },
    {
      icon: Users,
      title: 'Professional Service',
      description: 'Experienced staff for delivery, setup, and collection'
    }
  ];

  const packages = [
    {
      name: 'Basic Setup',
      price: 'From R2,500',
      features: ['Tent', '100 Standard Chairs', 'Basic Setup'],
      popular: false
    },
    {
      name: 'Professional Setup',
      price: 'From R4,500',
      features: ['Premium Tent', '150 Standard Chairs', 'Artificial Grass', 'Professional Setup'],
      popular: true
    },
    {
      name: 'VIP Setup',
      price: 'From R8,450',
      features: ['Luxury Tent', '200 Premium Chairs', 'Artificial Grass', 'Drapes', 'Sound System', 'Full Service'],
      popular: false
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Funeral Equipment Rental
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Streamline your funeral home operations with our modern booking platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Book Now
            </Link>
            <Link
              to="/equipment"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg font-semibold"
            >
              View Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Style Funeral Services?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Replace messy WhatsApp and call-based bookings with our streamlined digital platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-gray-50 py-16 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Packages
          </h2>
          <p className="text-lg text-gray-600">
            Pre-configured packages for quick and easy booking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className={`card p-8 ${pkg.popular ? 'ring-2 ring-primary-500 relative' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-3xl font-bold text-primary-600 mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/booking"
                className="btn btn-primary w-full"
              >
                Select Package
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-secondary-900 text-white rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Modernize Your Funeral Home Operations?
        </h2>
        <p className="text-xl mb-8 text-secondary-300">
          Join funeral homes across South Africa who trust SFS for their equipment needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="btn bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 text-lg font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/quote"
            className="btn border-2 border-white text-white hover:bg-white hover:text-secondary-900 px-8 py-3 text-lg font-semibold"
          >
            Get Quote
          </Link>
        </div>
      </section>

      {/* Contact Info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
          <p className="text-gray-600">+27 12 345 6789</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
          <p className="text-gray-600">123 Funeral Street, Pretoria</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
          <p className="text-gray-600">Mon-Fri: 8AM-6PM, Sat: 9AM-2PM</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
