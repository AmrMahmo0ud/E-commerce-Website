import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { categoryTint, formatPrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  const { id, name, description, price, category, rating, image } = product;
  const tint = categoryTint(category);

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-neutral-950 transition-shadow hover:shadow-md">
      <Link
        href={`/products/${id}`}
        className="group flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-950"
      >
        <div className={`relative aspect-[4/3] overflow-hidden ${tint}`}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute top-2 left-2 inline-flex h-5 items-center rounded-full bg-white px-2 text-[10px] font-semibold tracking-[0.06em] uppercase md:top-3 md:left-3 md:h-6 md:px-2.5 md:text-[11px]">
            {category}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1 px-3 pt-3 pb-2 md:gap-1.5 md:px-4 md:pt-4 md:pb-3">
          <p className="inline-flex items-center gap-1 text-[13px] font-semibold">
            <Star
              size={14}
              className="fill-amber-700 text-amber-700"
              aria-hidden="true"
            />
            {rating.toFixed(1)}
            <span className="font-normal text-zinc-600">/ 5</span>
          </p>
          <h3 className="text-[15px] leading-5 font-semibold tracking-[-0.01em] group-hover:underline md:text-[17px] md:leading-6">
            {name}
          </h3>
          <p className="hidden text-sm leading-5 text-zinc-600 md:line-clamp-2">
            {description}
          </p>
          <p className="mt-auto pt-1 font-mono text-[15px] font-semibold md:text-lg">
            {formatPrice(price)}
          </p>
        </div>
      </Link>

      <div className="px-3 pb-3 md:px-4 md:pb-4">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
