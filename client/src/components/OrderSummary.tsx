import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useOrder } from '../hooks/useOrder';
import { useForm } from 'react-hook-form';

interface OrderForm {
  name: string;
  contactNumber: string;
  collectionTime: 'ASAP' | 'Later Tonight' | 'Tomorrow';
}

const OrderSummary: React.FC = () => {
  const { orderItems, removeFromOrder, updateQuantity, getTotalPrice, createWhatsAppOrder, clearOrder } = useOrder();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<OrderForm>();

  const total = getTotalPrice();
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const onSubmitOrder = async (data: OrderForm) => {
    setIsSubmitting(true);
    
    try {
      const whatsappMessage = createWhatsAppOrder(data);
      const whatsappUrl = `https://wa.me/27000000000?text=${whatsappMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Send backup email (this would be handled by the backend)
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: orderItems,
          total,
          address: '2019 Hlapo Roadway'
        })
      });
      
      // Clear order and close modal
      setTimeout(() => {
        clearOrder();
        setIsOpen(false);
        reset();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderItems.length === 0) return null;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-full shadow-2xl z-40 flex items-center space-x-2 border-2 border-amber-500"
      >
        <ShoppingBag className="w-6 h-6" />
        <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-700"
          >
            <div className="sticky top-0 bg-gradient-to-r from-amber-900 to-amber-800 p-6 rounded-t-2xl border-b border-amber-600">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Your Order</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-amber-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-4">Items</h3>
                <div className="space-y-3">
                  {orderItems.map((item) => {
                    const price = item.specialPrice || item.price;
                    return (
                      <div key={item.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-amber-400 text-sm">R{price.toFixed(2)} each</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-amber-700 hover:bg-amber-600 text-white flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-amber-700 hover:bg-amber-600 text-white flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit(onSubmitOrder)} className="space-y-4">
                <div>
                  <label className="block text-amber-400 text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-amber-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-amber-400 text-sm font-medium mb-2">
                    Contact Number *
                  </label>
                  <input
                    {...register('contactNumber', { 
                      required: 'Contact number is required',
                      pattern: {
                        value: /^0[6-8][0-9]{8}$/,
                        message: 'Please enter a valid South African mobile number'
                      }
                    })}
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-800 border border-amber-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    placeholder="e.g., 0821234567"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.contactNumber.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-amber-400 text-sm font-medium mb-2">
                    Collection Time *
                  </label>
                  <select
                    {...register('collectionTime', { required: 'Please select collection time' })}
                    className="w-full px-4 py-3 bg-gray-800 border border-amber-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Select collection time</option>
                    <option value="ASAP">ASAP</option>
                    <option value="Later Tonight">Later Tonight</option>
                    <option value="Tomorrow">Tomorrow</option>
                  </select>
                  {errors.collectionTime && (
                    <p className="text-red-400 text-sm mt-1">{errors.collectionTime.message}</p>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-amber-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-2xl font-bold text-amber-400">R{total.toFixed(2)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{isSubmitting ? 'Processing...' : 'Send Order via WhatsApp'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default OrderSummary;
