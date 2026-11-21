import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

export default function TopRated({ products }) {
  return (
    <section
      aria-labelledby="top-rated-heading"
      className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-12 md:gap-7 md:px-6 md:pb-24"
    >
      <div className="flex items-center justify-between gap-4 md:items-end">
        <div className="flex flex-col gap-1.5">
          <h2
            id="top-rated-heading"
            className="text-2xl leading-[30px] font-semibold tracking-[-0.02em] md:text-[32px] md:leading-[38px] md:tracking-[-0.025em]"
          >
            Top rated
          </h2>
          <p className="hidden text-base text-zinc-600 md:block">
            The {products.length} highest-rated products right now.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-semibold text-neutral-950 underline underline-offset-4 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 md:text-[15px]"
        >
          <span className="md:hidden">View all</span>
          <span className="hidden md:inline">View all products</span>
          <ArrowRight size={16} className="hidden md:block" aria-hidden="true" />
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
