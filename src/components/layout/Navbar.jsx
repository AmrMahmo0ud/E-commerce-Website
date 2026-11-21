'use client'
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];

function NavLink({ href, children, onClick, className = "" }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-md px-3 py-2 transition-colors hover:bg-gray-100 hover:text-black ${focusRing} ${
        isActive ? "font-semibold text-black bg-gray-100" : "text-gray-600"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

// Submitting goes to /products?q=..., where the products page filters by name.
function SearchInput({ className = "" }) {
  return (
    <Form action="/products" role="search" className={className}>
      <input
        type="search"
        name="q"
        placeholder="Search products"
        aria-label="Search products"
        className="w-full bg-gray-200 rounded-md px-3 py-1.5 transition-colors hover:bg-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
      />
    </Form>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { totalItems } = useCart();

  return (
    <nav
      aria-label="Main"
      className="w-full bg-white text-black sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 min-h-16 flex items-center  gap-4">
        <Link
          href="/"
          className={`text-lg md:text-2xl font-bold rounded-md ${focusRing}`}
        >
          White Friday
        </Link>

        <div className="hidden md:flex items-center gap-2 flex-1">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SearchInput className="hidden md:block" />
          <Link
            href="/cart"
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors hover:bg-gray-100 border-1 border-gray-200 ${focusRing}`}
          >
            <ShoppingCart size={20} aria-hidden="true" />
            <span className="hidden md:block">Cart</span>
            <span className="sr-only md:hidden">Cart</span>
            {totalItems > 0 && <span>{totalItems}</span>}
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={`md:hidden rounded-md p-1 transition-colors hover:bg-gray-100 ${focusRing}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-2">
        <SearchInput className="w-full" />
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden flex flex-col gap-1 px-4 py-3 border-t border-gray-200"
        >
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} onClick={closeMenu}>
              {l.label}
            </NavLink>
          ))}
          <NavLink href="/cart" onClick={closeMenu}>
            Cart
          </NavLink>
        </div>
      )}
    </nav>
  );
}
