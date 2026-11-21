import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CartItem from "./CartItem";

export default function CartList({ items }) {
  return (
    <section aria-label="Cart items" className="min-w-0 md:flex-[999_1_560px]">
      {/* Visual column headings only; each row already labels its own controls. */}
      <div
        aria-hidden="true"
        className="hidden grid-cols-[96px_minmax(0,1fr)_160px_120px_52px] gap-x-6 border-b border-zinc-200 pb-3 text-[13px] font-semibold tracking-[0.08em] text-zinc-600 uppercase md:grid"
      >
        <span className="col-span-2">Product</span>
        <span>Quantity</span>
        <span className="text-right">Total</span>
      </div>

      <ul className="border-t border-zinc-200 md:border-t-0">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <Link
        href="/products"
        className="mt-6 hidden items-center gap-1.5 text-[15px] font-semibold underline underline-offset-4 md:inline-flex"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Continue shopping
      </Link>
    </section>
  );
}
