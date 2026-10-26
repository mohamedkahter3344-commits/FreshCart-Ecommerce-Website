
"use server";

import { getMyToken } from "@/utilities/mytoken";
import axios from "axios";

export async function getUserOrderAction(idUser: string) {
  const token = await getMyToken();

  if (!token) {
    return {
      status: "error" as const,
      message: "Please log in first",
    };
  }

  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${encodeURIComponent(idUser)}`,
    {
      headers: {
        token: token,
      },
    },
  );

  return data;
}
