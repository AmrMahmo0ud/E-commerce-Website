import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-12 text-neutral-950 md:px-6 md:pt-10 md:pb-24">
      <section className="flex flex-col gap-6 rounded-xl border border-zinc-200 p-6 md:min-h-60 md:flex-row md:items-center md:justify-between md:gap-8 md:px-14 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <span
            aria-hidden="true"
            className="font-mono text-6xl font-semibold tracking-[-0.04em] text-zinc-200 md:text-8xl"
          >
            404
          </span>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-semibold tracking-[-0.02em] md:text-[28px]">
              This product isn’t available
            </h1>
            <p className="text-base text-zinc-600">It may have been removed, or the link is wrong.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-md border border-zinc-300 px-5 text-[15px] font-semibold transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            Go home
          </Link>
          <Link
            href="/products"
            className="inline-flex h-11 items-center rounded-md bg-neutral-950 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            All products
          </Link>
        </div>
      </section>
    </div>
  );
}
