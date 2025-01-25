export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

  if (!res.ok) {
    const errorMessage = await res.text();
    console.error(`Failed to fetch products: ${errorMessage}`);
    throw new Error(`Failed to fetch products, Status: ${res.status}`);
  }

  return res.json();
}
