'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { ShoppingCart } from 'lucide-react';

export function Header() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-commerce Store</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </div>
          <div className="text-lg font-semibold">
            Total: USD {total.toFixed(2)}
          </div>
        </div>
      </div>
    </header>
  );
}
