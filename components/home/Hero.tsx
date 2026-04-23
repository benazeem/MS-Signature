"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh flex items-center overflow-hidden"
      id="hero"
    >
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 bg-primary z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-32 lg:pt-24 min-h-full lg:min-h-svh">
        <motion.div style={{ opacity: opacityText }} className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-gold text-xs tracking-[0.4em] uppercase flex items-center gap-2 mb-6"
          >
            <Sparkles size={14} /> Pure. Long-lasting. Timeless.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
          >
            The Art of <span className="text-gradient-gold">Fine Attar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-text-muted text-base md:text-lg leading-relaxed mb-10 max-w-md"
          >
            Handcrafted perfume oils distilled from nature&apos;s finest
            botanicals. Experience fragrance the way it was meant to be.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <Button href="/shop" size="lg" id="hero-cta-shop">
              Shop Now
            </Button>
            <Button
              href="/shop"
              variant="outline"
              size="lg"
              id="hero-cta-explore"
            >
              Explore Collection
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex gap-10 mt-14"
          >
            {[
              { value: "100%", label: "Natural" },
              { value: "50+", label: "Fragrances" },
              { value: "10k+", label: "Happy Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
              >
                <span className="text-gold font-heading text-2xl">
                  {stat.value}
                </span>
                <span className="text-text-muted text-xs block mt-1 tracking-wider uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yImage }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative w-[320px] h-[420px] md:w-[400px] md:h-[520px]"
          >
            <div
              style={{
                backgroundImage: "url('/Hero-bg.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="absolute inset-8 scale-110 border border-gold/20 rounded-full animate-glow"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/Hero.webp"
                alt="Premium attar bottle"
                fill
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 400px"
                className="mt-6 lg:mt-14 object-contain object-top bg-transparent drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-1">
          Scroll <ChevronDown size={12} className="animate-bounce" />
        </span>
        <div className="w-px h-8 bg-linear-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}
