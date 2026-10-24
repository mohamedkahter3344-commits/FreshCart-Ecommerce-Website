"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();

  const secretToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  if (!secretToken) return null;

  const token = await decode({
    token: secretToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token ?? null;
}