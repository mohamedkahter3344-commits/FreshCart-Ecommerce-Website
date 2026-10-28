import { getSingleProduct } from "@/apis/singleProduct";
import { SingleProduct } from "@/interface/singleProduct.t";
import {  CiStar } from "react-icons/ci";
import {  FaShieldAlt, FaTruck } from "react-icons/fa";
import Image from "next/image";
import ButtonCard from "@/app/_components/ButtonCard/ButtonCard";
import WishListButton from "@/app/_components/WishListButton/WishListButton";
import Link from "next/link";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const singleProduct: SingleProduct = await getSingleProduct(id);

  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-14 dark:bg-gray-950">
      <div className="mx-auto w-[92%] max-w-7xl">
        {/* Breadcrumb */}

<div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
  <Link
    href="/"
    className="transition-colors hover:text-green-600"
  >
    Home
  </Link>

  <span>/</span>

  <span className="font-medium text-green-700 dark:text-green-400">
    {singleProduct.category?.name ?? "General"}
  </span>
</div>

        {/* Product Details Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative flex min-h-87.5 items-center justify-center bg-green-50/70 p-6 sm:p-10 md:min-h-140 dark:bg-gray-800/50">
              <span className="absolute left-5 top-5 rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-semibold text-green-700 shadow-sm dark:border-green-800 dark:bg-gray-900 dark:text-green-400">
                {singleProduct.category?.name ?? "General"}
              </span>

             <WishListButton id={singleProduct._id}/>

              <Image
              width={500}
              height={500}
                src={singleProduct.imageCover}
                alt={singleProduct.title}
                className="max-h-112.5 w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-700 dark:text-green-400">
                FreshCart Collection
              </p>

              <h1 className="mb-5 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
                {singleProduct.title}
              </h1>

              <p className="my-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 dark:text-gray-300">
                {singleProduct.description}
              </p>

              {/* Rating */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({
                    length: Math.round(singleProduct.ratingsAverage),
                  }).map((_, idx) => (
                    <CiStar
                      key={idx}
                      className="size-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {singleProduct.ratingsAverage}
                </span>

                <span className="text-sm text-gray-400">Customer rating</span>
              </div>

              {/* Price */}
              <div className="mb-6 border-y border-gray-100 py-6 dark:border-gray-800">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Side */}
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-700 sm:text-4xl dark:text-green-400">
                        {singleProduct.price}
                      </span>

                      <span className="text-sm font-medium text-gray-500">
                        EGP
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      Price includes the listed product only.
                    </p>
                  </div>

                  {/* Right Side */}
                  {singleProduct.quantity > 0 ? (
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase text-gray-400">
                        Stock Status
                      </p>

                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        Available
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase text-gray-400">
                        Stock Status
                      </p>

                      <p className="text-xl font-bold text-red-600 dark:text-red-400">
                        Not-Available
                      </p>
                    </div>
                  )}

                  {singleProduct.quantity > 0 ? (
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase text-gray-400">
                        Quantity
                      </p>

                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {singleProduct.quantity}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="mb-7 flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">
                  Category:
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                  {singleProduct.category?.name ?? "General"}
                </span>
              </div>

              
            {/* Actions */}
<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  <ButtonCard id={singleProduct._id} />

  <WishListButton
    id={singleProduct._id}
    variant="action"
  />
</div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    <FaTruck className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Delivery
                    </p>
                    <p className="text-xs text-gray-500">Convenient shopping</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    <FaShieldAlt className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Quality
                    </p>
                    <p className="text-xs text-gray-500">
                      Product information available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
