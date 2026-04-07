import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore our complete range of handcrafted attar perfume oils — oud, floral, and musk collections.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<ShopSkeleton />}>{children}</Suspense>;
}

function ShopSkeleton() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-wide">
        <div className="text-center mb-16">
          <div className="w-32 h-3 bg-border/50 rounded mx-auto mb-4" />
          <div className="w-52 h-8 bg-border/50 rounded mx-auto mb-4" />
          <div className="w-80 h-4 bg-border/50 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-accent/50 h-[420px] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
