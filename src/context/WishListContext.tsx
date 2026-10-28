
"use client";

import { toast } from "@/components/ui/toast";
import { Product } from "@/interface/product.t";
import { addProductToWishListAction } from "@/WishListAction/addProductToWishList";
import { deleteProductWishListAction } from "@/WishListAction/deleteProductToWishList";
import { getUserWishListAction } from "@/WishListAction/getUserWishList";
import { isAxiosError } from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface WishListResp {
  status: string;
  count: number;
  data: Product[];
}

interface WishListContextType {
  products: Product[];
  numOfWishList: number;
  isLoading: boolean;
  getUserWishList: () => Promise<void>;
  deleteProductWishList: (id:string) => Promise<void>;
  addProductWishList: (args: { id: string }) => Promise<any>;
}

export const wishListContext =
  createContext<WishListContextType | null>(null);

const WishListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [numOfWishList, setNumOfWishList] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getUserWishList = useCallback(async () => {
    setIsLoading(true);

    try {
      const wishListData = await getUserWishListAction();

      if (wishListData?.status === "error") {
        setProducts([]);
        setNumOfWishList(0);
        console.error(wishListData.message);
        return;
      }

      setProducts(wishListData?.data ?? []);
      setNumOfWishList(wishListData?.count ?? 0);
    } catch (error) {
      console.error(
        "Failed to get user Wishlist:",
        isAxiosError(error)
          ? error.response?.data
          : error
      );

      setProducts([]);
      setNumOfWishList(0);
    } finally {
      setIsLoading(false);
    }
  }, []);


  async function addProductWishList({ id }: { id: string }) {
      
  
      try {
        const result = await addProductToWishListAction({ id });
  
        if (result?.status !== "success") {
          toast.add({
            type: "error",
            description: result?.message || "Failed to add product to WishList",
          });
  
          return result;
        }
  
        await getUserWishList();
  
        toast.add({
          type: "success",
          description: result?.message || "Product added to WishList",
        });
  
        return result;
      } catch (error) {
        console.error("Failed to add product to WishList:", error);
  
        toast.add({
          type: "error",
          description: "Failed to add product to WishList",
        });
  
        return {
          status: "error",
          message: "Failed to add product to WishList",
        };
      }
    }


    
async function deleteProductWishList(id: string) {
  try {
    const result = await deleteProductWishListAction(id);

    if (result?.status !== "success") {
      toast.add({
        type: "error",
        description: result?.message || "Failed to delete product",
      });
      return;
    }

    
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );

    setNumOfWishList((prevCount) => Math.max(0, prevCount - 1));

    toast.add({
      type: "success",
      description: result?.message || "Product removed from Wishlist",
    });
  } catch (error) {
    console.error("Failed to delete product:", error);

    toast.add({
      type: "error",
      description: "Failed to delete product",
    });
  }
}


  useEffect(() => {
    void getUserWishList();
  }, [getUserWishList]);

  return (
    <wishListContext.Provider
      value={{
        products,
        numOfWishList,
        isLoading,
        getUserWishList,
        addProductWishList,
        deleteProductWishList
      }}
    >
      {children}
    </wishListContext.Provider>
  );
};

export default WishListContextProvider;
