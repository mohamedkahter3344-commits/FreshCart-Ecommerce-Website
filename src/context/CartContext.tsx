
"use client";

import { addProductToCartAction } from "@/CartAction/addProductCart";
import { clearAllCartAction } from "@/CartAction/clearProductsCart";
import { getUserCartAction } from "@/CartAction/getUserCart";
import { deleteProductCartAction } from "@/CartAction/removeCartItem";
import { updateProductCartAction } from "@/CartAction/updateProductCart";
import { toast } from "@/components/ui/toast";
import { Cart, CartProduct } from "@/interface/userCart.t";
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  products: CartProduct[];
  numOfCarts: number;
  totalPriceCart: number;
  addProductCart: (args: { id: string }) => Promise<any>;
  deleteProductCart: (id: string) => Promise<any>;
  updateProductCart: (id: string, count: number) => Promise<any>;
  getUserCart: () => Promise<void>;
  clearAllProductCart: () => Promise<any>;
  isLoading: boolean;
  isClearingCart: boolean;
};

export const cartContext = createContext<CartContextType>({
  products: [],
  numOfCarts: 0,
  totalPriceCart: 0,
  isLoading: true,
  isClearingCart: false,

  addProductCart: async () => ({
    status: "error",
    message: "Cart provider is unavailable",
  }),
  deleteProductCart: async () => ({
    status: "error",
    message: "Cart provider is unavailable",
  }),
  updateProductCart: async () => ({
    status: "error",
    message: "Cart provider is unavailable",
  }),
  getUserCart: async () => {},
  clearAllProductCart: async () => ({
    status: "error",
    message: "Cart provider is unavailable",
  }),
});

const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [numOfCarts, setNumOfCarts] = useState(0);
  const [totalPriceCart, setTotalPriceCart] = useState(0);

  // Loading for fetching cart data
  const [isLoading, setIsLoading] = useState(true);

  // Separate loading state for Clear All
  const [isClearingCart, setIsClearingCart] = useState(false);

  const getUserCart = useCallback(async () => {
    setIsLoading(true);

    try {
      const cartData: Cart = await getUserCartAction();

      setProducts(cartData?.data?.products ?? []);
      setNumOfCarts(cartData?.numOfCartItems ?? 0);
      setTotalPriceCart(cartData?.data?.totalCartPrice ?? 0);
    } catch (error) {
      console.error("Failed to get user cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function addProductCart({ id }: { id: string }) {
    

    try {
      const result = await addProductToCartAction({ id });

      if (result?.status !== "success") {
        toast.add({
          type: "error",
          description: result?.message || "Failed to add product",
        });

        return result;
      }

      await getUserCart();

      toast.add({
        type: "success",
        description: result?.message || "Product added to cart",
      });

      return result;
    } catch (error) {
      console.error("Failed to add product to cart:", error);

      toast.add({
        type: "error",
        description: "Failed to add product to cart",
      });

      return {
        status: "error",
        message: "Failed to add product to cart",
      };
    }
  }

  async function deleteProductCart(id: string) {
    

    try {
      const result = await deleteProductCartAction(id);

      if (result?.status !== "success") {
        toast.add({
          type: "error",
          description: result?.message || "Failed to delete product",
        });

        return result;
      }

      await getUserCart();

      toast.add({
        type: "success",
        description: result?.message || "Product removed from cart",
      });

      return result;
    } catch (error) {
      console.error("Failed to delete product cart:", error);

      toast.add({
        type: "error",
        description: "Failed to delete product",
      });

      return {
        status: "error",
        message: "Failed to delete product cart",
      };
    }
  }

  async function updateProductCart(id: string, count: number) {
    if (!Number.isInteger(count) || count < 1) {
      return {
        status: "error",
        message: "Quantity must be at least 1",
      };
    }


    try {
      const result = await updateProductCartAction(id, count);

      if (result?.status !== "success") {
        toast.add({
          type: "error",
          description: result?.message || "Failed to update product",
        });

        return result;
      }

      await getUserCart();

      toast.add({
        type: "success",
        description: result?.message || "Cart updated successfully",
      });

      return result;
    } catch (error) {
      console.error("Failed to update product cart:", error);

      toast.add({
        type: "error",
        description: "Failed to update product",
      });

      return {
        status: "error",
        message: "Failed to update product cart",
      };
    }
  }

  async function clearAllProductCart() {
    if (isClearingCart) {
      return {
        status: "error",
        message: "Cart is already being cleared",
      };
    }

    setIsClearingCart(true);

    try {
      const result = await clearAllCartAction();

      if (result?.status !== "success") {
        toast.add({
          type: "error",
          description: result?.message || "Failed to clear cart",
        });

        return result;
      }

      await getUserCart();

      toast.add({
        type: "success",
        description: result?.message || "Cart cleared successfully",
      });

      return result;
    } catch (error) {
      console.error("Failed to clear cart:", error);

      toast.add({
        type: "error",
        description: "Failed to clear cart",
      });

      return {
        status: "error",
        message: "Failed to clear cart",
      };
    } finally {
      setIsClearingCart(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, [getUserCart]);

  return (
    <cartContext.Provider
      value={{
        products,
        numOfCarts,
        totalPriceCart,
        addProductCart,
        getUserCart,
        deleteProductCart,
        updateProductCart,
        clearAllProductCart,
        isLoading,
        isClearingCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
