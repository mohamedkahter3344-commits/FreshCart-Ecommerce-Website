
"use client";

import { Button } from "@/components/ui/button";
import { wishListContext } from "@/context/WishListContext";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Oval } from "react-loader-spinner";

interface WishListButtonProps {
  id: string;
  variant?: "overlay" | "action";
}

const WishListButton = ({
  id,
  variant = "overlay",
}: WishListButtonProps) => {
  const context = useContext(wishListContext);
  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  if (!context) {
    throw new Error(
      "WishListButton must be used inside WishListContextProvider"
    );
  }

  const {
    products,
    isLoading: isWishlistLoading,
    addProductWishList,
    deleteProductWishList,
  } = context;

  const isWishlistPage = pathName === "/wishlist";

  const isInWishlist = products.some(
    (product) => product._id === id
  );

  async function handleClick() {
    if (isLoading || isWishlistLoading) return;

    setIsLoading(true);

    try {
      if (isInWishlist) {
        await deleteProductWishList(id);
      } else {
        await addProductWishList({ id });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const buttonClass = isWishlistPage
    ? "absolute right-4 top-4 z-10 rounded-full border-2 border-red-500 bg-red-100 text-red-600 shadow-md transition-all duration-200 hover:bg-red-500 hover:text-white"
    : variant === "action"
      ? `h-11 w-full gap-2 rounded-xl border-2 font-semibold transition-all duration-200 ${
          isInWishlist
            ? "border-red-500 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-500 dark:bg-red-950 dark:text-red-400"
            : "border-green-300 bg-white text-green-700 hover:border-green-500 hover:bg-green-50 dark:border-green-800 dark:bg-gray-900 dark:text-green-400"
        }`
      : `absolute right-4 top-4 z-10 rounded-full border-2 shadow-md transition-all duration-200 ${
          isInWishlist
            ? "border-red-500 bg-red-100 text-red-600 hover:bg-red-200"
            : "border-gray-200 bg-white text-gray-600 hover:border-red-400 hover:bg-red-50 hover:text-red-500"
        }`;

  return (
    <Button
      type="button"
      variant="outline"
      size={
        isWishlistPage || variant === "overlay"
          ? "icon"
          : "default"
      }
      onClick={handleClick}
      disabled={isLoading || isWishlistLoading}
      aria-label={
        isInWishlist
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      aria-pressed={isInWishlist}
      className={buttonClass}
    >
      {isLoading ? (
        <Oval
          height={18}
          width={18}
          color="#dc2626"
          secondaryColor="#fecaca"
          strokeWidth={5}
          ariaLabel="Updating wishlist"
        />
      ) : isWishlistPage ? (
        <MdDeleteOutline className="size-5" />
      ) : (
        <CiHeart
          className={`size-6 transition-all duration-200 ${
            isInWishlist
              ? "fill-red-600 text-red-600 scale-110"
              : "text-gray-500 hover:text-red-500 hover:scale-110"
          }`}
        />
      )}

      {!isWishlistPage && variant === "action" && !isLoading && (
        <span>
          {isInWishlist ? "Added to Wishlist" : "Wishlist"}
        </span>
      )}
    </Button>
  );
};

export default WishListButton;
