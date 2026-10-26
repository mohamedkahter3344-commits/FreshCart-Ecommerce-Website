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
      status: "error",
      message: "Please log in first",
    };
  }

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    {
      shippingAddress: {
        details: address,
        phone: phoneNumber,
        city: cityPlace,
      },
    },
    {
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    },
  );

  return data;
}
