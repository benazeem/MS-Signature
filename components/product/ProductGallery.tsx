"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] md:h-[520px] bg-accent/50 overflow-hidden group">
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent" />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-20 overflow-hidden transition-all duration-300 ${
                i === activeIndex
                  ? "border-2 border-gold"
                  : "border border-border opacity-60 hover:opacity-100"
              }`}
              id={`gallery-thumb-${i}`}
              aria-label={`Select image ${i + 1} for ${name}`}
              aria-pressed={i === activeIndex}
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
