import NextAuth from "next-auth"
import {authOptions} from "../../../../../auth"

console.log("SECRET?", !!process.env.NEXTAUTH_SECRET, "API:", process.env.API);
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }