import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/interface/product.t";
import Image from "next/image";
import Link from "next/link";

import { CiHeart, CiStar } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ singleProduct }: { singleProduct: Product }) => {
  return (
    <>
      <Link href={`/productDetails/${singleProduct._id}`}>
        <Card className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 hover:cursor-pointer dark:bg-gray-950">
          {/* Product Image */}
          <div className="relative h-64 w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Badge className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600">
              Sale
            </Badge>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4 z-10 rounded-full border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
            >
              <CiHeart className="size-5" />
            </Button>

            <Image
              src={singleProduct.imageCover}
              alt={singleProduct.title}
              width={500}
              height={500}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Product Details */}
          <CardContent className="space-y-3 p-5">
            <div className="icons flex justify-between items-center">
              <p className="w-fit rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold tracking-wide text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
                {singleProduct.category?.name ?? "General"}
              </p>
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                {singleProduct.brand.name}
              </Badge>
            </div>

            <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {singleProduct.title.split(" ").slice(0, 2).join(" ")}
            </h3>

            <div className="flex items-center gap-1.5 text-sm">
              {Array.from({
                length: Math.round(singleProduct.ratingsAverage),
              }).map((_, idx) => (
                <CiStar key={idx} className="size-5 text-amber-400" />
              ))}

              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {singleProduct.ratingsAverage}
              </span>
              <span className="text-gray-400">(Reviews)</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {singleProduct.price} EGP
              </span>
            </div>
          </CardContent>

          {/* Actions */}
          <CardFooter className="px-5 py-5 ">
            <Button className="h-11 w-full gap-2 rounded-xl bg-green-600 font-semibold text-white transition-colors hover:bg-green-700">
              <FaShoppingCart className="size-4 text-white" />
              <span className="text-white">Add to Cart</span>
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
