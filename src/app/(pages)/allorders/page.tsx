
import Link from "next/link";
import {
  FaBoxOpen,
  FaShoppingBag,
  
} from "react-icons/fa";

import OrderCard from "@/app/_components/OrderCard/OrderCard";
import type { Order, OrdersType } from "@/interface/orders.t";
import { getUserOrderAction } from "@/OrderAction/getUserOrders";
import { getMyToken } from "@/utilities/mytoken";
import { jwtDecode } from "jwt-decode";
import StoreBenefits from "@/app/_components/StoreBenefits/StoreBenefits";

const AllOrders = async () => {
  const token = await getMyToken();

  if (!token) {
    return (
      <main className="min-h-[60vh] px-4 py-16 text-center">
        <p className="text-lg text-slate-500">
          Please login to see your orders.
        </p>

        <Link
          href="/login"
          className="mt-4 inline-block rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-bold text-white transition hover:bg-emerald-700"
        >
          Login
        </Link>
      </main>
    );
  }

  // Decode token and validate user ID
  const decodedToken: unknown = jwtDecode(token);

  if (
    typeof decodedToken !== "object" ||
    decodedToken === null ||
    !("id" in decodedToken) ||
    typeof decodedToken.id !== "string"
  ) {
    throw new Error("Invalid user ID in token");
  }

  const result = (await getUserOrderAction(
    decodedToken.id,
  )) as OrdersType;

  // Sort orders from newest to oldest
  const orders: Order[] = [...(result ?? [])].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 sm:text-base">
        <Link href="/" className="transition hover:text-emerald-600">
          Home
        </Link>

        <span>/</span>

        <span className="font-semibold text-slate-800">
          My Orders
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200 sm:h-16 sm:w-16">
            <FaShoppingBag size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Track and manage your {orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-bold text-emerald-600 transition hover:text-emerald-700 hover:underline"
        >
          <FaShoppingBag size={14} />
          Continue Shopping
        </Link>
      </div>

      {/* Orders */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-5 py-16 text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-emerald-500 shadow-md shadow-emerald-100">
            <FaBoxOpen size={38} />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            No orders yet
          </h2>

          <p className="mt-2 text-base text-slate-500">
            When you place an order, it will show up here.
          </p>

          <Link
            href="/"
            className="mt-6 rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-bold text-white transition hover:bg-emerald-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              singleOrder={order}
            />
          ))}
        </div>
      )}

      {/* Features strip */}
     <StoreBenefits/>
    </main>
  );
};

export default AllOrders;
