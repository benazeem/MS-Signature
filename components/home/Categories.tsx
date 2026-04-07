import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CATEGORIES } from "@/lib/constants";

export function Categories() {
  return (
    <Section id="categories">
      <SectionHeader
        label="Collections"
        title="Explore by Category"
        subtitle="Each category represents a unique family of scents, carefully curated for the discerning connoisseur."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            id={`category-${cat.slug}`}
            className={`group relative overflow-hidden h-[340px] bg-accent animate-fade-in-up animation-delay-${(i + 1) * 100}`}
          >
            {/* Image */}
            <div className="absolute inset-0 product-image-hover">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-heading text-2xl text-text-light mb-2 group-hover:text-gold transition-colors duration-300">
                {cat.name}
              </h3>
              <span className="text-text-muted text-xs tracking-widest uppercase group-hover:text-soft-gold transition-colors duration-300">
                Explore →
              </span>
            </div>
            {/* Hover border */}
            <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-all duration-500" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
