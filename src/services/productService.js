// The only module that reads product data. When the FastAPI backend arrives,
// only these function bodies change; the product shape stays the same.
import products from "@/data/products.json";

export async function getProducts() {
  return products;
}

export async function getProductById(id) {
  return products.find((p) => p.id === Number(id)) ?? null;
}

// [{ name: "Electronics", count: 2 }, ...]
export async function getCategories() {
  const counts = {};
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

export async function getCategory(category) {
  return products.filter((p) => p.category === category);
}

// Products to show under "You may also like" on a product's page:
// others from the same category first, then the best-rated of the rest.
export async function getRelatedProducts(product, limit = 4) {
  const others = products.filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => p.category === product.category);
  const rest = others
    .filter((p) => p.category !== product.category)
    .sort((a, b) => b.rating - a.rating);
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getTopRated(limit = 4) {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
}
