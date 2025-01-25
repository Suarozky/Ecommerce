// app/page.tsx
import { ProductList } from "../components/ProductList";
import { Header } from "../components/Header";
import { SearchSort } from "../components/SearchSort";
import { getProducts } from "../lib/products";

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <SearchSort />
        <ProductList initialProducts={products} />
      </main>
    </div>
  );
}
