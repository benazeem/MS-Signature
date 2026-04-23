import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Attar Size Guide",
  description:
    "Learn which attar size is right for you. Compare 3ml, 6ml, and 12ml bottle sizes and how long they last.",
};

const sizes = [
  {
    size: "3ml",
    title: "Discovery",
    price: "From ₹500",
    ideal: "First-time buyers, trying new fragrances",
    applications: "~60–80 applications",
    duration: "1–2 months (daily use)",
    gift: false,
    description:
      "The perfect way to experience a new scent without committing fully. Our 3ml rollers are great for travel, discovering new fragrances, or gifting a quick sample.",
  },
  {
    size: "6ml",
    title: "Essential",
    price: "From ₹1,000",
    ideal: "Regular users, everyday attars",
    applications: "~150–200 applications",
    duration: "3–5 months (daily use)",
    gift: true,
    description:
      "Our most popular size. The 6ml bottle strikes the perfect balance between value and longevity — ideal for fragrances you love wearing daily.",
    popular: true,
  },
  {
    size: "12ml",
    title: "Collector",
    price: "From ₹1,700",
    ideal: "Attar enthusiasts, signature fragrances",
    applications: "~400–500 applications",
    duration: "8–12 months (daily use)",
    gift: true,
    description:
      "For when you've found your signature scent. The 12ml collector's edition offers the best value per ml and makes a stunning gift.",
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

export default function SizeGuidePage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-5xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Guide
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">
            Attar Size Guide
          </h1>
          <div className="gold-separator max-w-[60px] mb-6" />
          <p className="text-text-muted max-w-xl mb-12 leading-relaxed">
            Choosing the right bottle size depends on how you plan to use your
            attar. Here&apos;s everything you need to know to find your perfect
            fit.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {sizes.map((item, i) => (
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
