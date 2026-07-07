"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Clock, Gem, Award, Droplets, Sparkles } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Longevity",
    description:
      "Experience fragrances crafted to last. Our perfumes and attars are designed for long-lasting performance, keeping you fresh and confident throughout the day.",
    accentColor: "from-amber-500/20 to-gold/10",
  },
  {
    icon: Gem,
    title: "Luxury",
    description:
      "Indulge in the art of luxury. Every MS Signature Scents creation is crafted to deliver elegance, sophistication, and a truly premium fragrance experience.",
    accentColor: "from-purple-500/20 to-gold/10",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Made with carefully selected ingredients, our fragrances reflect exceptional quality, rich character, and refined craftsmanship in every drop.",
    accentColor: "from-emerald-500/20 to-gold/10",
  },
  {
    icon: Droplets,
    title: "Pure Attars",
    description:
      "Discover the richness of pure, alcohol-free attars. Concentrated and long-lasting, they offer an authentic and timeless fragrance experience.",
    accentColor: "from-sky-500/20 to-gold/10",
  },
  {
    icon: Sparkles,
    title: "Perfumes",
    description:
      "From fresh and modern to deep and captivating, our perfumes are designed to leave a lasting impression and complement every occasion.",
    accentColor: "from-rose-500/20 to-gold/10",
  },
];

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us" className="relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full blur-[150px] pointer-events-none" />

      <SectionHeader
        label="Why Us"
        title="Things You Find in MS Signature Scents"
        subtitle="Every fragrance we create is a reflection of our commitment to quality, luxury, and lasting excellence."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {features.map((feature, i) => (
          <ScrollReveal key={feature.title} delay={i * 0.1}>
            <div
              className={`group relative p-8 border border-border bg-accent/40 hover:border-gold/30 transition-all duration-500 h-full ${
                i === features.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500">
                  <feature.icon
                    size={20}
                    className="text-gold group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-heading text-xl text-text-light mb-3 group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
