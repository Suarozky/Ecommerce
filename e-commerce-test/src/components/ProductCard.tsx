'use client';

import { useDispatch } from 'react-redux';
import { Product } from '@/types';
import { addToCart } from '@/lib/redux/cartSlice';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">
          {truncateDescription(product.description)}
        </p>
        <div className="flex items-center mb-2">
          {renderRating(product.rating)}
          <span className="ml-2 text-gray-600">({product.rating})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">
            {product.currency} {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}