// app/page.tsx
import { ProductList } from "@/components/ProductList";
import { SearchSort } from "@/components/SearchSort";
import { getProducts } from "@/lib/products";
import { Suspense } from "react";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#dbebfa]">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Suspense fallback="Loading products...">
          <SearchSort />
          <ProductList initialProducts={products} />
        </Suspense>
      </main>
    </div>
  );
}
