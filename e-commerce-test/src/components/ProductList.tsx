'use client';

import { useState, useRef, useCallback } from 'react';
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

  // Filtrar y ordenar los productos
  const filteredProducts = initialProducts
    .filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sort === 'price' ? a.price - b.price : b.rating - a.rating));

  // Calcular el índice de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(0, indexOfLastProduct);

  // Referencia para el último elemento del contenedor
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && 
          indexOfLastProduct < filteredProducts.length) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [indexOfLastProduct, filteredProducts.length]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <div
            key={product.id}
            ref={index === currentProducts.length - 1 ? lastProductRef : null}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {indexOfLastProduct < filteredProducts.length && (
        <div className="text-center mt-4">
          <p className="text-gray-500">Loading more products...</p>
        </div>
      )}
    </>
  );
}
