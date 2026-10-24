
"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();

  const cookieName = "__Secure-next-auth.session-token";
  const secretToken = cookieStore.get(cookieName)?.value;

  if (!secretToken) {
    console.error("Session cookie not found");
    return null;
  }

  try {
    const token = await decode({
      token: secretToken,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: cookieName,
    });

    return token?.token ?? null;
  } catch (error) {
    console.error("Failed to decode session token");
    return null;
  }
}
