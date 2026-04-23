"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { ScrollRevealProps } from "@/types/components.types";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : direction === "down" ? -32 : 0,
      x: direction === "left" ? 32 : direction === "right" ? -32 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
