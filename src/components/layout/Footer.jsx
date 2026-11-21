import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

const shopLinks = [
  { href: "/products", label: "All Products" },
  { href: "/cart", label: "Cart" },
];
const categories = ["Electronics", "Fashion", "Home", "Sports"].map((name) => ({
  href: `/products?category=${encodeURIComponent(name)}`,
  label: name,
}));

const socials = [
  { href: "https://github.com", label: "GitHub", Icon: FaGithub },
  { href: "https://www.facebook.com", label: "Facebook", Icon: FaFacebook },
  { href: "https://www.instagram.com", label: "Instagram", Icon: FaInstagram },
];

export default function Footer() {
  const year = 2026;
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-black p-[10px] rounded-md">
            <ShoppingBag color="white" aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold">White Friday</p>
            <p className="text-sm text-gray-500">
              Everything you need, all in one place
            </p>
          </div>
        </div>

        <nav aria-label="Shop">
          <h2 className="font-bold">Shop</h2>
          <ul className="mt-2 flex flex-col gap-1">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`text-gray-500 rounded-md transition-colors hover:text-black hover:underline ${focusRing}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="categories">
          <h2 className="font-bold">Categories</h2>
          <ul className="mt-2 flex flex-col gap-1">
            {categories.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`text-gray-500 rounded-md transition-colors hover:text-black hover:underline ${focusRing}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 flex-col justify-center">
          <ul className="flex items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`${label} (opens in a new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-md text-gray-500 transition-colors hover:text-black ${focusRing}`}
                >
                  <Icon size={25} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 text-sm mt-2">
            © {year} White Friday. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
