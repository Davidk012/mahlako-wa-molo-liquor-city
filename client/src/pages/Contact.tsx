import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import StoreStatus from '../components/StoreStatus';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Contact <span className="text-amber-600">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get in touch with Mahlako Wa Molo Liquor City for inquiries, orders, or assistance
            </p>
            <div className="flex justify-center">
              <StoreStatus />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: MapPin,
                title: "Visit Our Store",
                content: "2019 Hlapo Roadway<br />Johannesburg, Gauteng",
                action: "Get Directions"
              },
              {
                icon: Phone,
                title: "Call Us",
                content: "+27 00 000 0000<br />Mon-Sat: 9AM-8PM, Sun: 9AM-5PM",
                action: "Call Now"
              },
              {
                icon: Mail,
                title: "Email Us",
                content: "mahlakowamolo@gmail.com<br />We respond within 24 hours",
                action: "Send Email"
              }
            ].map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div 
                  className="text-gray-600 mb-4" 
                  dangerouslySetInnerHTML={{ __html: info.content }}
                />
                <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                  {info.action} &rarr;
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="+27 00 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Contact Options</h2>
              <div className="space-y-6">
                <div className="bg-amber-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <MessageCircle className="w-8 h-8 text-amber-600" />
                    <h3 className="text-xl font-semibold text-gray-900">WhatsApp Orders</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    For quick orders and inquiries, message us directly on WhatsApp for faster response.
                  </p>
                  <a
                    href="https://wa.me/27000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Message on WhatsApp</span>
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <Clock className="w-8 h-8 text-amber-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Response Times</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>WhatsApp: Within 30 minutes during business hours</li>
                    <li>Phone Calls: Immediate during business hours</li>
                    <li>Email: Within 24 hours</li>
                    <li>Contact Form: Within 24 hours</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notice</h3>
                  <p className="text-gray-600 text-sm">
                    Alcohol Not for Persons Under 18. We strictly enforce age verification for all purchases. Please drink responsibly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">2019 Hlapo Roadway, Johannesburg</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
