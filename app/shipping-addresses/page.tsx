"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const ShippingAddresses = dynamic(
  () => import("@/components/profile/ShippingAddresses").then((mod) => mod.ShippingAddresses),
  {
    loading: () => (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-gold" />
      </div>
    ),
  }
);

export default function ShippingAddressesPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-5xl">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Profile</p>
        <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">Shipping Addresses</h1>
        <div className="gold-separator max-w-15 mb-8" />
        <ShippingAddresses />
      </div>
    </div>
  );
}
