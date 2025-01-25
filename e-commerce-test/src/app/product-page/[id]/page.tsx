
"use client";

import Link from "next/link";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { getProducts } from "@/lib/products";
import { addToCart } from "@/lib/redux/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {

      document
      .querySelectorAll('[cz-shortcut-listen]')
      .forEach((el) => el.removeAttribute('cz-shortcut-listen'));
      // Browser-specific logic here
      const fetchProduct = async () => {
        try {
          const products = await getProducts();
          const foundProduct = products.find(
            (p: Product) => p.id.toString() === params.id
          );
          setProduct(foundProduct);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      };
      fetchProduct();
    }
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen text-[#00334e] w-full bg-[#dbebfa] justify-center items-center relative">
      <div className="w-full max-w-5xl px-4 sm:px-8">
        <div className="bg-white flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row gap-8 w-full">
            <div className="flex flex-col w-full sm:w-1/2">
              <Link href="/" passHref>
                <button className="flex justify-center gap-2 text-[#00334e] items-center h-8 w-20 rounded-3xl mb-2 self-start hover:scale-95 transform transition-transform duration-800">
                  <FiArrowLeft size={16} className="text-[#00334e] text-2xl" />
                  <span className="font-space"> Atras</span>
                </button>
              </Link>
              <img
                src={product.image}
                alt={product.title}
                width={1020}
                height={1080}
                className="w-full rounded-3xl object-contain"
              />
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-1/2 h-full">
              <div className="flex items-center justify-between h-16">
                <span className="text-2xl font-bold line-clamp-2 mt-12 font-space">
                  {product.title}
                </span>
              </div>

              <div className="flex items-center gap-2 h-8 font-space">
                <AiOutlineCheckCircle size={24} className="text-green-500" />
                <span>Stock Disponible</span>
              </div>

              <span className="text-2xl font-bold h-12 font-space">
                {product.currency} {product.price.toFixed(2)}
              </span>

              <span className="h-8 font-space">Cantidad</span>

              <div className="h-24 overflow-auto">
                <span className="text-gray-600 font-space">
                  {product.description}
                </span>
              </div>

              <div className="flex gap-4 items-center mt-auto w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart(product));
                  }}
                  className="w-full p-4 flex gap-8 justify-center items-center bg-[#00334e] text-white rounded-2xl font-space text-xl hover:scale-95 transform transition-transform duration-800"
                >
                  <FiShoppingCart size={24} className="text-white" />
                  Poner en el carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
