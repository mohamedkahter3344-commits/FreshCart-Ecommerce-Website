"use server";

import { getMyToken } from "@/utilities/mytoken";
import axios from "axios";

export async function addProductToWishListAction({ id }: { id: string }) {
  try {
    const token = await getMyToken();

    console.log(token)

    if (!token) {
      return {
        status: "error",
        message: "Please log in first",
      };
    }

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      {
        headers: {
          token: token as string,
        },
      },
    );

    return {
      status: "success",
      message: data.message || "Product added to WishList successfully",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: "error",
        message:
          error.response?.data?.message ||
          "Failed to add product to WishList",
      };
    }

    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}