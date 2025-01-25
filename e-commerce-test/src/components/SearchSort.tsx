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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00334e]" />
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full max-w-lg pl-14 pr-6 text-[#00334e] py-5 rounded-3xl border border-[#00334e] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#dbebfa]"
        />
      </div>

      <select
        onChange={(e) => handleSort(e.target.value)}
        defaultValue={searchParams.get('sort') || 'price'}
        className="px-8 py-4 text-[#00334e] border border-[#00334e] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#dbebfa] appearance-none shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-95 transform cursor-pointer  duration-800 "
      >
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>
  );
}
