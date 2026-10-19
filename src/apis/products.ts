export async function getAllProducts() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
    );

    const products = await response.json();

    return products;
  } catch (error) {
    return error;
  }
}
