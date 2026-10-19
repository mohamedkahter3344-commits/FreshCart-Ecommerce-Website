
import { SingleProduct } from "@/interface/singleProduct.t";

export async function getSingleProduct(
  id: string,
): Promise<SingleProduct> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result: { data: SingleProduct } = await response.json();

  return result.data;
}
