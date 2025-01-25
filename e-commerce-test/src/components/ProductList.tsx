"use client"
import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { useSearchParams } from 'next/navigation';

interface ProductListProps {
  initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const sort = (searchParams.get('sort') as 'price' | 'rating') || 'price';
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
  
    const filteredProducts = initialProducts
      .filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => (sort === 'price' ? a.price - b.price : b.rating - a.rating));
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = filteredProducts.slice(0, indexOfLastProduct);
  
    const loadMore = () => {
      setCurrentPage(prev => prev + 1);
    };
  
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
  
        {currentProducts.length < filteredProducts.length && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="bg-[#00334e] text-white px-6 py-2 rounded-lg hover:bg-[#00336e] transition-colors font-space"
            >
              Load More
            </button>
          </div>
        )}
      </>
    );
  }