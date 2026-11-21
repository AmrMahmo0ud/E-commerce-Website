import { Suspense } from "react";
import Link from "next/link";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters, { ActiveFilters } from "@/components/filters/ProductFilters";
import ProductSort from "@/components/filters/ProductSort";
import { getProducts, getCategories, getCategory } from "@/services/productService";
import { filterProducts, parseFilters } from "@/lib/filters";

// searchParams is only known per request, so it's read inside <Suspense>.
// That lets the build prerender the rest of the app (Cache Components).
export default function ProductsPage({ searchParams }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductsCatalog searchParams={searchParams} />
    </Suspense>
  );
}

async function ProductsCatalog({ searchParams }) {
  // All filters live in the URL: ?q=&category=&min=&max=&sort=
  const filters = parseFilters(await searchParams);
  const { category } = filters;

  const [categoryProducts, allProducts, categories] = await Promise.all([
    category ? getCategory(category) : getProducts(),
    getProducts(),
    getCategories(),
  ]);
  const products = filterProducts(categoryProducts, filters);

  const prices = allProducts.map((p) => p.price);
  const priceRange = { min: Math.min(...prices), max: Math.max(...prices) };

  // Total of the whole catalog, so "All" doesn't shrink when a filter is on.
  const totalCount = allProducts.length;
  const countText =
    products.length === totalCount
      ? `Showing all ${totalCount} products`
      : `Showing ${products.length} of ${totalCount} products`;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 bg-white px-4 pt-5 pb-12 text-neutral-950 md:gap-8 md:px-6 md:pt-8 md:pb-24">
      <header className="flex flex-col gap-4 md:gap-5 md:border-b md:border-zinc-200 md:pb-7">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-zinc-600 md:text-sm">
          <Link href="/" className="hover:text-neutral-950 hover:underline">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          {category ? (
            <>
              <Link href="/products" className="hover:text-neutral-950 hover:underline">
                Products
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="font-medium text-neutral-950">
                {category}
              </span>
            </>
          ) : (
            <span aria-current="page" className="font-medium text-neutral-950">
              Products
            </span>
          )}
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-1 md:gap-1.5">
            <h1 className="text-[32px] leading-9 font-bold tracking-[-0.03em] md:text-[44px] md:leading-12 md:tracking-[-0.035em]">
              {category ?? "All products"}
            </h1>
            <p role="status" className="text-sm text-zinc-600 md:text-base">
              {countText}
            </p>
          </div>

          <div className="hidden md:block">
            <ProductSort filters={filters} className="w-55" />
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
        <ProductFilters filters={filters} categories={categories} priceRange={priceRange} />
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-5">
          <ActiveFilters filters={filters} />
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
