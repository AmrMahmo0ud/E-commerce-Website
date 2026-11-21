import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { categoryTint } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2";

const tileBase = `group flex aspect-square flex-col justify-between rounded-2xl p-3.5 transition-transform hover:-translate-y-0.5 md:rounded-[20px] md:p-5 ${focusRing}`;

function ProductTile({ product, className = "" }) {
  const tint = categoryTint(product.category);
  return (
    <Link href={`/products/${product.id}`} className={`${tileBase} ${tint} text-neutral-950 ${className}`}>
      <span className="text-xs font-semibold md:text-[13px]">{product.name}</span>
      <span className="relative mx-auto aspect-square w-[55%] overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 160px, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className="font-mono text-sm font-semibold md:text-[15px]">${product.price.toFixed(2)}</span>
    </Link>
  );
}

function TopRatedTile({ product }) {
  const fullStars = Math.round(product.rating);
  return (
    <Link href={`/products/${product.id}`} className={`${tileBase} bg-neutral-950 text-white`}>
      <span className="text-xs font-semibold md:text-[13px]">Top rated</span>
      <span className="flex flex-col gap-0.5 md:gap-1">
        <span className="font-mono text-[40px] leading-10 font-semibold tracking-[-0.04em] md:text-[56px] md:leading-14">
          {product.rating.toFixed(1)}
          <span className="sr-only"> out of 5</span>
        </span>
        <span className="text-[13px] text-zinc-300 md:text-sm">{product.name}</span>
      </span>
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < fullStars ? "fill-amber-400 text-amber-400" : "text-zinc-600"} ${i > 0 ? "hidden md:block" : ""}`}
          />
        ))}
      </span>
    </Link>
  );
}

export default function HomeHero({ categories, products, topProduct }) {
  const [first, ...rest] = products;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-8 pb-12 md:px-6 md:pt-18 md:pb-24 lg:flex-row lg:items-center lg:gap-16">
      <div className="flex flex-col gap-6 md:gap-7 lg:flex-[1_1_480px]">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-zinc-600 uppercase md:text-xs">
          {categories.map((c) => c.name).join(" · ")}
        </p>
        <h1 className="text-[44px] leading-[46px] font-bold tracking-[-0.04em] md:text-[72px] md:leading-[72px] md:tracking-[-0.045em]">
          Everything you need, all in one place.
        </h1>
        <p className="max-w-120 text-[17px] leading-[26px] text-zinc-600 md:text-[19px] md:leading-[30px]">
          Everyday essentials, searchable by name and filterable by category, price and rating.
        </p>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            href="/products"
            className={`inline-flex h-13 items-center justify-center gap-2.5 rounded-md bg-neutral-950 px-6 text-base font-semibold text-white transition-colors hover:bg-zinc-800 ${focusRing}`}
          >
            Shop all products
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/cart"
            className={`inline-flex h-13 items-center justify-center rounded-md border border-zinc-300 px-6 text-base font-semibold text-neutral-950 transition-colors hover:bg-zinc-100 ${focusRing}`}
          >
            View cart
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 md:gap-4 md:pt-0 lg:flex-[1_1_460px]">
        {first && <ProductTile product={first} />}
        {topProduct && <TopRatedTile product={topProduct} />}
        {/* The last two tiles only show from tablet width up, like the mobile design. */}
        {rest.map((p) => (
          <ProductTile key={p.id} product={p} className="hidden md:flex" />
        ))}
      </div>
    </section>
  );
}
