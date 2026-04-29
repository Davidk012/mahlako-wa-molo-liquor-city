import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToOrder: (product: Product, quantity: number) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  isInOrder?: boolean;
  quantity?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToOrder,
  onUpdateQuantity,
  isInOrder = false,
  quantity = 0 
}) => {
  const [localQuantity, setLocalQuantity] = useState(1);
  const isSpecial = product.specialPrice && product.specialPrice < product.price;
  const displayPrice: number = isSpecial ? product.specialPrice! : product.price;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100 hover:border-amber-200 transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-bottle.jpg';
          }}
        />
        
        {isSpecial && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
            SPECIAL
          </div>
        )}
        
        {product.featured && !isSpecial && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
            FEATURED
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-widest uppercase bg-red-500/80 px-4 py-2 rounded-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          {product.brand && (
            <p className="text-amber-600 text-xs font-semibold tracking-wider uppercase">{product.brand}</p>
          )}
          <h3 className="text-gray-900 font-bold text-base mt-1">{product.name}</h3>
          {product.volume && (
            <p className="text-gray-400 text-xs mt-0.5">{product.volume}</p>
          )}
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            {isSpecial ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 line-through text-sm">
                  R{product.price.toFixed(2)}
                </span>
                <span className="text-gray-900 font-bold text-xl">
                  R{displayPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-gray-900 font-bold text-xl">
                R{displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.alcoholPercentage && (
            <span className="text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-md">
              {product.alcoholPercentage}% ABV
            </span>
          )}
        </div>

        {isInOrder && quantity > 0 ? (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-700 text-sm font-medium">In Cart</span>
              <span className="text-amber-600 font-bold text-sm">x{quantity}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => onUpdateQuantity && onUpdateQuantity(product.id, quantity - 1)}
                className="w-9 h-9 bg-white border border-amber-200 rounded-xl flex items-center justify-center hover:bg-amber-50 transition-colors"
              >
                <Minus className="w-4 h-4 text-amber-600" />
              </button>
              <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity && onUpdateQuantity(product.id, quantity + 1)}
                className="w-9 h-9 bg-white border border-amber-200 rounded-xl flex items-center justify-center hover:bg-amber-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
              <span className="text-gray-500 text-sm">Qty</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                  className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-amber-300 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5 text-gray-600" />
                </button>
                <span className="w-8 text-center font-bold text-gray-900">{localQuantity}</span>
                <button
                  onClick={() => setLocalQuantity(localQuantity + 1)}
                  className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-amber-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                console.log('ProductCard button clicked:', { product: product.name, localQuantity });
                onAddToOrder(product, localQuantity);
              }}
              disabled={!product.inStock}
              className="w-full bg-gray-900 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
