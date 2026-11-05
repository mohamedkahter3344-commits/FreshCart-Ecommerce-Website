
import React from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa6";

const Footer = () => {
  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Bakery & Snacks",
    "Meat & Seafood",
    "Beverages",
  ];

  const quickLinks = [
    "About Us",
    "Contact Us",
    "Privacy Policy",
    "Terms of Service",
    "Shipping Policy",
  ];

  const customerLinks = [
    "My Account",
    "Order History",
    "Wishlist",
    "Returns & Refunds",
    "Help Center",
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaXTwitter, href: "#", label: "X" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const paymentMethods = [
    { icon: FaCcVisa, label: "Visa" },
    { icon: FaCcMastercard, label: "Mastercard" },
    { icon: FaCcPaypal, label: "PayPal" },
    { icon: FaCcAmex, label: "American Express" },
  ];

  return (
    <footer className="bg-[#101827] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Brand */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            <span className="text-green-500">Fresh</span>
            <span className="text-white">Cart</span>
          </h2>

          <p className="max-w-xs text-sm leading-6 text-gray-300">
            FreshCart is your one-stop destination for fresh groceries,
            organic produce, and household essentials delivered right to
            your doorstep.
          </p>

          {/* Social Media */}
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#202c3d] text-sm text-white transition-all duration-300 hover:bg-green-500 hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Categories</h3>

          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  className="text-sm text-gray-300 transition-colors hover:text-green-500"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Quick Links</h3>

          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-gray-300 transition-colors hover:text-green-500"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Customer Service</h3>

          <ul className="space-y-3">
            {customerLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-gray-300 transition-colors hover:text-green-500"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-400">We accept:</span>

            {paymentMethods.map(({ icon: Icon, label }) => (
              <div
                key={label}
                title={label}
                className="flex h-9 w-12 items-center justify-center rounded-md bg-[#202c3d] text-2xl text-gray-200"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
