import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MS Signature Scents — our heritage, craftsmanship, and commitment to pure attar perfumery.",
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="container-wide py-20 text-center">
        <span className="text-gold text-xs tracking-[0.4em] uppercase block mb-6 animate-fade-in">
          Our Story
        </span>
        <h1 className="font-heading text-5xl md:text-6xl text-text-light mb-8 animate-fade-in-up">
          The Soul Behind{" "}
          <span className="text-gradient-gold">the Scent</span>
        </h1>
        <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          MS Signature Scents was born from a single belief: fragrance should be
          an art, not a commodity. We craft each attar by hand, using methods
          passed down through generations of Indian perfumers.
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
              title: "Purity",
              desc: "100% natural ingredients. No synthetics, no dilutions. Every drop is authentic.",
            },
            {
              icon: "◈",
              title: "Heritage",
              desc: "Traditional hydro-distillation methods perfected over centuries in India and the Middle East.",
            },
            {
              icon: "❖",
              title: "Longevity",
              desc: "Our attars are concentrated perfume oils — a single application lasts 8 to 12 hours.",
            },
          ].map((value, i) => (
            <div
              key={value.title}
              className={`text-center p-10 border border-border bg-primary/50 gold-border-glow animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.15}s` }}
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

      <Section id="process">
        <SectionHeader
          label="Craftsmanship"
          title="From Petal to Bottle"
          subtitle="Every attar goes through a meticulous process to ensure the highest quality."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Source", desc: "Hand-selected botanicals from trusted growers across India" },
            { step: "02", title: "Distill", desc: "Traditional copper-pot hydro-distillation over slow fire" },
            { step: "03", title: "Age", desc: "Matured in sandalwood oil for months to develop depth" },
            { step: "04", title: "Bottle", desc: "Carefully decanted into handcrafted glass vessels" },
          ].map((item, i) => (
            <div
              key={item.step}
              className={`relative p-6 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-gold/20 font-heading text-6xl absolute top-0 left-4">
                {item.step}
              </span>
              <div className="relative pt-14">
                <h3 className="font-heading text-lg text-text-light mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-accent/30">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-text-light mb-6">
            Experience the Difference
          </h2>
          <p className="text-text-muted text-sm mb-8 leading-relaxed">
            Discover why thousands have made MS Signature Scents their choice
            for authentic, premium attar.
          </p>
          <Button href="/shop" size="lg" id="about-cta">
            Shop Our Collection
          </Button>
        </div>
      </Section>
    </div>
  );
}
