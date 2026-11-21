import Link from "next/link";
import { ArrowRight, Backpack, Dumbbell, Keyboard, LampDesk, Tag } from "lucide-react";

const categoryStyles = {
  Electronics: { Icon: Keyboard, tint: "bg-[#E6EBF2]" },
  Fashion: { Icon: Backpack, tint: "bg-[#F0EBE3]" },
  Home: { Icon: LampDesk, tint: "bg-[#F3E9E4]" },
  Sports: { Icon: Dumbbell, tint: "bg-[#E5EDE7]" },
};

export default function CategoryLinks({ categories }) {
  return (
    <section
      aria-labelledby="categories-heading"
      className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-12 md:gap-7 md:px-6 md:pb-24"
    >
      <h2
        id="categories-heading"
        className="text-2xl leading-[30px] font-semibold tracking-[-0.02em] md:text-[32px] md:leading-[38px] md:tracking-[-0.025em]"
      >
        Shop by category
      </h2>

      <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
        {categories.map(({ name, count }) => {
          const { Icon, tint } = categoryStyles[name] ?? { Icon: Tag, tint: "bg-zinc-100" };
          return (
            <li key={name} className="flex">
              <Link
                href={`/products?category=${encodeURIComponent(name)}`}
                className="group flex w-full flex-col gap-3 rounded-xl border border-zinc-200 p-3.5 text-neutral-950 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 md:flex-row md:items-center md:gap-4 md:p-5"
              >
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-[10px] md:size-16 ${tint}`}>
                  <Icon className="size-6 text-zinc-700 md:size-7.5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <strong className="text-base font-semibold md:text-[17px]">{name}</strong>
                  <span className="text-[13px] text-zinc-600 md:text-sm">
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="hidden transition-transform group-hover:translate-x-0.5 md:block"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
