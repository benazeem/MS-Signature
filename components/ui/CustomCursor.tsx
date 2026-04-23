"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const ringSpring = { damping: 18, stiffness: 150, mass: 0.8 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const trailX = useSpring(ringX, ringSpring);
  const trailY = useSpring(ringY, ringSpring);

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show on fine-pointer devices.
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    document.documentElement.style.cursor = "none";

    const updatePos = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // Slight delay for ring
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        ringX.set(e.clientX);
        ringY.set(e.clientY);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) {
        setHovering(false);
        setHoverText("");
        return;
      }
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select, label",
      );
      if (interactive) {
        setHovering(true);
        const cursorLabel = (interactive as HTMLElement).dataset.cursor;
        setHoverText(cursorLabel || "");
      } else {
        setHovering(false);
        setHoverText("");
      }
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", updatePos, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", updatePos);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-9999 pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 0.6 : hovering ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-gold" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-9998 pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 0.85 : hovering ? 1.6 : 1,
          opacity: hidden ? 0 : hovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full border border-gold/60 flex items-center justify-center"
          style={{
            width: hovering && hoverText ? "auto" : "36px",
            height: "36px",
            padding: hovering && hoverText ? "0 12px" : "0",
            minWidth: hovering && hoverText ? "80px" : undefined,
            backdropFilter: "blur(4px)",
            background: hovering ? "rgba(212,175,55,0.08)" : "transparent",
            transition: "all 0.2s ease",
          }}
        >
          {hovering && hoverText && (
            <span className="text-gold text-[9px] tracking-widest uppercase whitespace-nowrap font-medium">
              {hoverText}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
