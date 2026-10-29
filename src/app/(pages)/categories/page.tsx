
import { getAllCategories } from "@/apis/AllGategory";
import CategoryCard from "@/app/_components/CategoryCard/CategoryCard";
import StoreBenefits from "@/app/_components/StoreBenefits/StoreBenefits";
import { Category } from "@/interface/product.t";
import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa";

const Categories = async () => {

  const categories:Category[] = await getAllCategories()
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-400 px-5 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 flex items-center gap-2 text-xs text-green-100">
            <Link
              href="/"
              className="transition-colors hover:text-white hover:underline"
            >
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-white">Categories</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/20 text-white shadow-lg">
              <FaLayerGroup size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                All Categories
              </h1>
              <p className="mt-1 text-xs text-green-50 sm:text-sm">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto min-h-[calc(100vh-220px)] max-w-7xl px-5 py-8 sm:px-10 sm:py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Static Category Card */}
          {
            categories.map((category:Category)=> <CategoryCard key={category._id} category={category}/>)
          }
        
        </div>
      </section>

      {/* Footer Features */}
      <StoreBenefits />
    </main>
  );
};

export default Categories;
