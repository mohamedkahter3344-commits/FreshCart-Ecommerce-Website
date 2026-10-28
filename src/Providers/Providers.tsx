"use client";

import CartContextProvider from "@/context/CartContext";
import WishListContextProvider from "@/context/WishListContext";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <WishListContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </WishListContextProvider>
    </SessionProvider>
  );
};

export default Providers;
