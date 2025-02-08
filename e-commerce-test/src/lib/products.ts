export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const text = await res.text(); // Verifica qué devuelve la API
    console.log("API Response:", text); // Muestra la respuesta en la consola

    return JSON.parse(text); // Convierte a JSON
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Devuelve null o un array vacío
  }
}
