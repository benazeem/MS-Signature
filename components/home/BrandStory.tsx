import { Section } from "@/components/ui/Section";

export function BrandStory() {
  return (
    <Section id="brand-story">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-6">
          Our Heritage
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-light mb-8 leading-snug">
          Where Tradition{" "}
          <span className="text-gradient-gold">Meets Artistry</span>
        </h2>
        <p className="text-text-muted text-base md:text-lg leading-relaxed mb-6">
          Every bottle of MS Signature Scents is a testament to generations of
          perfumery knowledge. We source the rarest botanicals from across
          India and the Middle East, distilling them using time-honored
          methods that preserve every nuance of their natural beauty.
        </p>
        <p className="text-text-muted text-sm leading-relaxed">
          No synthetics. No shortcuts. Just pure, authentic attar.
        </p>
        <div className="gold-separator max-w-[80px] mx-auto mt-10" />
      </div>
    </Section>
  );
}
