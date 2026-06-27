import { getProducts, getCategories } from "@/sanity/lib/client";
import { ShopClient } from "./ShopClient";
import { Product } from "@/types/product.types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Attars | MS Signature Scents",
  description: "Explore our complete collection of premium, alcohol-free attar perfume oils including Oud, Floral, and Musk blends.",
};

export default async function ShopPage() {
  let sanityProducts: Product[] = [];
  let sanityCategories: Array<{ name: string; slug: string }> = [];

  try {
    const [data, catData] = await Promise.all([getProducts(), getCategories()]);
    sanityCategories = catData.map((c) => ({ name: c.name, slug: c.slug }));
    sanityProducts = data.map((p) => ({
      id: p._id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline || "",
      description: p.description || "",
      price: p.price || 0,
      category: (p.category as "attar" | "perfume") || "attar",
      image: p.image || "/products/oud.png",
      images: p.images || [],
      featured: p.featured || false,
      bestSeller: p.bestSeller || false,
      notes: p.notes || { top: "", heart: "", base: "" },
      inStock: p.inStock ?? true,
      reviews: [],
    }));
  } catch (error) {
    console.warn("Failed to fetch products from Sanity", error);
  }

  return <ShopClient products={sanityProducts} categories={sanityCategories} />;
}

