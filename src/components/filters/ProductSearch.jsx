"use client";
import { Search } from "lucide-react";
import { useFilterInputs, useUpdateFilters } from "./useFilterInput";

// Search by product name. Results update as you type (after a short pause).
export default function ProductSearch({ filters, id = "product-search", className = "" }) {
  const updateFilters = useUpdateFilters(filters);
  const [texts, setText] = useFilterInputs({ q: filters.q }, ({ q }) => updateFilters({ q: q || null }), 300);

  return (
    <div role="search" className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        Search products
      </label>
      <div className="relative">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-zinc-600"
        />
        <input
          id={id}
          type="search"
          placeholder="Search by name"
          autoComplete="off"
          value={texts.q}
          onChange={(e) => setText("q", e.target.value)}
          className="h-11 w-full rounded-md border border-zinc-200 bg-zinc-100 pr-3.5 pl-10.5 text-[15px] text-neutral-950 placeholder:text-zinc-500 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
        />
      </div>
    </div>
  );
}
