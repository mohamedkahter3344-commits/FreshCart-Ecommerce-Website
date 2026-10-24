
"use client";

import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/CartContext";
import { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const ButtonCard = ({ id }: { id: string }) => {
  const { addProductCart } = useContext(cartContext);
  const [isAdding, setIsAdding] = useState(false);

  async function addProductToCart() {
    if (isAdding) return;

    setIsAdding(true);

    try {
      await addProductCart({ id });
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <Button
      onClick={addProductToCart}
      disabled={isAdding}
      className="h-11 w-full gap-2 rounded-xl bg-green-600 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-70"
    >
      {isAdding ? (
        <>
          <Oval
            height={18}
            width={18}
            color="#ffffff"
            secondaryColor="#d1d5db"
            strokeWidth={5}
            ariaLabel="Adding product"
          />
          <span className="text-white">Adding...</span>
        </>
      ) : (
        <>
          <FaShoppingCart className="size-4 text-white" />
          <span className="text-white">Add to Cart</span>
        </>
      )}
    </Button>
  );
};

export default ButtonCard;
