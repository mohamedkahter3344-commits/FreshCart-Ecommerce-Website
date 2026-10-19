
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Gategories from "../Gategories/Gategories";
import type { Category } from "@/interface/singleProduct.t";

const CategorySlider = ({categories}:{categories: Category[]}) => {
  return (
    <section className="w-full py-6">
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="h-11 w-1.5 rounded-full bg-green-600 shadow-sm" />

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-600">
              Explore our collection
            </p>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Shop by
              <span className="text-green-600 dark:text-green-400">
                Category
              </span>
            </h2>
          </div>
        </div>

        <Link
          href="/categories"
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-green-100 bg-green-50 px-5 py-3 text-sm font-bold text-green-700 transition-all duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white dark:border-green-900 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-600 dark:hover:text-white"
        >
          <span>View All Categories</span>
          <FaArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <Gategories categories={categories} />
    </section>
  );
};

export default CategorySlider;
