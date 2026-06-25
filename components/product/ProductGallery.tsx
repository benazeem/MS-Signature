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
  const activeImage = images[activeIndex] ?? images[0] ?? "/products/oud.png";

  return (
    <div className="space-y-4">
      <div className="relative mx-auto aspect-square min-h-[min(50vh,calc(100vw-2rem))] w-full overflow-hidden bg-accent/50 group lg:min-h-[50vh]">
        <Image
          src={activeImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
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
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
