import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-gold text-[120px] md:text-[180px] font-heading leading-none select-none opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          404
        </p>
        <div className="relative z-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Page Not Found
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">
            Lost in the Mist
          </h1>
          <p className="text-text-muted max-w-sm mx-auto mb-8 leading-relaxed">
            The page you&apos;re looking for has drifted away like morning
            incense. Let us guide you back.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-gold text-primary px-6 py-3 rounded-lg font-semibold tracking-widest uppercase text-sm hover:bg-soft-gold transition-colors duration-300"
            >
              Return Home
            </Link>
            <Link
              href="/shop"
              className="border border-border text-text-muted px-6 py-3 rounded-lg tracking-widest uppercase text-sm hover:border-gold hover:text-gold transition-all duration-300"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
