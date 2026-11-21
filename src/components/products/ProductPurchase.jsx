// The only client piece of the product page, so ProductDetails can stay a server component.
'use client'

import Link from "next/link";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { MAX_QUANTITY, useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2";

const stepButton = `inline-flex h-[42px] w-11 cursor-pointer items-center justify-center rounded-md text-neutral-950 disabled:cursor-not-allowed disabled:text-zinc-300 md:h-[50px] md:w-13 ${focusRing}`;

export default function ProductPurchase({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Changing the quantity after adding resets the button, like the design.
  function changeQuantity(next) {
    setQuantity(next);
    setAdded(false);
  }

  function handleAdd() {
    addToCart(product, quantity);
    setAdded(true);
  }

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-zinc-200 p-4 md:grid-cols-[auto_minmax(0,1fr)] md:rounded-none md:border-0 md:border-t md:px-0 md:pt-7 md:pb-0">
      <span id="quantity-label" className="text-[15px] font-medium md:col-span-2 md:text-sm">
        Quantity
      </span>

      <div
        role="group"
        aria-labelledby="quantity-label"
        className="inline-flex h-11 items-center justify-self-end rounded-md border border-zinc-300 md:h-13 md:justify-self-start"
      >
        <button
          type="button"
          onClick={() => changeQuantity(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className={stepButton}
        >
          <Minus className="size-4 md:size-[18px]" aria-hidden="true" />
        </button>
        <span
          aria-live="polite"
          className="w-9 text-center font-mono text-base font-semibold md:w-10 md:text-[17px]"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => changeQuantity(quantity + 1)}
          disabled={quantity >= MAX_QUANTITY}
          aria-label="Increase quantity"
          className={stepButton}
        >
          <Plus className="size-4 md:size-[18px]" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`col-span-2 inline-flex h-13 cursor-pointer items-center justify-center gap-2.5 rounded-md border px-6 text-base font-semibold transition-colors md:col-span-1 md:min-w-60 ${focusRing} ${
          added
            ? "border-green-700 bg-white text-green-700"
            : "border-neutral-950 bg-neutral-950 text-white hover:bg-zinc-800"
        }`}
      >
        {added ? (
          <Check size={18} strokeWidth={2.4} className="hidden md:block" aria-hidden="true" />
        ) : (
          <ShoppingCart size={18} className="hidden md:block" aria-hidden="true" />
        )}
        {added ? "Added to cart" : `Add to cart · ${formatPrice(product.price * quantity)}`}
      </button>

      {/* Always rendered so screen readers announce the message when it appears. */}
      <p role="status" className="col-span-2 text-center text-sm text-green-700 empty:hidden md:text-left">
        {added && (
          <>
            Added to your cart.{" "}
            <Link href="/cart" className="font-semibold text-neutral-950 underline underline-offset-2">
              View cart
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
