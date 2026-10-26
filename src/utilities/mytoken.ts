
"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(): Promise<string | null> {
  const cookieStore = await cookies();

  const secretToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!secretToken || !process.env.NEXTAUTH_SECRET) {
    return null;
  }

  const decoded = await decode({
    token: secretToken,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const token = decoded?.token;

  return typeof token === "string" ? token : null;
}
