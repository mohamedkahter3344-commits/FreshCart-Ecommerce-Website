
import React from "react";
import Link from "next/link";
import { getProductsBySubCategory } from "@/apis/getProductsBySubCategory";
import { Product } from "@/interface/product.t";

import { FaBoxOpen, FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import ProductCard from "@/app/_components/ProuductCart/ProductCard";

type Props = {
  params: Promise<{ id: string }>;
};

const SubCategory = async ({ params }: Props) => {
  const { id } = await params;

  const products: Product[] = await getProductsBySubCategory(id);

  const hasProducts = products && products.length > 0;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 px-5 py-10 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-2 text-sm text-green-100">
            <Link href="/" className="transition hover:text-white hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="transition hover:text-white hover:underline"
            >
              Categories
            </Link>
            <span>/</span>
            <span className="font-semibold text-white">Products</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg">
              <FaShoppingBag size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Subcategory Products
              </h1>
              <p className="mt-1 text-sm text-green-50">
                Explore our collection and find what you need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto min-h-[450px] max-w-7xl px-5 py-10 sm:px-10">
        {hasProducts ? (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  Available Products
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Find your favorite products from this collection
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                {products.length} Products
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  singleProduct={product}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-10">
              <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400">
                <FaBoxOpen size={42} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No Products Found!
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-500 dark:text-gray-400">
                Sorry, there are currently no products available in this
                subcategory. Try exploring other categories to find what
                you are looking for.
              </p>

              <Link
                href="/categories"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
              >
                <FaArrowLeft size={13} />
                Explore Categories
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SubCategory;
