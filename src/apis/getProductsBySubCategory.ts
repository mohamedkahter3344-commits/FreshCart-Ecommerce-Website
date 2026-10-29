
import axios from "axios";

export async function getProductsBySubCategory(id: string) {
  try {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        params: {
          "subcategory[in]": id,
        },
      }
    );

    return data.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
