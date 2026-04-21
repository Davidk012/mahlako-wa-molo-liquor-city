import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Award, Users, Heart, Shield } from 'lucide-react';
import StoreStatus from '../components/StoreStatus';

const About: React.FC = () => {
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
              About <span className="text-amber-600">Mahlako Wa Molo</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your premier destination for premium spirits, fine wines, and craft beers since 2020
            </p>
            <div className="flex justify-center">
              <StoreStatus />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Mahlako Wa Molo Liquor City has been serving the community with the finest selection of alcoholic beverages. Our name reflects our commitment to bringing people together through quality products and exceptional service.
              </p>
              <p className="text-gray-600 mb-6">
                We pride ourselves on being more than just a liquor store - we're a destination for connoisseurs and casual drinkers alike, offering carefully curated selections from around the world.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <Award className="w-8 h-8 text-amber-600 mb-2" />
                  <h4 className="font-semibold text-gray-900">Premium Quality</h4>
                  <p className="text-sm text-gray-600">Only the finest products</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <Users className="w-8 h-8 text-amber-600 mb-2" />
                  <h4 className="font-semibold text-gray-900">Expert Staff</h4>
                  <p className="text-sm text-gray-600">Knowledgeable team ready to help</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">MW</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Mahlako Wa Molo</h3>
                  <p className="text-gray-600">Liquor City</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Mahlako Wa Molo Liquor City
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Customer First",
                description: "Your satisfaction is our top priority. We go above and beyond to ensure you have the best experience."
              },
              {
                icon: Shield,
                title: "Responsible Service",
                description: "We strictly enforce age verification and promote responsible drinking practices."
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Every product in our store meets our high standards for quality and authenticity."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Us</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">2019 Hlapo Roadway</p>
                    <p className="text-gray-600">Johannesburg, Gauteng</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+27 00 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">mahlakowamolo@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Trading Hours</h2>
              <div className="space-y-4">
                {[
                  { days: "Monday - Saturday", hours: "9:00 AM - 8:00 PM", status: "open" },
                  { days: "Sunday", hours: "9:00 AM - 5:00 PM", status: "limited" }
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{schedule.days}</p>
                        <p className="text-gray-600">{schedule.hours}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      schedule.status === 'open' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {schedule.status === 'open' ? 'Open' : 'Limited Hours'}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Experience the Mahlako Wa Molo Difference
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Visit us today and discover why we're the preferred destination for quality spirits and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+27000000000"
                className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Call Us Now
              </a>
              <a
                href="mailto:mahlakowamolo@gmail.com"
                className="bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
              >
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
