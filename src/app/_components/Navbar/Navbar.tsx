"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../../../assets/freshcart-logo.53f7a424c3aedc30a0fb46dc2278137c-_1_.png";
import { TfiAlignJustify } from "react-icons/tfi";
import { TfiClose } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
    { name: "Cart", href: "/cart" },
    { name: "Orders", href: "/orders" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white py-2 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        {/* Logo + Desktop Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="shrink-0">
            <Image
              src={Logo}
              alt="FreshCart Logo"
              className="w-32 object-contain sm:w-36"
            />
          </Link>

          {/* Desktop Navigation */}

          {status === "authenticated" ? (
            <ul className="hidden items-center gap-2 lg:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      link.href === pathname
                        ? "bg-green-50 font-semibold text-green-600 hover:bg-green-100"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Add Login / Register / Icons here */}

          <div>
            {status === "unauthenticated" ? (
              <ul className="flex gap-3 items-center">
                <li>
                  <Link
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      pathname === "/login"
                        ? "bg-green-50 font-semibold text-green-600 hover:bg-green-100"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      pathname === "/register"
                        ? "bg-green-50 font-semibold text-green-600 hover:bg-green-100"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                    href="/register"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>

          {status === "authenticated" && (
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              Log Out
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-green-50 hover:text-green-600 lg:hidden"
          >
            {isOpen ? <TfiClose /> : <TfiAlignJustify />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                    link.href === pathname
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
