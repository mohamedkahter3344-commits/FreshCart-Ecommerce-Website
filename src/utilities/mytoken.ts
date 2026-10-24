
"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();

  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const secretToken = cookieStore.get(cookieName)?.value;

  if (!secretToken) {
    console.error(`Session cookie not found: ${cookieName}`);
    return null;
  }

  try {
    const token = await decode({
      token: secretToken,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: cookieName,
    });

    return token?.token ?? null;
  } catch {
    console.error("Failed to decode NextAuth session");
    return null;
  }
}
