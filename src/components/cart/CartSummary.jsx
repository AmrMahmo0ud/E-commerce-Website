// Shipping and taxes aren't modelled yet, so Total equals Subtotal for now.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function CartSummary({ totalItems, subtotal }) {
  const itemsText = totalItems === 1 ? "1 item" : `${totalItems} items`;

  return (
    <aside
      aria-labelledby="summary-heading"
      className="mt-5 flex flex-col gap-3.5 rounded-xl bg-zinc-100 p-5 md:mt-0 md:max-w-100 md:flex-[1_1_360px] md:gap-5 md:border md:border-zinc-200 md:bg-white md:p-7"
    >
      <h2 id="summary-heading" className="text-lg font-semibold md:text-xl">
        Order summary
      </h2>

      <dl className="flex flex-col gap-2.5 text-[15px] md:gap-3.5">
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-600">
            Subtotal<span className="hidden md:inline"> · {itemsText}</span>
          </dt>
          <dd className="font-mono font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-600">Shipping</dt>
          <dd className="text-zinc-600">
            <span className="md:hidden">At checkout</span>
            <span className="hidden md:inline">Calculated at checkout</span>
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-zinc-200 pt-3 md:pt-4 md:text-lg">
          <dt className="font-semibold">Total</dt>
          <dd className="font-mono text-xl font-semibold md:text-[22px]">{formatPrice(subtotal)}</dd>
        </div>
      </dl>

      {/* No checkout flow yet: the button is here so the layout matches the design. */}
      <button
        type="button"
        className="inline-flex h-13 cursor-pointer items-center justify-center gap-2.5 rounded-md bg-neutral-950 text-base font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      >
        Proceed to checkout
        <ArrowRight size={18} className="hidden md:block" aria-hidden="true" />
      </button>
      <p className="hidden text-[13px] leading-5 text-zinc-600 md:block">
        Taxes and shipping are added at checkout.
      </p>
      <Link
        href="/products"
        className="flex min-h-11 items-center justify-center text-[15px] font-semibold underline underline-offset-4 md:hidden"
      >
        Continue shopping
      </Link>
    </aside>
  );
}
