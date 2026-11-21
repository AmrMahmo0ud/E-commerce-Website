'use client'

import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product, quantity = 1 }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [added]);

  function handleClick(e) {
    e.preventDefault(); // the card is wrapped in a <Link>; don't navigate
    addToCart(product, quantity);
    setAdded(true);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
      className={`inline-flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 md:h-11 md:text-[15px] ${
        added
          ? "border-green-700 bg-white text-green-700"
          : "border-neutral-950 bg-neutral-950 text-white hover:bg-zinc-800"
      }`}
    >
      {added ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
      {added ? (
        "Added"
      ) : (
        <>
          <span className="md:hidden">Add</span>
          <span className="hidden md:inline">Add to cart</span>
        </>
      )}
    </button>
  );
}
