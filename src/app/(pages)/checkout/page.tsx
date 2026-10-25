"use client";

import { defineStepper } from "@stepperize/react";
import { useContext, useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaShoppingCart,
  FaCreditCard,
  FaCheck,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaTruck,
  FaShieldAlt,
  FaTrash,
  FaEdit,
  FaBoxOpen,
  FaTag,
  FaPlus,
} from "react-icons/fa";
import { cartContext } from "@/context/CartContext";

const checkout = defineStepper([
  { id: "address", title: "Address" },
  { id: "review", title: "Review" },
  { id: "payment", title: "Payment" },
  { id: "confirm", title: "Confirm" },
  { id: "success", title: "Success" },
]);

type ShippingAddress = {
  id: string;
  details: string;
  phone: string;
  city: string;
  postalCode: string;
};

const emptyAddress = {
  details: "",
  phone: "",
  city: "",
  postalCode: "",
};

const formatPrice = (price: number) =>
  `${Number(price || 0).toFixed(2)} EGP`;

/*
 * CheckoutContent contains the complete checkout flow.
 * The parent component remounts it when starting a new order,
 * resetting the stepper to the Address step.
 */
function CheckoutContent({
  onNewCheckout,
}: {
  onNewCheckout: () => void;
}) {
  const stepper = checkout.useStepper({ linear: true });

  const { products, totalPriceCart, createProductOrder, cartId } =
    useContext(cartContext);

  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isAddressesLoaded, setIsAddressesLoaded] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(
    null,
  );
  const [shippingAddress, setShippingAddress] =
    useState<Omit<ShippingAddress, "id">>(emptyAddress);

  const [addressError, setAddressError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [payment, setPayment] = useState<"cash" | "online">("cash");

  // Modification 1:
  // If the user leaves the success step in any way (or the page unmounts),
  // start a fresh checkout from the beginning.
  useEffect(() => {
    if (stepper.current.id === "success") {
      return () => {
        onNewCheckout();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepper.current.id]);

  // Load saved addresses.
  useEffect(() => {
    try {
      const storedAddresses = localStorage.getItem("checkout_addresses");
      const storedSelectedId = localStorage.getItem(
        "checkout_selected_address",
      );

      if (storedAddresses) {
        const parsedAddresses: ShippingAddress[] =
          JSON.parse(storedAddresses);

        if (Array.isArray(parsedAddresses)) {
          setAddresses(parsedAddresses);

          if (
            storedSelectedId &&
            parsedAddresses.some((item) => item.id === storedSelectedId)
          ) {
            setSelectedAddressId(storedSelectedId);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setIsAddressesLoaded(true);
    }
  }, []);

  // Save addresses.
  useEffect(() => {
    if (!isAddressesLoaded) return;

    try {
      localStorage.setItem("checkout_addresses", JSON.stringify(addresses));

      if (
        selectedAddressId &&
        addresses.some((item) => item.id === selectedAddressId)
      ) {
        localStorage.setItem("checkout_selected_address", selectedAddressId);
      } else {
        localStorage.removeItem("checkout_selected_address");
      }
    } catch (error) {
      console.error("Failed to save addresses:", error);
    }
  }, [addresses, selectedAddressId, isAddressesLoaded]);

  const selectedAddress =
    addresses.find((item) => item.id === selectedAddressId) ?? null;

  function handleSaveAddress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !shippingAddress.details.trim() ||
      !shippingAddress.phone.trim() ||
      !shippingAddress.city.trim() ||
      !shippingAddress.postalCode.trim()
    ) {
      setAddressError("Please complete all address fields.");
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingAddressId
            ? { ...shippingAddress, id: editingAddressId }
            : item,
        ),
      );

      setSelectedAddressId(editingAddressId);
    } else {
      const newAddress: ShippingAddress = {
        ...shippingAddress,
        id: crypto.randomUUID(),
      };

      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id);
    }

    setAddressError("");
    setShowAddressForm(false);
    setEditingAddressId(null);
    setShippingAddress({ ...emptyAddress });
  }

  function handleAddAddress() {
    setShippingAddress({ ...emptyAddress });
    setEditingAddressId(null);
    setAddressError("");
    setShowAddressForm(true);
  }

  function handleEditAddress(item: ShippingAddress) {
    setShippingAddress({
      details: item.details,
      phone: item.phone,
      city: item.city,
      postalCode: item.postalCode,
    });

    setEditingAddressId(item.id);
    setAddressError("");
    setShowAddressForm(true);
  }

  function handleDeleteAddress(id: string) {
    setAddresses((prev) => prev.filter((item) => item.id !== id));

    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }

    if (editingAddressId === id) {
      setEditingAddressId(null);
      setShowAddressForm(false);
      setShippingAddress({ ...emptyAddress });
    }

    setAddressError("");
  }

  // Submit cash order only after the user confirms.
  async function handleNext() {
    setAddressError("");
    setOrderError("");

    if (stepper.current.id === "address") {
      if (!selectedAddress) {
        setAddressError("Please select a delivery address first.");
        return;
      }

      const result = await stepper.next({ complete: true });

      if (!result.accepted) {
        console.log("Could not move to the next step:", result.reason);
      }

      return;
    }

    if (stepper.current.id === "review") {
      if (!products || products.length === 0) {
        setOrderError("Your cart is empty.");
        return;
      }

      const result = await stepper.next({ complete: true });

      if (!result.accepted) {
        console.log("Could not move to the next step:", result.reason);
      }

      return;
    }

    if (stepper.current.id === "payment") {
      const result = await stepper.next({ complete: true });

      if (!result.accepted) {
        console.log("Could not move to the next step:", result.reason);
      }

      return;
    }

    if (stepper.current.id === "confirm") {
      if (!selectedAddress) {
        setOrderError("Please select a delivery address first.");
        return;
      }

      if (!products || products.length === 0) {
        setOrderError("Your cart is empty.");
        return;
      }

      if (payment === "online") {
        setOrderError(
          "Online payment is not connected yet. Please select Cash on Delivery.",
        );
        return;
      }

      if (!cartId) {
        setOrderError(
          "Cart ID is missing. Please refresh your cart and try again.",
        );
        return;
      }

      setIsPlacingOrder(true);

      try {
        const result = await createProductOrder(
          cartId,
          selectedAddress.details,
          selectedAddress.phone,
          selectedAddress.city,
          selectedAddress.postalCode,
        );

        if (result?.status !== "success") {
          setOrderError(result?.message || "Failed to place your order.");
          return;
        }

        // Modification 2:
        // Mark that an order was completed, so if the user comes back
        // to this page later, the checkout starts from the beginning.
        try {
          sessionStorage.setItem("checkout_completed", "1");
        } catch {}

        const nextResult = await stepper.next({ complete: true });

        if (!nextResult.accepted) {
          console.log(
            "Order created, but could not move to success:",
            nextResult.reason,
          );
        }
      } catch (error) {
        console.error("Create cash order failed:", error);
        setOrderError("Something went wrong while placing your order.");
      } finally {
        setIsPlacingOrder(false);
      }
    }
  }

  const steps = stepper.steps;

  return (
    <main className="min-h-screen bg-[#f4f5fb] px-4 py-8 sm:py-12">
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes softPop {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fade-up {
          animation: fadeUp 0.55s ease-out both;
        }

        .soft-pop {
          animation: softPop 0.45s ease-out both;
        }

        .product-card {
          animation: fadeUp 0.5s ease-out both;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 35px rgba(31, 41, 55, 0.08);
          border-color: #ddd6fe;
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up,
          .soft-pop,
          .product-card {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Checkout Progress */}
        <section className="rounded-3xl bg-white px-4 py-8 shadow-sm sm:px-8">
          <div className="relative">
            <div className="absolute left-[10%] right-[10%] top-7 h-1 rounded-full bg-slate-100" />

            <div
              className="absolute left-[10%] top-7 h-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500"
              style={{
                width: `${(stepper.index / (steps.length - 1)) * 80}%`,
              }}
            />

            <div className="relative grid grid-cols-5 gap-1">
              {steps.map((step, index) => {
                const isCurrent = step.id === stepper.current.id;
                const isCompleted = index < stepper.index;
                const isConfirmStep = step.id === "confirm";

                const Icon =
                  index === 0
                    ? FaMapMarkerAlt
                    : index === 1
                      ? FaShoppingCart
                      : index === 2
                        ? FaCreditCard
                        : index === 3
                          ? FaCheck
                          : FaCheckCircle;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 sm:h-14 sm:w-14 ${
                        isCurrent
                          ? isConfirmStep
                            ? "scale-110 bg-violet-600 text-white shadow-xl shadow-violet-400/60 ring-4 ring-violet-100 animate-pulse"
                            : "scale-105 bg-violet-600 text-white shadow-lg shadow-violet-200 ring-4 ring-violet-100"
                          : isCompleted
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <span
                      className={`text-[11px] font-bold sm:text-sm ${
                        isCurrent
                          ? "text-violet-700"
                          : isCompleted
                            ? "text-emerald-600"
                            : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Step Content */}
        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          {stepper.match({
            // STEP 1: ADDRESS
            address: () => (
              <div className="fade-up">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                      <FaMapMarkerAlt />
                      STEP 01
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      Delivery Address
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                      Where should we deliver your order?
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddAddress}
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-700"
                  >
                    <FaPlus size={12} />
                    Add New
                  </button>
                </div>

                {!isAddressesLoaded && (
                  <div className="rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                    Loading saved addresses...
                  </div>
                )}

                {isAddressesLoaded && addresses.length === 0 && (
                  <div className="soft-pop flex flex-col items-center rounded-3xl border-2 border-dashed border-violet-200 bg-gradient-to-b from-violet-50/70 to-white px-5 py-12 text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-violet-600 shadow-md shadow-violet-100">
                      <FaMapMarkerAlt size={32} />
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-900">
                      No addresses yet
                    </h2>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      You haven&apos;t added a delivery address. Add one to
                      continue with your order.
                    </p>

                    <button
                      type="button"
                      onClick={handleAddAddress}
                      className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-700"
                    >
                      Add Delivery Address
                    </button>
                  </div>
                )}

                {addresses.length > 0 && (
                  <div className="space-y-4">
                    {addresses.map((item, index) => (
                      <div
                        key={item.id}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className={`product-card rounded-2xl border-2 p-5 ${
                          selectedAddressId === item.id
                            ? "border-violet-500 bg-violet-50/70"
                            : "border-slate-100 bg-white"
                        }`}
                      >
                        <label className="flex cursor-pointer items-start gap-4">
                          <input
                            type="radio"
                            name="deliveryAddress"
                            checked={selectedAddressId === item.id}
                            onChange={() => {
                              setSelectedAddressId(item.id);
                              setAddressError("");
                            }}
                            className="mt-1 h-4 w-4 accent-violet-600"
                          />

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <FaHome size={21} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="font-extrabold text-slate-900">
                                Delivery Address
                              </h2>

                              {selectedAddressId === item.id && (
                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                  Selected
                                </span>
                              )}
                            </div>

                            <p className="mt-2 break-words text-sm text-slate-700">
                              {item.details}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {item.city} · {item.postalCode}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {item.phone}
                            </p>
                          </div>
                        </label>

                        <div className="mt-4 flex gap-5 pl-8">
                          <button
                            type="button"
                            onClick={() => handleEditAddress(item)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:underline"
                          >
                            <FaEdit />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(item.id)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:underline"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showAddressForm && (
                  <form
                    onSubmit={handleSaveAddress}
                    className="fade-up mt-6 grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:grid-cols-2 sm:p-6"
                  >
                    <h2 className="text-lg font-extrabold text-slate-900 sm:col-span-2">
                      {editingAddressId ? "Edit Address" : "Add New Address"}
                    </h2>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Address Details
                      </label>
                      <input
                        required
                        value={shippingAddress.details}
                        onChange={(e) =>
                          setShippingAddress((prev) => ({
                            ...prev,
                            details: e.target.value,
                          }))
                        }
                        placeholder="Street, building, apartment..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="01000000000"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        City
                      </label>
                      <input
                        required
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        placeholder="Cairo"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Postal Code
                      </label>
                      <input
                        required
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddress((prev) => ({
                            ...prev,
                            postalCode: e.target.value,
                          }))
                        }
                        placeholder="12345"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 sm:col-span-2">
                      <button
                        type="submit"
                        className="flex-1 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
                      >
                        {editingAddressId ? "Update Address" : "Save Address"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddressId(null);
                          setShippingAddress({ ...emptyAddress });
                          setAddressError("");
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {addressError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                  >
                    {addressError}
                  </p>
                )}
              </div>
            ),

            // STEP 2: REVIEW
            review: () => (
              <div className="fade-up">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                      <FaShoppingCart />
                      STEP 02
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      Review Your Order
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                      Double-check your items before checkout.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-violet-50 px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                      <FaShoppingCart />
                    </div>

                    <div>
                      <p className="text-lg font-extrabold text-slate-900">
                        {products?.length ?? 0}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        Cart items
                      </p>
                    </div>
                  </div>
                </div>

                {!products || products.length === 0 ? (
                  <div className="soft-pop flex flex-col items-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-12 text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-slate-400 shadow-sm">
                      <FaBoxOpen size={36} />
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-900">
                      Your cart is empty
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Add some products before placing your order.
                    </p>

                    <Link
                      href="/"
                      className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-700"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid items-start gap-6 lg:grid-cols-[1fr_330px]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-extrabold text-slate-900">
                          Your Items
                        </h2>
                        <span className="text-sm text-slate-400">
                          {products.length} products
                        </span>
                      </div>

                      {products.map((item: any, index: number) => {
                        const product = item.product;
                        const quantity = Number(item.count ?? 1);
                        const price = Number(item.price ?? 0);
                        const imageUrl = product?.imageCover;

                        const brand =
                          typeof product?.brand === "string"
                            ? product.brand
                            : product?.brand?.name;

                        const category =
                          typeof product?.category === "string"
                            ? product.category
                            : product?.category?.name;

                        return (
                          <article
                            key={item._id ?? product?._id ?? index}
                            style={{ animationDelay: `${index * 110}ms` }}
                            className="product-card rounded-2xl border border-slate-100 bg-white p-4 sm:p-5"
                          >
                            <div className="flex gap-4 sm:gap-5">
                              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-28">
                                {imageUrl ? (
                                  <Image
                                    src={imageUrl}
                                    alt={product?.title ?? "Product"}
                                    fill
                                    sizes="(max-width: 640px) 96px, 112px"
                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-slate-400">
                                    <FaBoxOpen size={28} />
                                  </div>
                                )}
                              </div>

                              <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                                <div>
                                  <div className="mb-2 flex flex-wrap items-center gap-2">
                                    {category && (
                                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                                        {category}
                                      </span>
                                    )}

                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                                      In cart
                                    </span>
                                  </div>

                                  <h3 className="line-clamp-2 text-sm font-extrabold leading-6 text-slate-900 sm:text-base">
                                    {product?.title ?? "Product"}
                                  </h3>

                                  {brand && (
                                    <p className="mt-1 text-xs text-slate-500">
                                      {brand}
                                    </p>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-3">
                                  <div>
                                    <p className="text-xs font-medium text-slate-400">
                                      Quantity
                                    </p>
                                    <div className="mt-1 inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
                                      <span className="text-sm font-bold text-slate-700">
                                        {quantity}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="min-w-0 text-right">
                                    <p className="text-sm font-semibold text-slate-600">
                                      Unit Price: {formatPrice(price)}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                      {formatPrice(price)} × {quantity}
                                    </p>

                                    <p className="mt-1 text-lg font-extrabold text-violet-700">
                                      Total: {formatPrice(price * quantity)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}

                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                      >
                        <FaPlus size={11} />
                        Add more products
                      </Link>
                    </div>

                    <aside
                      className="soft-pop rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-6"
                      style={{ animationDelay: "180ms" }}
                    >
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                          <FaShoppingCart size={18} />
                        </div>

                        <div>
                          <h2 className="text-lg font-extrabold text-slate-900">
                            Order Summary
                          </h2>
                          <p className="text-xs text-slate-500">
                            Price details
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 border-b border-dashed border-slate-200 pb-5">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-bold text-slate-800">
                            {formatPrice(Number(totalPriceCart ?? 0))}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="flex items-center gap-2 text-slate-500">
                            <FaTruck className="text-emerald-500" />
                            Shipping
                          </span>
                          <span className="font-bold text-emerald-600">
                            FREE
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="flex items-center gap-2 text-slate-500">
                            <FaTag className="text-violet-500" />
                            Tax
                          </span>
                          <span className="font-bold text-slate-800">
                            {formatPrice(0)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-5 text-white">
                        <p className="text-sm font-medium text-violet-100">
                          Total Amount
                        </p>

                        <p className="mt-2 text-2xl font-extrabold tracking-tight">
                          {formatPrice(Number(totalPriceCart ?? 0))}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-violet-100">
                          <FaCheckCircle />
                          All prices include your selected items
                        </div>
                      </div>

                      <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-3">
                        <FaShieldAlt className="mt-0.5 shrink-0 text-emerald-600" />
                        <p className="text-xs leading-5 text-emerald-800">
                          Secure checkout. Your order details are reviewed
                          before the final step.
                        </p>
                      </div>
                    </aside>
                  </div>
                )}
              </div>
            ),

            // STEP 3: PAYMENT
            payment: () => (
              <div className="fade-up">
                <div className="mb-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                    <FaCreditCard />
                    STEP 03
                  </div>

                  <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    Payment Method
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Choose how you want to pay.
                  </p>
                </div>

                <div className="space-y-4">
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition ${
                      payment === "cash"
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200 hover:border-violet-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "cash"}
                      onChange={() => {
                        setPayment("cash");
                        setOrderError("");
                      }}
                      className="accent-violet-600"
                    />

                    <FaTruck className="text-2xl text-violet-600" />

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Cash on Delivery
                      </h2>
                      <p className="text-sm text-slate-500">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition ${
                      payment === "online"
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200 hover:border-violet-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "online"}
                      onChange={() => {
                        setPayment("online");
                        setOrderError("");
                      }}
                      className="accent-violet-600"
                    />

                    <FaCreditCard className="text-2xl text-violet-600" />

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Online Payment
                      </h2>
                      <p className="text-sm text-slate-500">
                        Continue to secure online payment.
                      </p>
                    </div>
                  </label>
                </div>

                {selectedAddress && (
                  <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
                    <h2 className="mb-3 font-bold text-slate-900">
                      Delivery Address
                    </h2>

                    <div className="space-y-1 text-sm text-slate-700">
                      <p>{selectedAddress.details}</p>
                      <p>{selectedAddress.city}</p>
                      <p>{selectedAddress.postalCode}</p>
                      <p>{selectedAddress.phone}</p>
                    </div>
                  </div>
                )}

                {orderError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                  >
                    {orderError}
                  </p>
                )}
              </div>
            ),

            // STEP 4: CONFIRM
            confirm: () => (
              <div className="fade-up">
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-extrabold tracking-wider text-violet-700">
                    <FaCheckCircle />
                    STEP 04 · FINAL REVIEW
                  </div>

                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Confirm Your Order
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                    Review your order details before placing your order.
                  </p>
                </div>

                <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
                  <div className="space-y-5">
                    {/* Delivery Address */}
                    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50">
                      <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white px-5 py-4 sm:px-6">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                          <FaMapMarkerAlt size={18} />
                        </div>

                        <div className="flex-1">
                          <h2 className="font-extrabold text-slate-900">
                            Delivery Address
                          </h2>
                          <p className="mt-1 text-xs text-slate-500">
                            Where your order will be delivered
                          </p>
                        </div>

                        {selectedAddress && (
                          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                            <FaCheckCircle className="mr-1 inline" />
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="p-5 sm:p-6">
                        {selectedAddress ? (
                          <>
                            <div className="mb-5">
                              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                Full Address
                              </p>
                              <p className="break-words text-base font-bold leading-7 text-slate-800">
                                {selectedAddress.details}
                              </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-violet-50/50">
                                <div className="mb-2 flex items-center gap-2 text-slate-400">
                                  <FaHome size={13} />
                                  <span className="text-xs font-semibold">
                                    City
                                  </span>
                                </div>
                                <p className="break-words font-bold text-slate-800">
                                  {selectedAddress.city}
                                </p>
                              </div>

                              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-violet-50/50">
                                <div className="mb-2 flex items-center gap-2 text-slate-400">
                                  <FaTruck size={13} />
                                  <span className="text-xs font-semibold">
                                    Postal Code
                                  </span>
                                </div>
                                <p className="break-words font-bold text-slate-800">
                                  {selectedAddress.postalCode}
                                </p>
                              </div>

                              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-violet-50/50 sm:col-span-2">
                                <div className="mb-2 flex items-center gap-2 text-slate-400">
                                  <FaCreditCard size={13} />
                                  <span className="text-xs font-semibold">
                                    Contact Phone
                                  </span>
                                </div>
                                <p
                                  dir="ltr"
                                  className="text-left font-bold text-slate-800"
                                >
                                  {selectedAddress.phone}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
                            No delivery address selected.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50">
                      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <FaCreditCard size={19} />
                        </div>

                        <div>
                          <h2 className="font-extrabold text-slate-900">
                            Payment Method
                          </h2>
                          <p className="mt-1 text-xs text-slate-500">
                            Your selected payment option
                          </p>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-4 sm:p-5">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                            {payment === "cash" ? "💵" : "💳"}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-extrabold text-slate-900">
                              {payment === "cash"
                                ? "Cash on Delivery"
                                : "Online Payment"}
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {payment === "cash"
                                ? "Pay with cash when your order arrives at your doorstep."
                                : "Pay online using the available secure payment options."}
                            </p>
                          </div>

                          <FaCheckCircle className="shrink-0 text-xl text-emerald-500" />
                        </div>

                        {payment === "online" && (
                          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
                            Online payment is not connected yet. Select Cash
                            on Delivery to place your order.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Security note */}
                    <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <FaShieldAlt size={18} />
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">
                          Secure Checkout
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          Please verify your delivery information before
                          confirming your order.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-violet-100/50 lg:sticky lg:top-6">
                    <div className="bg-gradient-to-r from-violet-700 to-fuchsia-600 p-5 text-white sm:p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                          <FaShoppingCart size={21} />
                        </div>

                        <div>
                          <h2 className="text-lg font-extrabold">
                            Order Summary
                          </h2>
                          <p className="mt-1 text-sm text-white/75">
                            Your purchase details
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-white/20 pt-5">
                        <p className="text-sm font-medium text-white/75">
                          Total Amount
                        </p>

                        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                          {formatPrice(Number(totalPriceCart ?? 0))}
                        </p>

                        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                          <FaCheckCircle />
                          {products?.length ?? 0} products in your cart
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-bold text-slate-800">
                            {formatPrice(Number(totalPriceCart ?? 0))}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="flex items-center gap-2 text-slate-500">
                            <FaTruck className="text-emerald-500" />
                            Shipping
                          </span>
                          <span className="font-bold text-emerald-600">
                            FREE
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="flex items-center gap-2 text-slate-500">
                            <FaTag className="text-violet-500" />
                            Tax
                          </span>
                          <span className="font-bold text-slate-800">
                            {formatPrice(0)}
                          </span>
                        </div>
                      </div>

                      <div className="my-5 border-t border-dashed border-slate-200" />

                      <div className="flex items-center justify-between gap-3">
                        <span className="font-extrabold text-slate-900">
                          Total
                        </span>
                        <span className="text-xl font-extrabold text-violet-700">
                          {formatPrice(Number(totalPriceCart ?? 0))}
                        </span>
                      </div>

                      <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                        <div className="flex items-start gap-3">
                          <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-600" />
                          <div>
                            <p className="text-sm font-bold text-emerald-800">
                              Free Shipping
                            </p>
                            <p className="mt-1 text-xs leading-5 text-emerald-700">
                              No additional shipping fees on this order.
                            </p>
                          </div>
                        </div>
                      </div>

                      {orderError && (
                        <div
                          role="alert"
                          className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-600"
                        >
                          <span className="mt-0.5">⚠️</span>
                          <span>{orderError}</span>
                        </div>
                      )}

                      <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                        By placing your order, you confirm that your delivery
                        details are correct.
                      </p>
                    </div>
                  </aside>
                </div>
              </div>
            ),

            // STEP 5: SUCCESS
            success: () => (
              <div className="soft-pop flex flex-col items-center py-10 text-center">
                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-emerald-500 ring-8 ring-emerald-50">
                  <FaCheckCircle size={64} />
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900">
                  Thank You!
                </h1>

                <p className="mt-3 max-w-md text-slate-500">
                  Your order has been placed successfully.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/"
                    onClick={onNewCheckout}
                    className="rounded-xl border border-slate-200 px-7 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Continue Shopping
                  </Link>

                  <button
                    type="button"
                    onClick={onNewCheckout}
                    className="rounded-xl bg-violet-600 px-7 py-3 font-bold text-white transition hover:bg-violet-700"
                  >
                    Start New Order
                  </button>
                </div>
              </div>
            ),
          })}

          {/* Navigation */}
          {stepper.current.id !== "success" && (
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => {
                  setOrderError("");
                  stepper.prev();
                }}
                disabled={
                  !stepper.canPrev ||
                  stepper.isPending ||
                  isPlacingOrder
                }
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaArrowLeft size={13} />
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !isAddressesLoaded ||
                  stepper.isPending ||
                  isPlacingOrder ||
                  (stepper.current.id === "address" && !selectedAddress) ||
                  (stepper.current.id === "review" &&
                    (!products || products.length === 0))
                }
                className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:px-8"
              >
                {isPlacingOrder
                  ? "Placing Order..."
                  : stepper.current.id === "confirm"
                    ? "Place Order"
                    : "Continue"}

                {!isPlacingOrder && <FaArrowRight size={14} />}
              </button>
            </div>
          )}
        </section>

        <p className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <FaShieldAlt className="text-emerald-500" />
          Secure checkout · FreshCart
        </p>
      </div>
    </main>
  );
}

/*
 * Changing checkoutKey remounts CheckoutContent,
 * which resets the stepper to the first step (Address).
 * Saved addresses remain available because they are stored in localStorage.
 */
export default function CheckoutPage() {
  const [checkoutKey, setCheckoutKey] = useState(0);

  // Modification 2 (parent side):
  // If the user comes back to this page after a completed order,
  // start from the beginning.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("checkout_completed") === "1") {
        sessionStorage.removeItem("checkout_completed");
        setCheckoutKey((previousKey) => previousKey + 1);
      }
    } catch {}
  }, []);

  function handleNewCheckout() {
    try {
      sessionStorage.removeItem("checkout_completed");
    } catch {}

    setCheckoutKey((previousKey) => previousKey + 1);
  }

  return (
    <CheckoutContent
      key={checkoutKey}
      onNewCheckout={handleNewCheckout}
    />
  );
}
