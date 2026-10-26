"use server";

import { getMyToken } from "@/utilities/mytoken";
import axios from "axios";

export async function addProductToCartAction({ id }: { id: string }) {
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
      "https://ecommerce.routemisr.com/api/v2/cart",
      { productId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,

          token: token as string,

          "Content-Type": "application/json",
        },
      },
    );

    return {
      status: "success",
      message: data.message || "Product added to cart successfully",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: "error",
        message:
          error.response?.data?.message ||
          "Failed to add product to cart",
      };
    }

    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZDcxNjI1Y2ZlYTNkMDAxM2YwODM3YyIsIm5hbWUiOiJNb2hhbWVkIEtoYXRlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzkyNTc0Njk1LCJleHAiOjE4MDAzNTA2OTV9.Fsg_73Ovz4Cjq10WIDab7XW9evPyGAI3JG_Ox5aO4L8