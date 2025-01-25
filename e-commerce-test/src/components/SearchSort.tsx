"use client"
import React, { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useDebounce } from '../hook/useDebounce';

export const SearchSort = React.memo(() => {
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

  const debouncedSearch = useDebounce(
    useCallback((term: string) => {
      router.push('?' + createQueryString('search', term));
    }, [createQueryString, router]),
    300
  );


  const handleSort = (value: string) => {
    router.replace('?' + createQueryString('sort', value), { scroll: false });
  };


  const defaultSortValue = useMemo(() => 
    searchParams.get('sort') || 'price', 
    [searchParams]
  );

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
        defaultValue={defaultSortValue}
        className="w-full sm:w-auto max-w-full px-8 py-4 text-[#00334e] border border-[#00334e] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#dbebfa] appearance-none shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-95 transform cursor-pointer"
      >
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>
  );
});

SearchSort.displayName = 'SearchSort';