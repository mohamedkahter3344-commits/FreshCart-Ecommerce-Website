
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShoppingBag,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";

import type {
  Order,
  CartItem,
  ShippingAddress,
} from "@/interface/orders.t";

const formatPrice = (price: number): string => price.toFixed(0);

const formatDate = (date?: string): string => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

type StatusKey = "delivered" | "paid" | "processing";

type StatusStyle = {
  label: string;
  badge: string;
  summary: string;
  border: string;
};

const statusStyles: Record<StatusKey, StatusStyle> = {
  processing: {
    label: "Processing",
    badge: "bg-amber-100 text-amber-700",
    summary: "bg-amber-100/80",
    border: "border-emerald-200",
  },
  paid: {
    label: "Paid",
    badge: "bg-blue-100 text-blue-700",
    summary: "bg-blue-50",
    border: "border-emerald-200",
  },
  delivered: {
    label: "Delivered",
    badge: "bg-emerald-100 text-emerald-700",
    summary: "bg-emerald-50",
    border: "border-emerald-200",
  },
};

const getPaymentMethod = (method: string) => {
  const normalizedMethod = method.toLowerCase();

  if (
    normalizedMethod.includes("cash") ||
    normalizedMethod.includes("cod")
  ) {
    return {
      label: "Cash on Delivery",
      icon: FaMoneyBillWave,
      style: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
  }

  if (
    normalizedMethod.includes("card") ||
    normalizedMethod.includes("credit") ||
    normalizedMethod.includes("visa") ||
    normalizedMethod.includes("master")
  ) {
    return {
      label: "Credit / Debit Card",
      icon: FaCreditCard,
      style: "bg-blue-50 text-blue-700 border-blue-100",
    };
  }

  if (
    normalizedMethod.includes("wallet") ||
    normalizedMethod.includes("paymob")
  ) {
    return {
      label: "Digital Wallet",
      icon: FaWallet,
      style: "bg-violet-50 text-violet-700 border-violet-100",
    };
  }

  return {
    label: method || "Not specified",
    icon: FaCreditCard,
    style: "bg-slate-50 text-slate-600 border-slate-200",
  };
};

const OrderCard = ({ singleOrder }: { singleOrder: Order }) => {
  const [open, setOpen] = useState(false);

  const order = singleOrder;

  const items: CartItem[] = order.cartItems ?? [];
  const address: ShippingAddress = order.shippingAddress;

  const status: StatusKey = order.isDelivered
    ? "delivered"
    : order.isPaid
      ? "paid"
      : "processing";

  const style = statusStyles[status];
  const payment = getPaymentMethod(order.paymentMethodType);
  const PaymentIcon = payment.icon;

  const firstImage = items[0]?.product?.imageCover;
  const total = order.totalOrderPrice ?? 0;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${style.border}`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-4 sm:p-5">
        {/* Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-24 sm:w-24">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={items[0]?.product?.title ?? "Order"}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <FaBoxOpen size={26} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${style.badge}`}
          >
            {status === "delivered" ? (
              <FaCheckCircle size={9} />
            ) : (
              <FaClock size={9} />
            )}
            {style.label}
          </span>

          <h3 className="mt-2 text-lg font-extrabold text-slate-900">
            <span className="mr-1 text-slate-400">#</span>
            {order.id ?? order._id}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <FaCalendarAlt size={10} />
              {formatDate(order.createdAt)}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <FaClipboardList size={10} />
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>

            {address?.city && (
              <>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <span className="inline-flex items-center gap-1.5">
                  <FaMapMarkerAlt size={10} />
                  {address.city}
                </span>
              </>
            )}
          </div>

          <p className="mt-3 text-xl font-extrabold text-slate-900">
            {formatPrice(total)}{" "}
            <span className="text-xs font-medium text-slate-400">
              EGP
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-col items-end justify-between self-stretch">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <FaShoppingBag size={12} />
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            {open ? "Hide" : "Show"}

            {open ? (
              <FaChevronUp size={10} />
            ) : (
              <FaChevronDown size={10} />
            )}
          </button>
        </div>
      </div>

      {/* Details */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            {/* Items */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                  <FaClipboardList size={9} />
                </span>
                Order Items
              </div>

              <div className="space-y-2">
                {items.map((item: CartItem, index: number) => {
                  const product = item.product;
                  const count = item.count;
                  const price = item.price;

                  return (
                    <div
                      key={item._id || product._id || index}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {product.imageCover ? (
                          <Image
                            src={product.imageCover}
                            alt={product.title ?? "Product"}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-300">
                            <FaBoxOpen size={16} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-bold text-slate-800">
                          {product.title ?? "Product"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {count} × {formatPrice(price)} EGP
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-extrabold text-slate-900">
                          {formatPrice(price * count)}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          EGP
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Address + Payment Method */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Delivery Address */}
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                    <FaMapMarkerAlt size={9} />
                  </span>
                  Delivery Address
                </div>

                <p className="text-sm font-extrabold text-slate-900">
                  {address?.city ?? "—"}
                </p>

                <p className="mt-1 break-words text-xs text-slate-500">
                  {address?.details ?? "—"}
                </p>

                {address?.phone && (
                  <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <FaPhoneAlt size={10} />
                    <span dir="ltr">{address.phone}</span>
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-100 text-violet-600">
                    <FaCreditCard size={9} />
                  </span>
                  Payment Method
                </div>

                <div
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2.5 ${payment.style}`}
                >
                  <PaymentIcon size={15} />
                  <span className="text-sm font-bold">
                    {payment.label}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  {order.isPaid ? (
                    <>
                      <FaCheckCircle className="text-emerald-500" size={12} />
                      <span>Payment completed</span>
                    </>
                  ) : (
                    <>
                      <FaClock className="text-amber-500" size={12} />
                      <span>Payment pending</span>
                    </>
                  )}
                </div>

                {order.paidAt && (
                  <p className="mt-2 text-xs text-slate-400">
                    Paid on {formatDate(order.paidAt)}
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className={`rounded-xl p-4 ${style.summary}`}>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-400 text-white">
                  <FaClipboardList size={9} />
                </span>
                Order Summary
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">
                    {formatPrice(total)} EGP
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-700">
                    {order.shippingPrice === 0
                      ? "Free"
                      : `${formatPrice(order.shippingPrice)} EGP`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <span>Tax</span>
                  <span className="font-semibold text-slate-700">
                    {formatPrice(order.taxPrice)} EGP
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
                <span className="text-sm font-extrabold text-slate-900">
                  Total
                </span>

                <span className="text-base font-extrabold text-slate-900">
                  {formatPrice(total)} EGP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
