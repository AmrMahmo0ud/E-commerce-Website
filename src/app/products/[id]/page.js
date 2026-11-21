import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import {
  getProductById,
  getProducts,
  getRelatedProducts,
} from "@/services/productService";

// Prerender one page per product. With cacheComponents on, this is what lets
// us await params at the top of the page without a <Suspense> boundary.
// Ids not in this list still render on request (and hit notFound if unknown).
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `${product.name} · White Friday` : "Product not found · White Friday" };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product, 4);
  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
