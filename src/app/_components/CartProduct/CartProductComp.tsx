
"use client";

import Image from "next/image";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { CartProduct } from "@/interface/userCart.t";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaCheckCircle,
} from "react-icons/fa";

type CartProductCompProps = {
  product: CartProduct;
  deleteProduct: (id: string) => Promise<any>;
  updateProduct: (id: string, count: number) => Promise<any>;
};

const CartProductComp = ({
  product,
  deleteProduct,
  updateProduct,
}: CartProductCompProps) => {
  const productId = product.product.id;
  const quantity = product.count;

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleUpdateQuantity(newQuantity: number) {
    if (isUpdating || isDeleting || newQuantity < 1) return;

    setIsUpdating(true);

    try {
      await updateProduct(productId, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDeleteProduct() {
    if (isDeleting || isUpdating) return;

    setIsDeleting(true);

    try {
      await deleteProduct(productId);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex gap-4 sm:gap-5">
        {/* Product Image */}
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-36 sm:w-36">
          <Image
            src={product.product.imageCover}
            alt={product.product.title || "Product image"}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-contain p-2"
          />
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                {product.product.title}
              </h2>

              <span className="mt-2 inline-block rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700 sm:text-sm">
                {product.product.category?.name}
              </span>

              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                SKU: {productId}
              </p>
            </div>

            <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 sm:inline-flex">
              <FaCheckCircle size={12} />
              In Stock
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-base font-extrabold text-green-600 sm:text-lg">
                {product.price} EGP
                <span className="ml-1 text-xs font-normal text-gray-500 sm:text-sm">
                  per unit
                </span>
              </p>

              {/* Quantity Controls */}
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                  disabled={quantity <= 1 || isUpdating || isDeleting}
                  type="button"
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaMinus size={11} />
                </button>

                <span className="flex min-w-5 items-center justify-center text-base font-bold text-gray-800">
                  {isUpdating ? (
                    <Oval
                      height={18}
                      width={18}
                      color="#16a34a"
                      secondaryColor="#d1d5db"
                      strokeWidth={5}
                      ariaLabel="Updating quantity"
                    />
                  ) : (
                    quantity
                  )}
                </span>

                <button
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                  disabled={isUpdating || isDeleting}
                  type="button"
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* Product Total */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500 sm:text-sm">
                  Total
                </p>

                <p className="text-base font-extrabold text-gray-800 sm:text-lg">
                  {(product.price * quantity).toLocaleString()}
                  <span className="text-sm">EGP</span>
                </p>
              </div>

              <button
                onClick={handleDeleteProduct}
                disabled={isDeleting || isUpdating}
                type="button"
                aria-label="Remove product"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-red-50 text-red-400 transition hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <Oval
                    height={18}
                    width={18}
                    color="#ef4444"
                    secondaryColor="#fee2e2"
                    strokeWidth={5}
                    ariaLabel="Deleting product"
                  />
                ) : (
                  <FaTrash size={14} />
                )}
              </button>
            </div>
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 sm:hidden">
            <FaCheckCircle size={11} />
            In Stock
          </span>
        </div>
      </div>
    </article>
  );
};

export default CartProductComp;
