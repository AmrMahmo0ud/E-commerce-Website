// Layout: one CSS grid with explicit cells.
//   Mobile  (3 cols): [thumb] [name + price]  [remove]
//                     [thumb] [stepper]       [line total]
//   Desktop (5 cols): [thumb] [name + price] [stepper] [line total] [remove]
'use client'

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { MAX_QUANTITY, useCart } from "@/context/CartContext";
import { categoryTint, formatPrice } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2";

const stepButton = `inline-flex h-[38px] w-11 cursor-pointer items-center justify-center rounded-md text-neutral-950 disabled:cursor-not-allowed disabled:text-zinc-300 md:h-[42px] ${focusRing}`;

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, name, price, category, image, quantity } = item;
  const href = `/products/${id}`;

  return (
    <li className="grid grid-cols-[80px_minmax(0,1fr)_auto] gap-x-2 gap-y-2.5 border-b border-zinc-200 py-4 md:grid-cols-[96px_minmax(0,1fr)_160px_120px_52px] md:items-center md:gap-x-6 md:py-6">
      {/* The name below is the real link; this one is a mouse shortcut, so keyboard users skip it. */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative col-start-1 row-span-2 row-start-1 mr-1.5 size-20 self-start overflow-hidden rounded-[10px] md:row-span-1 md:mr-0 md:size-24 ${categoryTint(category)}`}
      >
        <Image src={image} alt="" fill sizes="96px" className="object-cover mix-blend-multiply" />
      </Link>

      <div className="col-start-2 row-start-1 flex min-w-0 flex-col gap-0.5 md:gap-1">
        <span className="hidden text-xs font-semibold tracking-[0.08em] text-zinc-600 uppercase md:block">
          {category}
        </span>
        <Link href={href} className="text-[15px] font-semibold hover:underline md:text-[17px]">
          {name}
        </Link>
        <span className="font-mono text-[13px] text-zinc-600 md:text-sm">
          {formatPrice(price)} each
        </span>
      </div>

      <div
        role="group"
        aria-label={`Quantity for ${name}`}
        className="col-start-2 row-start-2 inline-flex h-10 items-center justify-self-start rounded-md border border-zinc-300 md:col-start-3 md:row-start-1 md:h-11 md:w-34"
      >
        <button
          type="button"
          onClick={() => updateQuantity(id, quantity - 1)}
          aria-label={quantity === 1 ? `Remove ${name} from cart` : "Decrease quantity"}
          className={stepButton}
        >
          <Minus className="size-3.5 md:size-4" aria-hidden="true" />
        </button>
        <span className="w-7 text-center font-mono text-[15px] font-semibold md:flex-1">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity(id, quantity + 1)}
          disabled={quantity >= MAX_QUANTITY}
          aria-label="Increase quantity"
          className={stepButton}
        >
          <Plus className="size-3.5 md:size-4" aria-hidden="true" />
        </button>
      </div>

      <p className="col-start-3 row-start-2 self-center text-right font-mono text-base font-semibold md:col-start-4 md:row-start-1 md:text-[17px]">
        {formatPrice(price * quantity)}
      </p>

      <button
        type="button"
        onClick={() => removeFromCart(id)}
        aria-label={`Remove ${name} from cart`}
        className={`col-start-3 row-start-1 -mt-2 -mr-2 inline-flex size-11 cursor-pointer items-center justify-center justify-self-end rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 md:col-start-5 md:m-0 md:border md:border-zinc-200 md:bg-white md:text-neutral-950 ${focusRing}`}
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </li>
  );
}
