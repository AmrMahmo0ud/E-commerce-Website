import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SearchBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-6 md:pb-24">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-950 px-6 py-8 text-white md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-8 md:rounded-[20px] md:px-16 md:py-14">
        <div className="flex max-w-155 flex-col gap-4 md:gap-3">
          <h2 className="text-[28px] leading-8 font-bold tracking-[-0.03em] md:text-[40px] md:leading-11">
            Find it in seconds.
          </h2>
          <p className="text-base leading-6 text-zinc-300 md:text-[17px] md:leading-[26px]">
            Search by name, narrow by category and price, then sort by price or rating, all on one page.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-base font-semibold text-neutral-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 md:h-13 md:gap-2.5"
        >
          Browse the catalog
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
