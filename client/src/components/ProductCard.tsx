import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToOrder: (product: Product) => void;
  isInOrder?: boolean;
  quantity?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToOrder, 
  isInOrder = false,
  quantity = 0 
}) => {
  const isSpecial = product.specialPrice && product.specialPrice < product.price;
  const displayPrice: number = isSpecial ? product.specialPrice! : product.price;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl overflow-hidden border border-amber-700 hover:border-amber-500 transition-all duration-300"
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
          <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
          {product.brand && (
            <p className="text-amber-400 text-sm">{product.brand}</p>
          )}
          {product.volume && (
            <p className="text-gray-400 text-xs">{product.volume}</p>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            {isSpecial ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 line-through text-sm">
                  R{product.price.toFixed(2)}
                </span>
                <span className="text-amber-400 font-bold text-lg">
                  R{displayPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-amber-400 font-bold text-lg">
                R{displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.alcoholPercentage && (
            <span className="text-gray-400 text-xs">
              {product.alcoholPercentage}%
            </span>
          )}
        </div>

        {isInOrder ? (
          <div className="flex items-center justify-between bg-amber-900 bg-opacity-30 rounded-lg p-2">
            <span className="text-amber-300 text-sm">In your order</span>
            <span className="text-amber-400 font-bold">x{quantity}</span>
          </div>
        ) : (
          <button
            onClick={() => onAddToOrder(product)}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add to Order</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
