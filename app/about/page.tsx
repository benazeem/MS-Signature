import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MS Signature Scents — premium fragrances crafted with excellence, luxurious perfumes and pure attars.",
};

export default function AboutPage() {
  const cardDelayClasses = [
    "[animation-delay:0ms]",
    "[animation-delay:150ms]",
    "[animation-delay:300ms]",
  ];

  const pointDelayClasses = [
    "[animation-delay:0ms]",
    "[animation-delay:100ms]",
    "[animation-delay:200ms]",
    "[animation-delay:300ms]",
    "[animation-delay:400ms]",
    "[animation-delay:500ms]",
  ];

  return (
    <div className="pt-28 md:pt-32">
      <section className="container-wide pt-12 pb-20 text-center">
        <span className="text-gold text-xs tracking-[0.4em] uppercase block mb-6 animate-fade-in">
          About Us
        </span>
        <h1 className="font-heading text-5xl md:text-6xl text-text-light mb-8 animate-fade-in-up">
          About{" "}
          <span className="text-gradient-gold">MS Signature Scents</span>
        </h1>
        <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Premium fragrances crafted with excellence. Luxurious perfumes and
          pure attars designed for a long-lasting and memorable scent
          experience.
        </p>
      </section>

      <Section className="bg-accent/30" id="values">
        <SectionHeader
          label="What We Stand For"
          title="Our Principles"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "✦",
              title: "Premium Quality",
              desc: "High-quality ingredients and refined craftsmanship in every drop. Our fragrances reflect exceptional quality and rich character.",
            },
            {
              icon: "◈",
              title: "Luxury & Elegance",
              desc: "Designed for elegance, confidence, and individuality. Every creation delivers sophistication and a truly premium experience.",
            },
            {
              icon: "❖",
              title: "Longevity",
              desc: "Our perfumes and attars are crafted for long-lasting performance, keeping you fresh and confident throughout the day.",
            },
          ].map((value, i) => (
            <div
              key={value.title}
              className={`text-center p-10 border border-border bg-primary/50 gold-border-glow animate-fade-in-up ${cardDelayClasses[i] ?? ""}`}
            >
              <span className="text-gold text-3xl block mb-5">{value.icon}</span>
              <h3 className="font-heading text-xl text-text-light mb-3">
                {value.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="signature">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-6">
            Your Signature
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-text-light mb-8 leading-snug">
            Luxury & <span className="text-gradient-gold">Sophistication</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
            {[
              "Premium fragrances crafted with excellence.",
              "Luxurious perfumes and pure attars.",
              "Long-lasting and memorable scent experience.",
              "High-quality ingredients and refined craftsmanship.",
              "Designed for elegance, confidence, and individuality.",
              "Your signature of luxury and sophistication.",
            ].map((point, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 border border-border/50 bg-accent/20 animate-fade-in-up ${pointDelayClasses[i] ?? ""}`}
              >
                <span className="text-gold text-sm mt-0.5">✦</span>
                <p className="text-text-muted text-sm leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-accent/30">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-text-light mb-6">
            Experience the Difference
          </h2>
          <p className="text-text-muted text-sm mb-8 leading-relaxed">
            Discover why thousands have made MS Signature Scents their choice
            for premium perfumes and pure attars.
          </p>
          <Button href="/shop" size="lg" id="about-cta">
            Shop Our Collection
          </Button>
        </div>
      </Section>
    </div>
  );
}
