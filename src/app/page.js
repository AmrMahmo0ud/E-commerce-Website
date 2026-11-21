import HomeHero from "@/components/home/HomeHero";
import CategoryLinks from "@/components/home/CategoryLinks";
import TopRated from "@/components/home/TopRated";
import SearchBanner from "@/components/home/SearchBanner";
import { getCategories, getProductById, getTopRated } from "@/services/productService";

// Products shown as tiles in the hero (the dark "Top rated" tile is picked automatically).
const HERO_PRODUCT_IDS = [1, 3, 8];

export default async function HomePage() {
  const [categories, topRated, ...heroProducts] = await Promise.all([
    getCategories(),
    getTopRated(4),
    ...HERO_PRODUCT_IDS.map((id) => getProductById(id)),
  ]);

  return (
    <div className="flex flex-col bg-white text-neutral-950">
      <HomeHero
        categories={categories}
        products={heroProducts.filter(Boolean)}
        topProduct={topRated[0]}
      />
      <CategoryLinks categories={categories} />
      <TopRated products={topRated} />
      <SearchBanner />
    </div>
  );
}
