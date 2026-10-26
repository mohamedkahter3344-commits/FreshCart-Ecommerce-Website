
"use server";

import { getMyToken } from "@/utilities/mytoken";
import axios from "axios";

export async function createOnlinePaymentAction(
  id: string,
  address: string,
  phoneNumber: string,
  cityPlace: string,
) {
  const token = await getMyToken();

  if (!token) {
    return {
      status: "error" as const,
      message: "Please log in first",
    };
  }

  const baseUrl = process.env.NEXTAUTH_URL;

  if (!baseUrl) {
    throw new Error("NEXTAUTH_URL is not configured");
  }

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${encodeURIComponent(baseUrl)}`,
    {
      shippingAddress: {
        details: address,
        phone: phoneNumber,
        city: cityPlace,
      },
    },
    {
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  );

  return data;
}
