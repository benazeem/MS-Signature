import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getProducts } from "@/sanity/lib/client";
import { products as fallbackProducts } from "@/lib/data";

type GuideCard = {
  size: string;
  title: string;
  price: string;
  ideal: string;
  applications: string;
  duration: string;
  gift: boolean;
  description: string;
  popular?: boolean;
};

type CatalogProduct = {
  category: "attar" | "perfume";
  price: number;
  sizes: Array<{
    label: string;
    value: string;
    price: number;
  }>;
};

export const metadata: Metadata = {
  title: "Attar Size Guide",
  description:
    "Learn which attar size is right for you. Compare the current Sanity catalog sizes and how long they last.",
};

const sizeLabelPriority = ["6ml", "12ml"];
const allowedAttarSizes = new Set(["6ml", "12ml"]);

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeCatalogProducts(
  items: Array<{
    category?: string;
    price?: number;
    sizes?: CatalogProduct["sizes"];
  }>,
): CatalogProduct[] {
  const normalized: CatalogProduct[] = [];

  for (const item of items) {
    if (item.category === "attar" || item.category === "perfume") {
      normalized.push({
        category: item.category,
        price: item.price ?? 0,
        sizes: item.sizes ?? [],
      });
    }
  }

  return normalized;
}

function parseSizeValue(value: string) {
  const match = value.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
}

function buildCard(
  category: "attar" | "perfume",
  size: { label: string; value: string; price: number },
  basePrice: number,
): GuideCard {
  const totalPrice = basePrice + size.price;

  switch (size.value) {
    case "6ml":
      return {
        size: size.label,
        title: "Discovery",
        price: `From ${formatRupees(totalPrice)}`,
        ideal: "First-time buyers, travel, sampling new scents",
        applications: "~120-150 applications",
        duration: "1-2 months (daily use)",
        gift: false,
        description:
          "Compact and easy to carry. The 6ml size is ideal when you want to try a fragrance before moving up to a larger bottle.",
      };
    case "12ml":
      return {
        size: size.label,
        title: "Essential",
        price: `From ${formatRupees(totalPrice)}`,
        ideal: "Regular users, everyday wear, gifting",
        applications: "~250-300 applications",
        duration: "3-5 months (daily use)",
        gift: true,
        description:
          "The balanced everyday option. 12ml gives you more room to wear a favourite fragrance often without moving to a collector size.",
        popular: true,
      };
    default:
      return {
        size: size.label,
        title: "Standard Spray",
        price: `From ${formatRupees(totalPrice)}`,
        ideal: "Everyday wear, gifting, travel",
        applications: "~250-300 sprays",
        duration: "2-4 months (daily use)",
        gift: true,
        description:
          "Perfumes in the current catalog are stocked as spray bottles. Use this size when you want a clean, easy-to-wear daily fragrance.",
      };
  }
}

function buildGuideCards(
  products: CatalogProduct[],
  category: "attar" | "perfume",
  fallbackCards: GuideCard[],
) {
  const categoryProducts = products.filter(
    (product) => product.category === category,
  );
  const basePrice =
    categoryProducts[0]?.price ?? (category === "attar" ? 349 : 449);

  const sizeMap = new Map<
    string,
    { label: string; value: string; price: number }
  >();

  for (const product of categoryProducts) {
    for (const size of product.sizes ?? []) {
      if (!allowedAttarSizes.has(size.value)) {
        continue;
      }

      if (!sizeMap.has(size.value)) {
        sizeMap.set(size.value, size);
      }
    }
  }

  const sizes = Array.from(sizeMap.values()).sort((left, right) => {
    const leftPriority = sizeLabelPriority.indexOf(left.value);
    const rightPriority = sizeLabelPriority.indexOf(right.value);

    if (leftPriority !== rightPriority) {
      return (
        (leftPriority === -1 ? Number.MAX_SAFE_INTEGER : leftPriority) -
        (rightPriority === -1 ? Number.MAX_SAFE_INTEGER : rightPriority)
      );
    }

    return parseSizeValue(left.value) - parseSizeValue(right.value);
  });

  if (sizes.length === 0) {
    return fallbackCards;
  }

  return sizes.map((size) => buildCard(category, size, basePrice));
}

const fallbackAttarCards: GuideCard[] = [
  {
    size: "6ml",
    title: "Discovery",
    price: "From ₹349",
    ideal: "First-time buyers, travel, sampling new scents",
    applications: "~120-150 applications",
    duration: "1-2 months (daily use)",
    gift: false,
    description:
      "Compact and easy to carry. The 6ml size is ideal when you want to try a fragrance before moving up to a larger bottle.",
  },
  {
    size: "12ml",
    title: "Essential",
    price: "From ₹599",
    ideal: "Regular users, everyday wear, gifting",
    applications: "~250-300 applications",
    duration: "3-5 months (daily use)",
    gift: true,
    description:
      "The balanced everyday option. 12ml gives you more room to wear a favourite fragrance often without moving to a collector size.",
    popular: true,
  },
];

const fallbackPerfumeCards: GuideCard[] = [
  {
    size: "30ml",
    title: "Standard Spray",
    price: "From ₹449",
    ideal: "Everyday wear, gifting, travel",
    applications: "~250-300 sprays",
    duration: "2-4 months (daily use)",
    gift: true,
    description:
      "Perfumes in the current catalog are stocked as spray bottles. Use this size when you want a clean, easy-to-wear daily fragrance.",
  },
];

const tips = [
  {
    title: "Apply to pulse points",
    body: "Wrists, neck, and behind ears have warmth that amplifies the scent. Apply to clean, moisturized skin for best longevity.",
  },
  {
    title: "Less is more",
    body: "Attars are concentrated — 1–2 drops is usually enough. Start small and build to your preference.",
  },
  {
    title: "Don't rub",
    body: "When applying to wrists, let the attar absorb naturally. Rubbing breaks down the top notes and diminishes the scent evolution.",
  },
  {
    title: "Layer for depth",
    body: "Apply an unscented moisturizer before your attar. The oil locks into hydrated skin and projects for longer.",
  },
];

export default async function SizeGuidePage() {
  let catalogProducts = normalizeCatalogProducts(fallbackProducts);

  try {
    const sanityProducts = await getProducts();
    catalogProducts = normalizeCatalogProducts(sanityProducts);
  } catch (error) {
    console.warn("Failed to load Sanity products for the size guide", error);
  }

  const attarCards = buildGuideCards(
    catalogProducts,
    "attar",
    fallbackAttarCards,
  );
  const perfumeCards = buildGuideCards(
    catalogProducts,
    "perfume",
    fallbackPerfumeCards,
  );

  return (
    <div className="pt-40 pb-20 min-h-screen">
      <div className="container-wide max-w-5xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Catalog Guide
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">
            Attar and Perfume Size Guide
          </h1>
          <div className="gold-separator max-w-15 mb-6" />
          <p className="text-text-muted max-w-xl mb-12 leading-relaxed">
            This guide is read from the current product data in Sanity, so it
            stays aligned with the sizes imported by your scripts.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="font-heading text-2xl text-text-light mb-4">
            Attar sizes
          </h2>
          <p className="text-text-muted max-w-2xl mb-8 leading-relaxed">
            The attar catalog currently uses 6ml and 12ml bottles. The guide
            below reflects those stored product sizes.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {attarCards.map((item, i) => (
            <ScrollReveal key={item.size} delay={i * 0.1}>
              <div
                className={`relative p-6 rounded-2xl border h-full flex flex-col ${
                  item.popular
                    ? "border-gold/40 bg-gold/5"
                    : "border-border bg-accent/10"
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="mb-4">
                  <span className="font-heading text-5xl text-gold">
                    {item.size}
                  </span>
                  <p className="text-text-muted text-xs tracking-widest uppercase mt-1">
                    {item.title}
                  </p>
                </div>
                <p className="text-text-light font-medium mb-4">{item.price}</p>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                <div className="space-y-3 border-t border-border pt-5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#666] uppercase tracking-widest">
                      Applications
                    </span>
                    <span className="text-text-muted">{item.applications}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#666] uppercase tracking-widest">
                      Lasts
                    </span>
                    <span className="text-text-muted">{item.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#666] uppercase tracking-widest">
                      Gift-worthy
                    </span>
                    <span
                      className={item.gift ? "text-gold" : "text-text-muted"}
                    >
                      {item.gift ? "✓ Yes" : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h2 className="font-heading text-2xl text-text-light mb-4">
            Perfume sizes
          </h2>
          <p className="text-text-muted max-w-2xl mb-8 leading-relaxed">
            The perfume catalog currently uses the stored spray size from the
            imported product data. If you add more perfume variants in Sanity,
            this section will expand automatically.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 mb-16">
          {perfumeCards.map((item, i) => (
            <ScrollReveal key={item.size} delay={i * 0.1}>
              <div className="relative p-6 rounded-2xl border h-full flex flex-col border-gold/40 bg-gold/5 md:max-w-xl">
                <div className="mb-4">
                  <span className="font-heading text-5xl text-gold">
                    {item.size}
                  </span>
                  <p className="text-text-muted text-xs tracking-widest uppercase mt-1">
                    {item.title}
                  </p>
                </div>
                <p className="text-text-light font-medium mb-4">{item.price}</p>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                <div className="space-y-3 border-t border-border pt-5">
                  <div className="flex justify-between text-xs gap-4">
                    <span className="text-[#666] uppercase tracking-widest">
                      Applications
                    </span>
                    <span className="text-text-muted text-right">
                      {item.applications}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs gap-4">
                    <span className="text-[#666] uppercase tracking-widest">
                      Lasts
                    </span>
                    <span className="text-text-muted text-right">
                      {item.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs gap-4">
                    <span className="text-[#666] uppercase tracking-widest">
                      Gift-worthy
                    </span>
                    <span
                      className={item.gift ? "text-gold" : "text-text-muted"}
                    >
                      {item.gift ? "Yes" : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h2 className="font-heading text-2xl text-text-light mb-8">
            How to Apply Attar
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tips.map((tip, i) => (
            <ScrollReveal key={tip.title} delay={i * 0.08}>
              <div className="p-5 border border-border rounded-xl hover:border-gold/30 transition-colors duration-300">
                <span className="text-gold text-xs tracking-widest uppercase mb-2 block">
                  Tip {i + 1}
                </span>
                <h3 className="text-text-light font-medium mb-2">
                  {tip.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {tip.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
