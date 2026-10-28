
import {
  FaTag,
  
  FaChevronRight,
} from "react-icons/fa";

import { getAllBrands } from "@/apis/AllBrands";
import { Brand } from "@/interface/product.t";
import Link from "next/link";
import BrandsContent from "@/app/_components/BrandsContent/BrandsContent";
import StoreBenefits from "@/app/_components/StoreBenefits/StoreBenefits";

export default async function Brands() {
  const resBrands: Brand[] = await getAllBrands();

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-12">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-500">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
          <div className="mb-5 flex items-center gap-2 text-xs font-medium text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>

            <FaChevronRight size={11} />

            <span className="font-semibold text-white">Brands</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-sm">
              <FaTag size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Top Brands
              </h1>

              <p className="mt-2 text-sm text-white/80 sm:text-base">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Content */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10">
        <BrandsContent brands={resBrands ?? []} />
      </section>

      {/* Store Benefits */}
     <StoreBenefits/>
    </main>
  );
}
