// Category list. Mobile: a row of scrollable pills. Desktop: a sidebar with counts.
// Each one is a link, so it keeps working without JavaScript, and it keeps
// the other filters (search, price, sort) when you switch category.
import Link from "next/link";
import { filtersHref } from "@/lib/filters";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2";

function CategoryLink({ href, name, count, isActive }) {
  return (
    <li className="shrink-0 md:w-full">
      <Link
        href={href}
        scroll={false}
        aria-current={isActive ? "page" : undefined}
        className={`flex h-10 items-center justify-between gap-3 rounded-full border px-4 text-sm font-medium transition-colors md:h-11 md:rounded-md md:px-3.5 md:text-[15px] ${focusRing} ${
          isActive
            ? "border-neutral-950 bg-neutral-950 text-white md:font-semibold"
            : "border-zinc-300 bg-white text-neutral-950 hover:bg-zinc-100 md:border-zinc-200"
        }`}
      >
        <span>{name}</span>
        <span className="hidden font-mono text-[13px] md:inline">{count}</span>
      </Link>
    </li>
  );
}

export default function CategoryFilter({ categories, filters }) {
  const totalCount = categories.reduce((sum, c) => sum + c.count, 0);
  return (
    <nav aria-labelledby="category-heading" className="-mx-4 md:mx-0">
      <h2
        id="category-heading"
        className="sr-only md:not-sr-only md:mb-3 md:block md:text-[13px] md:font-semibold md:tracking-[0.08em] md:text-zinc-600 md:uppercase"
      >
        Category
      </h2>
      <ul className="flex gap-2 overflow-x-auto px-4 py-0.5 md:flex-col md:overflow-visible md:px-0 md:py-0">
        <CategoryLink
          href={filtersHref(filters, { category: null })}
          name="All"
          count={totalCount}
          isActive={!filters.category}
        />
        {categories.map((c) => (
          <CategoryLink
            key={c.name}
            href={filtersHref(filters, { category: c.name })}
            name={c.name}
            count={c.count}
            isActive={c.name === filters.category}
          />
        ))}
      </ul>
    </nav>
  );
}
