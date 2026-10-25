"use client";

import Link from "next/link";
import { FaHouse, FaMagnifyingGlass } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-50">
          <span className="text-6xl font-extrabold text-green-600">
            404
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mb-8 max-w-md leading-7 text-gray-500">
          Oops! The page you're looking for doesn't exist or may have been
          moved. Let's get you back to fresh shopping.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <FaHouse />
            Back to Home
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
          >
            <FaMagnifyingGlass />
            Browse Products
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          FreshCart — Fresh choices, every day.
        </p>
      </div>
    </main>
  );
}