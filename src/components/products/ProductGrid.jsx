import Link from "next/link";
import { SearchX } from "lucide-react";
import ProductCard from "./ProductCard";

// TODO: swap the inline empty block for the shared EmptyState once it's built.
export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <section
        aria-label="Results"
        className="flex min-h-90 min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-zinc-200 p-8 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-zinc-100">
          <SearchX size={24} aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-semibold">No products match these filters</h2>
          <p className="text-[15px] text-zinc-600">Try another search term or remove a filter.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex h-11 items-center rounded-md border border-zinc-300 bg-white px-5 text-[15px] font-semibold text-neutral-950 transition-colors hover:bg-zinc-100"
        >
          Clear filters
        </Link>
      </section>
    );
  }

  return (
    <section aria-label="Results" className="min-w-0 flex-1">
      <ul className="grid grid-cols-2 gap-3 md:gap-6 xl:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
