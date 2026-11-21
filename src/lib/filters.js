// Product filters live in the URL, e.g.
// /products?q=lamp&category=Home&min=10&max=50&sort=price-asc
// so a filtered page can be refreshed, bookmarked and shared.

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Rating: high to low" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const SORT_VALUES = SORT_OPTIONS.map((o) => o.value);

// "12.5" -> 12.5, anything else (empty, negative, not a number) -> null.
function toPrice(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

// Turns the raw searchParams object into clean filter values.
export function parseFilters(params = {}) {
  const first = (v) => (Array.isArray(v) ? v[0] : v);
  const sort = first(params.sort);
  return {
    q: (first(params.q) ?? "").trim(),
    category: first(params.category) || null,
    min: toPrice(first(params.min)),
    max: toPrice(first(params.max)),
    sort: SORT_VALUES.includes(sort) ? sort : "featured",
  };
}

// Applies search, price range and sort. Category is already handled by
// getCategory() in the service, but it's checked here too so this works
// on any list.
export function filterProducts(products, { q, category, min, max, sort }) {
  const query = q.toLowerCase();
  const result = products.filter(
    (p) =>
      (!query || p.name.toLowerCase().includes(query)) &&
      (!category || p.category === category) &&
      (min === null || p.price >= min) &&
      (max === null || p.price <= max),
  );

  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}

// Builds a /products URL from the current filters plus some changes.
// Pass null for a key to remove it: filtersHref(filters, { q: null }).
export function filtersHref(filters, changes = {}) {
  const next = { ...filters, ...changes };
  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.category) params.set("category", next.category);
  if (next.min !== null && next.min !== undefined) params.set("min", String(next.min));
  if (next.max !== null && next.max !== undefined) params.set("max", String(next.max));
  if (next.sort && next.sort !== "featured") params.set("sort", next.sort);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

// The filters that narrow the list (sort doesn't, so it isn't a chip).
export function activeFilters(filters) {
  const chips = [];
  if (filters.q) chips.push({ key: "q", label: `“${filters.q}”`, remove: { q: null } });
  if (filters.category) {
    chips.push({ key: "category", label: filters.category, remove: { category: null } });
  }
  if (filters.min !== null || filters.max !== null) {
    const from = `$${filters.min ?? 0}`;
    const to = filters.max !== null ? `$${filters.max}` : "any";
    chips.push({ key: "price", label: `${from} – ${to}`, remove: { min: null, max: null } });
  }
  return chips;
}
