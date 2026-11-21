"use client";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/filters";
import { useUpdateFilters } from "./useFilterInput";

// Sort by price or rating. "Featured" keeps the catalog's own order.
export default function ProductSort({ filters, id = "product-sort", hideLabel = false, className = "" }) {
  const updateFilters = useUpdateFilters(filters);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "text-sm font-medium"}>
        Sort by
      </label>
      <div className="relative">
        <select
          id={id}
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="h-11 w-full appearance-none rounded-md border border-zinc-200 bg-white pr-10 pl-3.5 text-[15px] text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
