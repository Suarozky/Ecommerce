// app/page.tsx

import { SearchSort } from "@/components/SearchSort";




export default async function Home() {


  return (
    <div className="min-h-screen bg-[#dbebfa]">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <SearchSort />

      </main>
    </div>
  );
}
