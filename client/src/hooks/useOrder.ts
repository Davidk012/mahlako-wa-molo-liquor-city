import { useState, useEffect } from 'react';
import { CartItem, OrderDetails, Product } from '../types/product';

interface UseOrderReturn {
  orderItems: CartItem[];
  addToOrder: (product: Product, quantity: number) => void;
  removeFromOrder: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearOrder: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  createWhatsAppOrder: (orderDetails: Omit<OrderDetails, 'items' | 'total' | 'address'>) => string;
}

export const useOrder = (): UseOrderReturn => {
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);

  // Load order from localStorage on mount
  useEffect(() => {
    const savedOrder = localStorage.getItem('mahlako-order');
    if (savedOrder) {
      try {
        setOrderItems(JSON.parse(savedOrder));
      } catch (error) {
        console.error('Error loading order from localStorage:', error);
      }
    }
  }, []);

  // Save order to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mahlako-order', JSON.stringify(orderItems));
  }, [orderItems]);

  const addToOrder = (product: Product, quantity: number) => {
    console.log('Adding to cart:', { product: product.name, quantity });
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        console.log('Item already exists, updating quantity');
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log('Adding new item to cart');
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(productId);
      return;
    }

    setOrderItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  const getTotalItems = (): number => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return orderItems.reduce((total, item) => {
      const price = item.specialPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const createWhatsAppOrder = (orderDetails: Omit<OrderDetails, 'items' | 'total' | 'address'>): string => {
    const total = getTotalPrice();
    const address = '2019 Hlapo Roadway';
    
    let orderText = `*NEW ORDER - MAHLAKO WA MOLO*\n`;
    orderText += `------------------------------\n`;
    orderText += `Name: ${orderDetails.name}\n`;
    orderText += `Contact Number: ${orderDetails.contactNumber}\n`;
    orderText += `Collection Time: ${orderDetails.collectionTime}\n`;
    orderText += `------------------------------\n`;
    orderText += `*Items:*\n`;
    
    orderItems.forEach(item => {
      const price = item.specialPrice || item.price;
      orderText += `- ${item.quantity} x ${item.name} @ R${price.toFixed(2)}\n`;
    });
    
    orderText += `------------------------------\n`;
    orderText += `*Total: R${total.toFixed(2)}*\n`;
    orderText += `------------------------------\n`;
    orderText += `Address: ${address}`;
    
    return encodeURIComponent(orderText);
  };

  return {
    orderItems,
    addToOrder,
    removeFromOrder,
    updateQuantity,
    clearOrder,
    getTotalItems,
    getTotalPrice,
    createWhatsAppOrder
  };
};
