'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useDebounce } from '../hook/useDebounce';

export function SearchSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const debouncedSearch = useDebounce((term: string) => {
    router.push('?' + createQueryString('search', term));
  }, 300);

  const handleSort = (value: string) => {
    router.push('?' + createQueryString('sort', value));
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <select
        onChange={(e) => handleSort(e.target.value)}
        defaultValue={searchParams.get('sort') || 'price'}
        className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>
  );
}
