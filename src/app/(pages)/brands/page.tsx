
import {
  FaTag,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaChevronRight,
  FaUndoAlt,
} from "react-icons/fa";

import { getAllBrands } from "@/apis/AllBrands";
import { Brand } from "@/interface/product.t";
import Link from "next/link";
import BrandsContent from "@/app/_components/BrandsContent/BrandsContent";

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
      <section className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:grid-cols-4 sm:gap-4 sm:p-5">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaTruck size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                Free Shipping
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                On orders over 500 EGP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaUndoAlt size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                Easy Returns
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                Hassle-free returns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaShieldAlt size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                Secure Payment
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                Your data is protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaHeadset size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                24/7 Support
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
