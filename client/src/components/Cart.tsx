import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useOrder } from '../hooks/useOrder';
import StoreStatus from './StoreStatus';

const Cart: React.FC = () => {
  const { orderItems, removeFromOrder, updateQuantity, getTotalPrice, getTotalItems, clearOrder } = useOrder();
  
  // Debug: Log cart items whenever they change
  React.useEffect(() => {
    console.log('Cart items updated:', orderItems);
  }, [orderItems]);
  const [isOpen, setIsOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    homeAddress: '',
    collectionTime: ''
  });
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const generateWhatsAppMessage = () => {
    if (orderItems.length === 0) return '';

    let message = `*NEW ORDER - Mahlako Wa Molo Liquor City*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Email: ${customerInfo.email}\n`;
    message += `Home Address: ${customerInfo.homeAddress}\n`;
    message += `Collection Time: ${customerInfo.collectionTime}\n\n`;
    message += `*Order Items:*\n`;

    orderItems.forEach((item, index) => {
      const price = item.specialPrice || item.price;
      message += `${index + 1}. ${item.quantity}x ${item.name}`;
      if (item.brand) message += ` (${item.brand})`;
      if (item.volume) message += ` - ${item.volume}`;
      message += `\n   Price: R${price.toFixed(2)} each = R${(price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total Amount: R${getTotalPrice().toFixed(2)}*\n\n`;
    message += `*Order Time: ${new Date().toLocaleString('en-ZA', { 
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })} SAST*\n\n`;
    message += `Please confirm availability and total amount.\nThank you!`;

    return message;
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/27000000000?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after successful order
    setTimeout(() => {
      clearOrder();
      setShowOrderForm(false);
      setCustomerInfo({ name: '', phone: '', email: '', homeAddress: '', collectionTime: '' });
      setIsOpen(false);
    }, 1000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email || !customerInfo.homeAddress || !customerInfo.collectionTime) {
      alert('Please fill in all customer details');
      return;
    }
    handleWhatsAppOrder();
  };

  return (
    <>
      {/* Cart Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-600 text-white p-4 rounded-full shadow-lg hover:bg-amber-700 transition-colors relative group"
        >
          <ShoppingCart className="w-6 h-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            View Cart ({getTotalItems()} items)
          </span>
        </button>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    Shopping Cart
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-amber-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-amber-100">{getTotalItems()} items</span>
                  <span className="text-xl font-bold">R{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {orderItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Add some products to get started!</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            {item.brand && <p className="text-sm text-gray-600">{item.brand}</p>}
                            {item.volume && <p className="text-sm text-gray-600">{item.volume}</p>}
                            <p className="text-amber-600 font-semibold">
                              R{(item.specialPrice || item.price).toFixed(2)}
                              {item.specialPrice && (
                                <span className="text-gray-400 line-through ml-2">
                                  R{item.price.toFixed(2)}
                                </span>
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-semibold text-gray-900">
                            R{((item.specialPrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {orderItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-amber-600">R{getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  {!showOrderForm ? (
                    <button
                      onClick={() => setShowOrderForm(true)}
                      className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Order via WhatsApp</span>
                    </button>
                  ) : (
                    <form onSubmit={handleSubmitOrder} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number *"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address *"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Home Address *"
                          value={customerInfo.homeAddress}
                          onChange={(e) => setCustomerInfo({...customerInfo, homeAddress: e.target.value})}
                          className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Collection Time *"
                          value={customerInfo.collectionTime}
                          onChange={(e) => setCustomerInfo({...customerInfo, collectionTime: e.target.value})}
                          className="w-full px-4 py-3 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowOrderForm(false)}
                          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Order</span>
                        </button>
                      </div>
                    </form>
                  )}
                  
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                    <StoreStatus />
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
