import { Section, SectionHeader } from "@/components/ui/Section";
import { ProductCard } from "@/components/shop/ProductCard";
import { getFeaturedProducts as getFeaturedSanityProducts } from "@/sanity/lib/client";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types/product.types";

export async function FeaturedProducts() {
  let sanityProducts: Product[] = [];
  try {
    const data = await getFeaturedSanityProducts();
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
  } catch (err) {
    console.warn("Failed to fetch featured products from Sanity", err);
  }

  const featured = sanityProducts;

  return (
    <Section className="bg-accent/30" id="featured">
      <SectionHeader
        label="Curated Selection"
        title="Featured Attars"
        subtitle="Our master perfumers' finest creations, selected for their exceptional quality and character."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.slice(0, 6).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button href="/shop" variant="outline" id="featured-view-all">
          View All Products
        </Button>
      </div>
    </Section>
  );
}
