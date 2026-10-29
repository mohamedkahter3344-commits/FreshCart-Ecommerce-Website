
import React from "react";
import Link from "next/link";
import { FaFolderOpen } from "react-icons/fa";
import { LuArrowLeft, LuHouse, LuLayers3 } from "react-icons/lu";

import { Subcategory } from "@/interface/product.t";
import { getAllSubCategoryOnCategories } from "@/apis/getAllSubCategoriesOnCategory";
import StoreBenefits from "@/app/_components/StoreBenefits/StoreBenefits";

type CategoryDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

const CategoryDetails = async ({ params }: CategoryDetailsProps) => {
  const { id } = await params;

  const subCategory: Subcategory[] =
    await getAllSubCategoryOnCategories(id);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-400 px-5 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-green-100">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <span>/</span>

            <Link
              href="/categories"
              className="transition hover:text-white"
            >
              Categories
            </Link>

            <span>/</span>

            <span className="font-semibold text-white">
              Subcategories
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/20 text-white shadow-lg">
              <LuLayers3 size={27} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Subcategories
              </h1>

              <p className="mt-1 text-sm text-green-50">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="mx-auto min-h-[calc(100vh-300px)] max-w-7xl px-5 py-8 sm:px-10 sm:py-10">
        {/* Back & Count */}
        <div className="mb-7">
          <Link
            href="/categories"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-green-600"
          >
            <LuArrowLeft size={17} />
            Back to Categories
          </Link>

          <h2 className="text-lg font-bold text-slate-800">
            {subCategory.length} Subcategories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a subcategory to discover its products.
          </p>
        </div>

        {/* Grid */}
        {subCategory.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {subCategory.map((item) => (
              <Link
                key={item._id}
                href={`/products/subcategory/${item._id}`}
                className="group flex min-h-44 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <FaFolderOpen size={21} />
                </div>

                {/* Name */}
                <h3 className="text-base font-bold leading-6 text-slate-800 transition-colors group-hover:text-green-600">
                  {item.name}
                </h3>

                {/* View Link */}
                <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-green-600">
                  Browse Products
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <LuLayers3 size={30} />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              No Subcategories Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              There are no subcategories available for this category.
            </p>

            <Link
              href="/categories"
              className="mt-5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              Back to Categories
            </Link>
          </div>
        )}
      </section>

      <StoreBenefits />
    </main>
  );
};

export default CategoryDetails;
