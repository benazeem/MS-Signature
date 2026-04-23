import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BrandStory() {
  return (
    <Section id="brand-story" className="relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-6">
            Our Heritage
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-light mb-8 leading-snug">
            Where Tradition{" "}
            <span className="text-gradient-gold">Meets Artistry</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-6">
            Every bottle of MS Signature Scents is a testament to generations of
            perfumery knowledge. We source the rarest botanicals from across
            India and the Middle East, distilling them using time-honored
            methods that preserve every nuance of their natural beauty. Our
            attars are concentrated perfume oils, entirely free from alcohol and
            synthetic additives.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-[#888] text-sm md:text-base leading-relaxed mb-8">
            From the mystical forests of Assam where our Agarwood (Oud) is
            sustainably harvested, to the dawn-picked Damascena roses of
            Kannauj, each fragrance is a journey. We believe that a true
            signature scent doesn&apos;t just mask-it elevates your presence.
          </p>
          <p className="text-gold text-sm tracking-widest uppercase font-medium">
            No synthetics. No shortcuts. Just pure, authentic attar.
          </p>
          <div className="gold-separator max-w-[80px] mx-auto mt-10" />
        </ScrollReveal>
      </div>
    </Section>
  );
}
