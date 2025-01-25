export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

    // Si la respuesta no es exitosa, devolver un arreglo vacío
    if (!res.ok) {
      console.error(`Error fetching products: ${res.statusText}`);
      return [];  // Devuelve un arreglo vacío si la API falla
    }

    return await res.json();  // Retorna los productos si la solicitud es exitosa
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];  // Devuelve un arreglo vacío si hay un error con la solicitud
  }
}

