
"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();

  const cookieName = "__Secure-next-auth.session-token";
  const secretToken = cookieStore.get(cookieName)?.value;

  if (!secretToken) {
    console.error("NextAuth session cookie not found");
    return null;
  }

  try {
    const decodedToken = await decode({
      token: secretToken,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: cookieName,
    });

    console.log("Session decoded:", Boolean(decodedToken));
    console.log("API token exists:", Boolean(decodedToken?.token));

    return decodedToken?.token ?? null;
  } catch {
    console.error("Could not decode NextAuth session");
    return null;
  }
}
