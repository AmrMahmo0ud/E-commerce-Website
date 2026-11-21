import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductPurchase from "./ProductPurchase";
import { categoryTint, formatPrice } from "@/lib/utils";

function RatingStars({ rating }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={18}
          className={
            index < Math.floor(rating)
              ? "fill-amber-700 text-amber-700"
              : "fill-zinc-200 text-zinc-200"
          }
        />
      ))}
    </span>
  );
}

export default function ProductDetails({ product, relatedProducts = [] }) {
  const { id, name, description, price, category, rating, image } = product;
  const categoryHref = `/products?category=${encodeURIComponent(category)}`;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 bg-white px-4 pt-4 pb-12 text-neutral-950 md:gap-8 md:px-6 md:pt-8 md:pb-24">
      {/* Mobile: a single back link. Desktop: the full breadcrumb. */}
      <Link
        href="/products"
        className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold md:hidden"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        All products
      </Link>
      <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-sm text-zinc-600 md:flex">
        <Link href="/" className="hover:text-neutral-950 hover:underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/products" className="hover:text-neutral-950 hover:underline">
          Products
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={categoryHref} className="hover:text-neutral-950 hover:underline">
          {category}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="font-medium text-neutral-950">
          {name}
        </span>
      </nav>

      <article className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-start md:gap-16">
        <div
          className={`relative aspect-square overflow-hidden rounded-2xl md:max-h-160 md:flex-[1_1_560px] md:rounded-[20px] ${categoryTint(category)}`}
        >
          <Image
            src={image}
            alt={name}
            fill
            preload
            sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
            className="object-cover mix-blend-multiply"
          />
          <span className="absolute top-3 left-3 inline-flex h-6 items-center rounded-full bg-white px-2.5 text-[11px] font-semibold tracking-[0.06em] uppercase md:top-5 md:left-5 md:h-7 md:px-3 md:text-xs">
            {category}
          </span>
        </div>

        <div className="flex flex-col gap-5 md:flex-[1_1_420px] md:gap-7 md:pt-2">
          <div className="flex flex-col gap-2.5 md:gap-3.5">
            <h1 className="text-[32px] leading-9 font-bold tracking-[-0.03em] md:text-5xl md:leading-[52px] md:tracking-[-0.035em]">
              {name}
            </h1>
            {/* Desktop rating: five stars + "4.7 out of 5" */}
            <p className="hidden items-center gap-2.5 text-[15px] md:flex">
              <RatingStars rating={rating} />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-zinc-600">out of 5</span>
            </p>
            {/* Mobile: price and a compact rating on one row */}
            <div className="flex items-center justify-between md:hidden">
              <p className="font-mono text-[28px] font-semibold">{formatPrice(price)}</p>
              <p className="inline-flex items-center gap-1.5 text-[15px] font-semibold">
                <Star size={18} className="fill-amber-700 text-amber-700" aria-hidden="true" />
                {rating.toFixed(1)}
                <span className="font-normal text-zinc-600">/ 5</span>
              </p>
            </div>
          </div>

          <p className="hidden font-mono text-4xl font-semibold tracking-[-0.02em] md:block">
            {formatPrice(price)}
          </p>
          <p className="text-base leading-[25px] text-zinc-600 md:max-w-[520px] md:text-lg md:leading-7">
            {description}
          </p>

          <ProductPurchase product={product} />

          <dl className="grid grid-cols-[120px_1fr] gap-y-2.5 rounded-xl bg-zinc-100 p-4 text-sm md:grid-cols-[140px_1fr] md:gap-y-3 md:p-5 md:text-[15px]">
            <dt className="text-zinc-600">Category</dt>
            <dd className="font-medium">{category}</dd>
            <dt className="text-zinc-600">Rating</dt>
            <dd className="font-medium">{rating.toFixed(1)} / 5</dd>
            <dt className="text-zinc-600">Product ID</dt>
            <dd className="font-mono font-medium">{id}</dd>
          </dl>

          <Link
            href="/products"
            className="hidden items-center gap-1.5 self-start text-[15px] font-semibold underline underline-offset-4 md:inline-flex"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to products
          </Link>
        </div>
      </article>

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="flex flex-col gap-3.5 pt-4 md:gap-7 md:pt-16">
          <h2
            id="related-heading"
            className="text-[22px] leading-7 font-semibold tracking-[-0.02em] md:text-[32px] md:leading-[38px] md:tracking-[-0.025em]"
          >
            You may also like
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <li key={related.id} className="flex">
                <ProductCard product={related} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
