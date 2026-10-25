"use server";
import { getMyToken } from "@/utilities/mytoken";
import axios from "axios";
export async function createCashPaymentAction(
  id: string,
  address: string,
  phoneNumber: string,
  cityPlace: string,
  code: string,
) {
  const token = await getMyToken();

  if (!token) {
    return {
      status: "error",
      message: "Please log in first",
    };
  }

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v2/orders/${id}`,
    {
      shippingAddress: {
        details: address,
        phone: phoneNumber,
        city: cityPlace,
        postalCode: code,
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
