import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CATEGORIES as staticCategories } from "@/lib/constants";
import { getCategories } from "@/sanity/lib/client";

export async function Categories() {
  let sanityCategories: Array<{ name: string; slug: string; image?: string }> =
    [];
  try {
    const data = await getCategories();
    sanityCategories = data.map((c) => ({
      name: c.name,
      slug: c.slug,
      image: c.image,
    }));
  } catch (err) {
    console.warn("Failed to fetch categories from Sanity", err);
  }

  const categoriesToRender =
    sanityCategories.length > 0
      ? sanityCategories.map((c) => {
          const staticMatch = staticCategories.find((s) => s.slug === c.slug);
          return {
            ...c,
            image: c.image || staticMatch?.image || "/products/oud.png",
          };
        })
      : staticCategories;
  return (
    <Section id="categories">
      <SectionHeader
        label="Collections"
        title="Explore by Category"
        subtitle="Each category represents a unique family of scents, carefully curated for the discerning connoisseur."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoriesToRender.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            id={`category-${cat.slug}`}
            className={`group relative overflow-hidden h-[340px] bg-accent animate-fade-in-up animation-delay-${(i + 1) * 100}`}
          >
            <div className="absolute inset-0 product-image-hover">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-heading text-2xl text-text-light mb-2 group-hover:text-gold transition-colors duration-300">
                {cat.name}
              </h3>
              <span className="text-text-muted text-xs tracking-widest uppercase group-hover:text-soft-gold transition-colors duration-300">
                Explore →
              </span>
            </div>
            <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-all duration-500" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
