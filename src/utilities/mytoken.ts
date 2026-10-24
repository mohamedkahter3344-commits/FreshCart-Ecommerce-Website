"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
   const secretToken = (await cookies()).get("next-auth.session-token" || "next-auth.session-token")?.value;

   const token = await decode({
      token:secretToken,
      secret:process.env.NEXTAUTH_SECRET!
   })

   return token?.token;
}