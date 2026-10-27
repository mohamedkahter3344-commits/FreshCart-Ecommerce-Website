
import { getAllProductsBrand } from "@/apis/getAllProductsByBrands";
import ProductCard from "@/app/_components/ProuductCart/ProductCard";
import { Product, ProductType } from "@/interface/product.t";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaArrowLeft,
  FaStore,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Link from "next/link";

type BrandProductsProps = {
  params: Promise<{
    id: string;
  }>;
};

const BrandProducts = async ({ params }: BrandProductsProps) => {
  const { id } = await params;

  const resProductsBrand: ProductType = await getAllProductsBrand(id);

  const products = Array.isArray(resProductsBrand)
    ? resProductsBrand
    : [];

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-violet-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/brands"
            className="transition hover:text-violet-600"
          >
            Brands
          </Link>

          <span>/</span>

          <span className="font-semibold text-slate-800">
            Brand Products
          </span>
        </nav>

        {/* Page Header */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-600 px-6 py-8 shadow-lg shadow-violet-200/50 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <HiSparkles size={16} />
                Explore Our Collection
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Brand Products
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
                Discover our collection and find the products
                that match your style and needs.
              </p>
            </div>

            <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <FaShoppingBag size={22} />
              </div>

              <div>
                <p className="text-2xl font-extrabold">
                  {products.length}
                </p>
                <p className="text-xs font-medium text-violet-100">
                  {products.length === 1 ? "Product Available" : "Products Available"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-1.5 rounded-full bg-violet-600" />
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Our Collection
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {products.length > 0
                  ? `Showing ${products.length} ${products.length === 1 ? "product" : "products"} in this collection`
                  : "Explore our available products"}
              </p>
            </div>

            {products.length > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
                <FaStore size={14} />
                {products.length} {products.length === 1 ? "Item" : "Items"}
              </div>
            )}
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  singleProduct={product}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-50 text-violet-500">
                <FaBoxOpen size={42} />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">
                No Products Found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                There are currently no products available in this
                collection. You can explore other brands and discover
                something you love.
              </p>

              <Link
                href="/brands"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                <FaArrowLeft size={14} />
                Explore Other Brands
              </Link>
            </div>
          )}
        </section>

        {/* Bottom Note */}
        {products.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 text-center text-sm text-emerald-800">
            <FaShoppingBag className="shrink-0 text-emerald-600" />
            <p>
              You&apos;re exploring {products.length}{" "}
              {products.length === 1 ? "product" : "products"} from this collection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BrandProducts;
