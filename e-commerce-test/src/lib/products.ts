

export async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
  
    return res.json();
  }
