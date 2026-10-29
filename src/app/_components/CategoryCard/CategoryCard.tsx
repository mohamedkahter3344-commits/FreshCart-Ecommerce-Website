import React from 'react'
import Link from "next/link";
import { Category } from "@/interface/product.t";

const CategoryCard = ({category}:{category:Category}) => {
  return (
      <div className="group mx-auto w-full max-w-[260px] cursor-pointer rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
            <div className="overflow-hidden rounded-lg bg-slate-100">
              <img
                src={category.image}
                alt={category.name || "category"}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-52"
              />
            </div>

            <div className="px-2 pb-2 pt-4 text-center">
              <h2 className="text-base font-bold text-slate-800 transition-colors group-hover:text-green-600">
                {category.name}
              </h2>

              <Link
                href={`/category/${category._id}`}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-white"
              >
                View Subcategories
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
  )
}

export default CategoryCard
