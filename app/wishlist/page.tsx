import { getProducts } from "@/sanity/lib/client";
import { products as fallbackProducts } from "@/lib/data";
import { WishlistClient } from "./WishlistClient";
import { Product } from "@/types/product.types";

export default async function WishlistPage() {
  let sanityProducts: Product[] = [];
  
  try {
    const data = await getProducts();
    sanityProducts = data.map((p) => ({
      id: p._id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline || "",
      description: p.description || "",
      price: p.price || 0,
      category: (p.category as "oud" | "floral" | "musk") || "oud",
      image: p.image || "/products/oud.png",
      images: p.images || [],
      featured: p.featured || false,
      bestSeller: p.bestSeller || false,
      notes: p.notes || { top: "", heart: "", base: "" },
      inStock: p.inStock ?? true,
      reviews: [],
    }));
  } catch (error) {
    console.warn("Failed to fetch products from Sanity, using mock data", error);
  }

  const productsToUse = sanityProducts.length > 0 ? sanityProducts : fallbackProducts;

  return <WishlistClient products={productsToUse} />;
}
