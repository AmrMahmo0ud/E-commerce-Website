"use client";
import { useFilterInputs, useUpdateFilters } from "./useFilterInput";
import { formatPrice } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-md border border-zinc-200 bg-white px-3 font-mono text-[15px] text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 aria-invalid:border-red-700";

const asText = (n) => (n === null ? "" : String(n));
const asPrice = (text) => (text === "" ? null : text);

// Min / max price inputs. `range` is the catalog's cheapest and dearest price.
export default function PriceFilter({ filters, range, idPrefix = "price" }) {
  const updateFilters = useUpdateFilters(filters);
  const [texts, setText] = useFilterInputs(
    { min: asText(filters.min), max: asText(filters.max) },
    ({ min, max }) => updateFilters({ min: asPrice(min), max: asPrice(max) }),
  );
  const { min, max } = texts;

  const isInvalid = min !== "" && max !== "" && Number(min) > Number(max);
  const errorId = `${idPrefix}-error`;

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-[13px] font-semibold tracking-[0.08em] text-zinc-600 uppercase">
        Price
      </legend>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${idPrefix}-min`} className="text-sm font-medium">
            Min ($)
          </label>
          <input
            id={`${idPrefix}-min`}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0"
            value={min}
            onChange={(e) => setText("min", e.target.value)}
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? errorId : undefined}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${idPrefix}-max`} className="text-sm font-medium">
            Max ($)
          </label>
          <input
            id={`${idPrefix}-max`}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder={String(Math.ceil(range.max))}
            value={max}
            onChange={(e) => setText("max", e.target.value)}
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? errorId : undefined}
            className={inputClass}
          />
        </div>
      </div>
      {isInvalid ? (
        <p id={errorId} role="alert" className="text-[13px] text-red-700">
          Min price is higher than max price.
        </p>
      ) : (
        <p className="text-[13px] text-zinc-600">
          Catalog range {formatPrice(range.min)} – {formatPrice(range.max)}
        </p>
      )}
    </fieldset>
  );
}
