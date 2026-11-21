'use client'

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";

export default function CartPage() {
  const { items, isLoaded, totalItems, subtotal } = useCart();
  const countText = totalItems === 1 ? "1 item" : `${totalItems} items`;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pt-6 pb-12 text-neutral-950 md:gap-8 md:px-6 md:pt-10 md:pb-24">
      <header className="flex items-baseline justify-between gap-4 md:justify-start">
        <h1 className="text-[32px] leading-9 font-bold tracking-[-0.03em] md:text-[44px] md:leading-12 md:tracking-[-0.035em]">
          Your cart
        </h1>
        <p role="status" className="text-sm text-zinc-600 md:text-base">
          {isLoaded && countText}
        </p>
      </header>

      {!isLoaded ? null : items.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart size={24} />}
          title="Your cart is empty"
          message="Products you add will show up here."
          action={
            <Link
              href="/products"
              className="inline-flex h-12 items-center rounded-md bg-neutral-950 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 md:h-11 md:px-5"
            >
              Browse products
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-start md:gap-10">
          <CartList items={items} />
          <CartSummary totalItems={totalItems} subtotal={subtotal} />
        </div>
      )}
    </div>
  );
}
