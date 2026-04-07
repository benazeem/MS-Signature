import { Section, SectionHeader } from "@/components/ui/Section";
import { ProductCard } from "@/components/shop/ProductCard";
import { getFeaturedProducts } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

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
