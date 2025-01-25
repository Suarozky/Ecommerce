/* eslint-disable @next/next/no-img-element */
"use client";

import { useDispatch } from "react-redux";
import { Product } from "@/types";
import { addToCart } from "@/lib/redux/cartSlice";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
}

export default function ProductCard({ product, isLoading = false }: ProductCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star key={`full-${index}`} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <Star key="half" className="w-5 h-5 text-yellow-400 fill-current opacity-50" />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star key={`empty-${index}`} className="w-5 h-5 text-gray-300" />
        ))}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded-2xl mb-4"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div className="flex justify-between mb-4">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const handleProductClick = () => {
    router.push(`/product-page/${product.id}`);
  };

  return (
    <div 
      onClick={handleProductClick} 
      className="bg-white rounded-2xl shadow-md p-6 overflow-hidden hover:scale-95 transform cursor-pointer transition-transform duration-800"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-2xl hover:scale-105 transform cursor-pointer transition-transform duration-800"
      />
      <div className="p-4 text-[#00334e]">
        <h2 className="text-xl font-semibold mb-2 font-space h-8 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.title}
        </h2>
        <p className="text-gray-600 mb-2 font-space text-sm h-16 overflow-hidden text-ellipsis">
          {product.description}
        </p>
        <div className="flex gap-8 justify-center items-center">
          <div className="flex items-center mb-2">
            {renderRating(product.rating)}
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>
          <div className="flex justify-between items-center mb-2 mr-3 whitespace-nowrap">
            <span className="text-lg font-bold font-space">
              {product.currency} {product.price.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
          className="border border-[#00334e] text-[#00334e] px-24 mt-2 whitespace-nowrap py-4 rounded-xl hover:scale-95 transition-colors font-space"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}