"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const steps = [
  {
    id: 1,
    chapter: "01",
    title: "The Harvest",
    subtitle: "Dawn Collection",
    description:
      "Botanicals are hand-picked at dawn when their essential oils are at peak concentration — a practice unchanged for 400 years.",
    bgColor: "#1a0f08",
    accentHex: "#D4AF37",
  },
  {
    id: 2,
    chapter: "02",
    title: "Distillation",
    subtitle: "Ancient Technique",
    description:
      "Raw materials are placed in copper deg vessels over wood fire. Steam carries the volatile aromatics into the cooling coil.",
    bgColor: "#091410",
    accentHex: "#6dbf8a",
  },
  {
    id: 3,
    chapter: "03",
    title: "The Aging",
    subtitle: "Time as Ingredient",
    description:
      "Captured essence rests in aged leather or silver vessels for months. This patience separates ordinary from extraordinary.",
    bgColor: "#0a0c1a",
    accentHex: "#8b9fe8",
  },
  {
    id: 4,
    chapter: "04",
    title: "Blending",
    subtitle: "Master's Touch",
    description:
      "The master perfumer combines base, heart, and top notes with intuition built over decades. No two batches are identical.",
    bgColor: "#150a12",
    accentHex: "#d48bb5",
  },
  {
    id: 5,
    chapter: "05",
    title: "The Elixir",
    subtitle: "Your Signature",
    description:
      "Each bottle is filled, sealed, and numbered by hand. Your attar is ready — a living, breathing fragment of nature's finest.",
    bgColor: "#120e04",
    accentHex: "#D4AF37",
  },
];

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const totalSteps = steps.length;
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${(totalSteps - 1) * 100}%`],
  );

  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  if (isMobile) {
    return (
      <section className="relative bg-primary py-16">
        <div className="container-wide">
          <div className="text-center mb-10 px-2">
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase">
              The Journey
            </span>
            <h2 className="font-heading text-3xl text-text-light mt-3">
              From Essence to{" "}
              <span className="text-gradient-gold">Eternity</span>
            </h2>
          </div>

          <div className="space-y-5">
            {steps.map((step) => (
              <article
                key={step.id}
                className="rounded-2xl border border-white/10 p-5"
                style={{ background: step.bgColor }}
              >
                <span
                  className="text-[10px] tracking-[0.35em] uppercase font-medium block mb-3"
                  style={{ color: step.accentHex }}
                >
                  Chapter {step.chapter}
                </span>
                <h3 className="font-heading text-2xl text-text-light mb-3">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-primary"
      style={{ position: "relative", height: `${totalSteps * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col select-none">
        <div className="shrink-0 text-center pt-16 pb-6 px-6">
          <span className="text-gold text-[10px] tracking-[0.5em] uppercase">
            The Journey
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-text-light mt-3">
            From Essence to <span className="text-gradient-gold">Eternity</span>
          </h2>
        </div>

        <div className="shrink-0 px-8 md:px-20 mb-4">
          <div className="relative h-px bg-border/40">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold origin-left"
              style={{ width: progressWidth }}
            />
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-border bg-primary"
                style={{ left: `${(i / (totalSteps - 1)) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2.5">
            {steps.map((step) => (
              <span
                key={step.id}
                className="text-[9px] text-text-muted tracking-widest uppercase"
              >
                {step.chapter}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center overflow-hidden px-6 md:px-20">
          <motion.div style={{ x }} className="flex w-full">
            {steps.map((step) => (
              <div key={step.id} className="shrink-0 w-full pr-6 md:pr-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center h-full max-w-4xl mx-auto">
                  <div
                    className="relative h-[220px] md:h-[340px] rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center"
                    style={{ background: step.bgColor }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-30 blur-3xl"
                      style={{
                        background: `radial-gradient(ellipse at center, ${step.accentHex}, transparent 70%)`,
                      }}
                    />
                    <span
                      className="font-heading font-bold select-none leading-none"
                      style={{
                        fontSize: "clamp(80px, 18vw, 180px)",
                        color: `${step.accentHex}18`,
                      }}
                    >
                      {step.chapter}
                    </span>
                    <div className="absolute bottom-5 left-6">
                      <span
                        className="text-[10px] tracking-[0.35em] uppercase font-medium"
                        style={{ color: step.accentHex }}
                      >
                        {step.subtitle}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span
                      className="text-[10px] tracking-[0.4em] uppercase font-medium block mb-3"
                      style={{ color: step.accentHex }}
                    >
                      Chapter {step.chapter}
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-light mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <div
                      className="w-8 h-px mb-5"
                      style={{ background: step.accentHex }}
                    />
                    <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="shrink-0 flex justify-center items-center gap-2.5 pb-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-gold/40"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
          <span className="text-[10px] text-text-muted tracking-[0.3em] uppercase ml-1">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
