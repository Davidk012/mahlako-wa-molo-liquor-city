import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
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
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden border border-amber-600 hover:border-amber-500 transition-all duration-300"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder-bottle.jpg';
          }}
        />
        
        {isSpecial && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            SPECIAL
          </div>
        )}
        
        {product.featured && !isSpecial && (
          <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            FEATURED
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <span className="text-red-500 font-bold text-lg">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-gray-900 font-bold text-lg mb-1">{product.name}</h3>
          {product.brand && (
            <p className="text-amber-600 text-sm">{product.brand}</p>
          )}
          {product.volume && (
            <p className="text-gray-500 text-xs">{product.volume}</p>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            {isSpecial ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 line-through text-sm">
                  R{product.price.toFixed(2)}
                </span>
                <span className="text-amber-600 font-bold text-lg">
                  R{displayPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-amber-600 font-bold text-lg">
                R{displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.alcoholPercentage && (
            <span className="text-gray-500 text-xs">
              {product.alcoholPercentage}%
            </span>
          )}
        </div>

        {isInOrder && quantity > 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-700 text-sm font-medium">In Cart</span>
              <span className="text-amber-600 font-bold">x{quantity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity && onUpdateQuantity(product.id, quantity - 1)}
                className="w-8 h-8 bg-white border border-amber-300 rounded-lg flex items-center justify-center hover:bg-amber-50"
              >
                <Minus className="w-4 h-4 text-amber-600" />
              </button>
              <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity && onUpdateQuantity(product.id, quantity + 1)}
                className="w-8 h-8 bg-white border border-amber-300 rounded-lg flex items-center justify-center hover:bg-amber-50"
              >
                <Plus className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <span className="text-gray-700 text-sm font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                  className="w-8 h-8 bg-white border border-amber-300 rounded-lg flex items-center justify-center hover:bg-amber-50"
                >
                  <Minus className="w-4 h-4 text-amber-600" />
                </button>
                <span className="w-12 text-center font-semibold text-gray-900">{localQuantity}</span>
                <button
                  onClick={() => setLocalQuantity(localQuantity + 1)}
                  className="w-8 h-8 bg-white border border-amber-300 rounded-lg flex items-center justify-center hover:bg-amber-50"
                >
                  <Plus className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>
            <button
              onClick={() => onAddToOrder(product, localQuantity)}
              disabled={!product.inStock}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add {localQuantity} to Cart</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
