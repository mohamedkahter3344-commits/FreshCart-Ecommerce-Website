
"use client";

import { wishListContext } from "@/context/WishListContext";
import { useContext } from "react";
import Link from "next/link";
import { FaHeart, FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline, MdShoppingBag } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import ProductCard from "@/app/_components/ProuductCart/ProductCard";
import { Product } from "@/interface/product.t";
import StoreBenefits from "@/app/_components/StoreBenefits/StoreBenefits";

const WishList = () => {
  const context = useContext(wishListContext);

  if (!context) {
    throw new Error(
      "WishList must be used inside WishListContextProvider"
    );
  }

  const { products, isLoading } = context;

  if (isLoading) {
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-5">
        <RotatingLines
          visible={true}
          width="55"
          strokeWidth="4"
          animationDuration="0.75"
          ariaLabel="Loading wishlist"
          strokeColor="#16a34a"
        />
        <h2 className="text-lg font-semibold text-slate-800">
          Loading your wishlist
        </h2>
        <p className="text-sm text-slate-500">
          Getting your favorite products ready...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-800">Wishlist</span>
        </nav>

        {/* Header */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-sm">
              <FaHeart className="text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                My Wishlist
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Keep your favorite products close to you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:self-auto">
            <MdShoppingBag className="text-xl text-green-600" />
            <span className="text-sm font-medium text-slate-600">
              <span className="font-bold text-slate-900">
                {products.length}
              </span>
              saved {products.length === 1 ? "item" : "items"}
            </span>
          </div>
        </section>

        {/* Wishlist Content */}
        {products.length === 0 ? (
          <section className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-red-50">
              <FaRegHeart className="text-4xl text-red-400" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Looks like you haven't saved any products yet. Explore our
              collection and save the things you love!
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              <MdShoppingBag className="text-lg" />
              Explore Products
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Your saved favorites
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
              >
                Continue Shopping
                <FaArrowLeft className="text-xs" />
              </Link>
            </div>

            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  singleProduct={product}
                />
              ))}
            </section>
          </>
        )}

        {/* Bottom Benefits */}
      <StoreBenefits/>
      </div>
    </main>
  );
};

export default WishList;
