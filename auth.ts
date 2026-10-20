import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Your Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(`${process.env.API}/auth/signin`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const payload = await response.json();
          console.log("PAYLOAD:", payload);

          if (payload.message === "success") {
            const { id }: { id: string } = jwtDecode(payload.token);
            return { id, user: payload.user, token: payload.token };
          }

          throw new Error(payload.message || "Invalid credentials");
        } catch (e) {
          console.error("AUTHORIZE ERROR:", e);
          throw e;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

/*

 user: {
    name: 'Mohamed Khater',
    email: 'mohamedkahter33443344@gmail.com',
    role: 'user'
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZDcxNjI1Y2ZlYTNkMDAxM2YwODM3YyIsIm5hbWUiOiJNb2hhbWVkIEtoYXRlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzkyNDk2NzI1LCJleHAiOjE4MDAyNzI3MjV9.edQ-qHswKW65N8ebEbIW_vtcYarvhE1ypOmvHhwwV2A'
}

*/
