"use client";
// Groups the filter controls, plus the "active filters" chips and "clear filters".
// Desktop: a sidebar with categories and price. Search and sort sit in the page header.
// Mobile: category pills, then a "Filters" button (price) next to sort.
// (On mobile, search is the box in the navbar.)
import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { activeFilters, filtersHref } from "@/lib/filters";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ProductSort from "./ProductSort";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2";

// Removes every filter but keeps the chosen sort.
const CLEARED = { q: null, category: null, min: null, max: null };

export default function ProductFilters({ filters, categories, priceRange }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const activeCount = activeFilters(filters).length;

  return (
    <aside aria-label="Filters" className="flex flex-col gap-4 md:w-62 md:shrink-0 md:gap-8">
      <CategoryFilter categories={categories} filters={filters} />

      <div className="grid grid-cols-2 gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          aria-expanded={isPanelOpen}
          aria-controls="price-panel"
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white text-[15px] font-semibold text-neutral-950 ${focusRing}`}
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          {activeCount > 0 ? `Filters · ${activeCount}` : "Filters"}
        </button>
        <ProductSort filters={filters} id="product-sort-mobile" hideLabel />
      </div>

      <div
        id="price-panel"
        className={`${isPanelOpen ? "flex" : "hidden"} flex-col gap-4 rounded-xl bg-zinc-100 p-4 md:flex md:gap-8 md:rounded-none md:bg-transparent md:p-0`}
      >
        <PriceFilter filters={filters} range={priceRange} />
        <ClearFiltersButton filters={filters} disabled={activeCount === 0} />
      </div>
    </aside>
  );
}

function ClearFiltersButton({ filters, disabled }) {
  const base = "inline-flex h-11 w-full items-center justify-center rounded-md text-[15px] font-semibold";
  if (disabled) {
    return (
      <button type="button" disabled className={`${base} cursor-default bg-zinc-100 text-zinc-500 md:bg-zinc-100`}>
        Clear filters
      </button>
    );
  }
  return (
    <Link
      href={filtersHref(filters, CLEARED)}
      scroll={false}
      className={`${base} border border-zinc-300 bg-white text-neutral-950 transition-colors hover:bg-zinc-100 ${focusRing}`}
    >
      Clear filters
    </Link>
  );
}

// The chips above the results: one per active filter, each with a remove button.
export function ActiveFilters({ filters }) {
  const chips = activeFilters(filters);
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-zinc-600">Active filters</span>
      <ul className="contents">
        {chips.map((chip) => (
          <li
            key={chip.key}
            className="inline-flex h-8 items-center gap-0.5 rounded-full bg-zinc-100 pr-1 pl-3 text-[13px] font-medium"
          >
            {chip.label}
            <Link
              href={filtersHref(filters, chip.remove)}
              scroll={false}
              aria-label={`Remove filter ${chip.label}`}
              className={`inline-flex size-7 items-center justify-center rounded-full hover:bg-zinc-200 ${focusRing}`}
            >
              <X size={14} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={filtersHref(filters, CLEARED)}
        scroll={false}
        className={`h-8 rounded-md px-2 text-[13px] leading-8 font-semibold underline underline-offset-3 ${focusRing}`}
      >
        Clear all
      </Link>
    </div>
  );
}
