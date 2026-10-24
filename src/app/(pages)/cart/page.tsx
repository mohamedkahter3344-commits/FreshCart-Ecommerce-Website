
"use client";

import CartProductComp from "@/app/_components/CartProduct/CartProductComp";
import { cartContext } from "@/context/CartContext";
import { CartProduct } from "@/interface/userCart.t";
import Link from "next/link";
import { useContext } from "react";
import { Oval } from "react-loader-spinner";
import {
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaHeadset,
  FaTag,
  FaLock,
  FaArrowLeft,
  FaTrashAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Cart = () => {
  const {
    products,
    numOfCarts,
    totalPriceCart,
    deleteProductCart,
    updateProductCart,
    clearAllProductCart,
    isLoading,
    isClearingCart,
  } = useContext(cartContext);

  const isCartEmpty = products.length === 0;

  // Initial cart loading screen
  if (isLoading && products.length === 0) {
    return (
      <main className="flex h-screen items-center justify-center bg-[#f6f8fa] px-4">
        <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-gray-100 bg-white px-8 py-10 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <Oval
              height={48}
              width={48}
              color="#16a34a"
              secondaryColor="#dcfce7"
              strokeWidth={4}
              strokeWidthSecondary={4}
              ariaLabel="loading-cart"
            />
          </div>

          <h2 className="mt-6 text-xl font-extrabold text-gray-900">
            Loading your cart
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please wait while we fetch your products...
          </p>

          <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-green-100">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-green-600" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fa] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-700">
            Shopping Cart
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm sm:h-14 sm:w-14">
            <FaShoppingCart size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              You have
              <span className="font-bold text-green-600">
                {numOfCarts} {numOfCarts === 1 ? "item" : "items"}
              </span>
              in your cart
            </p>
          </div>
        </div>

        {isCartEmpty ? (
          /* Empty Cart */
          <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10 sm:py-20">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-50" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-green-50" />

            <div className="relative mx-auto flex max-w-xl flex-col items-center">
              <div className="relative mb-7 flex h-32 w-32 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/50 sm:h-40 sm:w-40">
                <FaShoppingCart className="text-5xl text-green-600 sm:text-6xl" />

                <span className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-red-100 text-red-500 shadow-sm">
                  <FaTrashAlt size={14} />
                </span>

                <span className="absolute -bottom-1 -left-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-green-500 text-white">
                  <FaCheckCircle size={16} />
                </span>
              </div>

              <span className="mb-4 rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-green-700">
                Your next favorite is waiting
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Your cart is empty!
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                Looks like you haven&apos;t added anything yet. Discover
                our latest products and find something you&apos;ll love.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 active:translate-y-0 sm:w-auto"
              >
                <FaArrowLeft size={14} />
                Continue Shopping
                <FaArrowRight size={13} />
              </Link>

              <p className="mt-5 text-xs text-gray-400">
                Great finds are just a click away.
              </p>
            </div>
          </section>
        ) : (
          <>
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
              {/* Products */}
              <section className="space-y-4 lg:col-span-2">
                {products.map((product: CartProduct) => (
                  <CartProductComp
                    key={product.product._id}
                    product={product}
                    updateProduct={updateProductCart}
                    deleteProduct={deleteProductCart}
                  />
                ))}

                {/* Cart Actions */}
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div>
                    <p className="text-sm font-bold text-gray-800 sm:text-base">
                      Ready to continue?
                    </p>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Review your items or continue shopping.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 px-4 py-3 text-sm font-bold text-green-700 transition hover:bg-green-50 sm:text-base"
                    >
                      <FaArrowLeft size={13} />
                      Continue Shopping
                    </Link>

                    {/* Clear All with loading */}
                    <button
                      onClick={clearAllProductCart}
                      type="button"
                      disabled={isClearingCart}
                      className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                    >
                      {isClearingCart ? (
                        <>
                          <Oval
                            height={19}
                            width={19}
                            color="#dc2626"
                            secondaryColor="#fecaca"
                            strokeWidth={5}
                            strokeWidthSecondary={5}
                            ariaLabel="clearing-cart"
                          />
                          <span>Clearing cart...</span>
                        </>
                      ) : (
                        <>
                          <FaTrashAlt size={14} />
                          <span>Clear All</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <FaTruck size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 sm:text-base">
                        Free Shipping
                      </p>
                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        On eligible orders
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <FaUndo size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 sm:text-base">
                        Easy Returns
                      </p>
                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Hassle-free policy
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <FaShieldAlt size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 sm:text-base">
                        Secure Payment
                      </p>
                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Protected checkout
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order Summary */}
              <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24">
                <div className="bg-gradient-to-r from-green-700 to-green-600 px-5 py-5 text-white sm:px-6">
                  <div className="flex items-center gap-3">
                    <FaShoppingCart size={19} />
                    <h2 className="text-lg font-bold sm:text-xl">
                      Order Summary
                    </h2>
                  </div>
                  <p className="mt-2 text-sm text-green-100">
                    {numOfCarts} {numOfCarts === 1 ? "item" : "items"} in
                    your cart
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-6 flex gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-green-600">
                      <FaTruck size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-800 sm:text-base">
                        Free Shipping!
                      </p>
                      <p className="mt-1 text-xs leading-5 text-green-700 sm:text-sm">
                        Shipping fees depend on your delivery location.
                      </p>
                    </div>
                  </div>

                  {/* Price Details */}
                  <div className="space-y-5 border-b border-dashed border-gray-200 pb-6">
                    <div className="flex items-center justify-between gap-3 text-sm sm:text-base">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        {totalPriceCart.toLocaleString()} EGP
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm sm:text-base">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm sm:text-base">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-semibold text-gray-900">
                        0 EGP
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between gap-3 py-6">
                    <span className="text-base font-bold text-gray-800 sm:text-lg">
                      Total
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        {totalPriceCart.toLocaleString()}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">EGP</p>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-4 flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4 text-sm text-gray-500 sm:text-base">
                    <FaTag className="shrink-0 text-gray-500" />
                    <span>Apply Promo Code</span>
                  </div>

                  {/* Checkout */}
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-base font-bold text-white opacity-80 shadow-sm"
                  >
                    <FaLock size={14} />
                    Secure Checkout
                  </button>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-gray-500 sm:text-sm">
                    <span className="flex items-center gap-2">
                      <FaShieldAlt className="text-green-600" />
                      Secure Payment
                    </span>
                    <span className="flex items-center gap-2">
                      <FaTruck className="text-green-600" />
                      Fast Delivery
                    </span>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-5 text-center">
                    <Link
                      href="/"
                      className="text-sm font-semibold text-green-600 transition hover:text-green-700 sm:text-base"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>
              </aside>
            </div>

            {/* Support Footer */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-center sm:flex-row">
              <FaHeadset className="text-xl text-green-600" />
              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                Need help with your order?
                <span className="font-semibold text-gray-900">
                  Our support team is here for you.
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
