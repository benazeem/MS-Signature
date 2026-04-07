import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center" id="hero">
      {/* Background */}
      <div className="absolute inset-0 bg-primary">
        {/* Radial gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24">
        {/* Left: Text */}
        <div className="max-w-xl">
          <span className="text-gold text-xs tracking-[0.4em] uppercase block mb-6 animate-fade-in">
            Pure. Long-lasting. Timeless.
          </span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 animate-fade-in-up">
            The Art of{" "}
            <span className="text-gradient-gold">Fine Attar</span>
          </h1>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-10 max-w-md animate-fade-in-up animation-delay-200">
            Handcrafted perfume oils distilled from nature&apos;s finest
            botanicals. Experience fragrance the way it was meant to be.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
            <Button href="/shop" size="lg" id="hero-cta-shop">
              Shop Now
            </Button>
            <Button href="/shop" variant="outline" size="lg" id="hero-cta-explore">
              Explore Collection
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 animate-fade-in-up animation-delay-500">
            {[
              { value: "100%", label: "Natural" },
              { value: "50+", label: "Fragrances" },
              { value: "10k+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-gold font-heading text-2xl">{stat.value}</span>
                <span className="text-text-muted text-xs block mt-1 tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Image */}
        <div className="relative flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
          <div className="relative w-[320px] h-[420px] md:w-[400px] md:h-[520px]">
            {/* Gold ring behind */}
            <div className="absolute inset-8 border border-gold/20 rounded-full animate-glow" />
            <Image
              src="/hero-product.png"
              alt="Premium attar bottle"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-500">
        <span className="text-text-muted text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
