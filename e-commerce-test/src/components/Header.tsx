/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";
import { ShoppingCart } from "lucide-react";
import { removeFromCart } from "@/lib/redux/cartSlice";

export function Header() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#00334e] font-space text-xl text-[#dbebfa] shadow-md z-50 h-20 rounded-sm">
      <div className="container mx-auto px-2 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold hover:scale-95 cursor-pointer">
          E-commerce Store
        </h1>
        <div className="flex items-center space-x-4 justify-center">
          <div
            className="relative hover:scale-95 cursor-pointer"
            onClick={toggleCartVisibility}
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </div>

          <div className=" font-bold font-space text-xl">
            Total: USD {total.toFixed(2)}
          </div>
        </div>
      </div>

      {isCartVisible && (
        <div className="absolute top-20 right-0 w-[550px] text-gray-600 rounded-b-3xl bg-white font-space cursor-pointer  shadow-xl z-40 max-h-80 overflow-y-auto border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#00334e]">Cart Items</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <li className="p-4 text-[#00334e]0 text-center">
                Your cart is empty.
              </li>
            ) : (
              items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-center items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex gap-10">
                    <div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-8 h-8 object-cover rounded-lg"
                      />
                    </div>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-[#00334e] ml-2">
                      (x{item.quantity})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
