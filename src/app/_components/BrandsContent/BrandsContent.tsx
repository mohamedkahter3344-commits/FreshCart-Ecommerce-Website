
"use client";

import { useState } from "react";
import { Brand } from "@/interface/product.t";
import SingleBrand from "@/app/_components/SingleBrand/SingleBrand";
import SearchInput from "@/app/_components/SearchInput/SearchInput";
import { FaSearch } from "react-icons/fa";

const BrandsContent = ({ brands }: { brands: Brand[] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <>
      {/* Search Card */}
      <div className="mb-7 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Explore Our Brands
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Discover products from brands you love.
            </p>
          </div>

          <SearchInput onSearch={setSearchTerm} />
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            All Brands
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Browse our brand collection
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
          {filteredBrands.length}
           { filteredBrands.length === 1 ? "Brand" : "Brands"}
        </span>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredBrands.map((brand) => (
            <SingleBrand key={brand._id} singleBrand={brand} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
            <FaSearch size={22} />
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            No Brands Found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            We couldn't find any brands matching &quot;{searchTerm}&quot;.
            Try another name.
          </p>
        </div>
      )}

      {/* Results Count */}
      <p className="mt-4 text-sm text-slate-500">
        Showing {filteredBrands.length} of {brands.length} brands
      </p>
    </>
  );
};

export default BrandsContent;
