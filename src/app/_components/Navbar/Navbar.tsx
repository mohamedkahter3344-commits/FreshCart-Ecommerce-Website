
"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FaShoppingBasket,
  FaHome,
  FaThLarge,
  FaTags,
  FaClipboardList,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import Logo from "../../../assets/freshcart-logo.53f7a424c3aedc30a0fb46dc2278137c-_1_.png";
import { cartContext } from "@/context/CartContext";

const Navbar = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { numOfCarts } = useContext(cartContext);

  const links = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Categories", href: "/categories", icon: FaThLarge },
    { name: "Brands", href: "/brands", icon: FaTags },
    { name: "Orders", href: "/allorders", icon: FaClipboardList },
  ];

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive(href)
        ? "bg-green-50 text-green-700"
        : "text-slate-600 hover:bg-green-50 hover:text-green-700"
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="shrink-0 transition-transform duration-200 hover:scale-[1.02]"
        >
          <Image
            src={Logo}
            alt="FreshCart Logo"
            priority
            className="h-auto w-28 object-contain sm:w-32 lg:w-36"
          />
        </Link>

        {/* Desktop Navigation */}
        {status === "authenticated" && (
          <ul className="hidden items-center gap-1 xl:flex">
            {links.map(({ name, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={linkClass(href)}>
                  <Icon size={15} />
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Cart */}
          {status === "authenticated" && (
            <Link
              href="/cart"
              aria-label={`Shopping cart, ${numOfCarts} items`}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 sm:h-12 sm:w-12 ${
                isActive("/cart")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <FaShoppingBasket size={22} />

              {numOfCarts > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-green-600 px-1 text-[10px] font-extrabold leading-none text-white">
                  {numOfCarts > 99 ? "99+" : numOfCarts}
                </span>
              )}
            </Link>
          )}

          {/* Authentication Actions */}
          {status === "unauthenticated" && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className={`flex items-center gap-1.5 rounded-xl px-2.5 py-2.5 text-sm font-semibold transition sm:px-4 ${
                  isActive("/login")
                    ? "bg-green-50 text-green-700"
                    : "text-slate-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <FaSignInAlt size={14} />
                <span>Login</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95 sm:px-4"
              >
                <FaUserPlus size={14} />
                <span className="hidden sm:inline">Register</span>
                <span className="sm:hidden">Join</span>
              </Link>
            </div>
          )}

          {status === "authenticated" && (
            <button
              type="button"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
              className="hidden items-center gap-2 rounded-xl border border-red-100 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 sm:flex lg:px-4"
            >
              <FaSignOutAlt size={15} />
              <span>Log Out</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 xl:hidden"
          >
            {isOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 shadow-lg sm:px-6 xl:hidden">
          {status === "authenticated" ? (
            <>
              <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Navigation
              </p>

              <ul className="flex flex-col gap-1">
                {links.map(({ name, href, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={linkClass(href)}
                    >
                      <Icon size={17} />
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    href="/cart"
                    onClick={closeMenu}
                    className={linkClass("/cart")}
                  >
                    <FaShoppingBasket size={17} />
                    <span>Shopping Cart</span>
                    <span className="ml-auto rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                      {numOfCarts}
                    </span>
                  </Link>
                </li>

                <li className="pt-2 sm:hidden">
                  <button
                    type="button"
                    onClick={() =>
                      signOut({
                        callbackUrl: "/login",
                      })
                    }
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <FaSignOutAlt size={16} />
                    Log Out
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMenu}
                className={linkClass("/")}
              >
                <FaHome size={17} />
                Home
              </Link>

              <Link
                href="/login"
                onClick={closeMenu}
                className={linkClass("/login")}
              >
                <FaSignInAlt size={17} />
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className={linkClass("/register")}
              >
                <FaUserPlus size={17} />
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
