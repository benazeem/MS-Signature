"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SectionHeader } from "@/components/ui/Section";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function WishlistClient({ products = [] }: { products?: Product[] }) {
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const userEmail = user?.email;

  // --- WhatsApp Redirection (Temporarily hiding wishlist functionality) ---
  const isServingViaWhatsApp = true;

  if (isServingViaWhatsApp) {
    const whatsappNumber = "916398412670";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order.`;

    return (
      <div className="pt-40 pb-20 min-h-screen">
        <div className="container-wide">
          <div className="mb-12">
            <h1 className="font-heading text-4xl text-text-light mb-2">
              Your Wishlist
            </h1>
            <div className="gold-separator max-w-[60px] mt-4" />
          </div>

          <div className="text-center py-24 animate-fade-in border border-dashed border-border rounded-xl bg-accent/5 max-w-2xl mx-auto px-4">
            <Heart size={48} className="text-gold mx-auto mb-6 opacity-80" />
            <h2 className="font-heading text-2xl text-text-light mb-4">
              Wishlist Feature Coming Soon
            </h2>
            <p className="text-text-muted text-base mb-8 max-w-md mx-auto leading-relaxed">
              We are currently serving our customers exclusively through WhatsApp and Instagram to provide a more personalized experience.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-primary font-semibold px-8 py-3.5 rounded-lg tracking-widest uppercase text-sm transition-all duration-300 hover:bg-soft-gold"
            >
              <MessageCircle size={18} />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }
  // ---------------------------------------------------------------------

  if (!userEmail) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Heart size={48} className="text-border mb-6" />
        <h1 className="font-heading text-3xl text-text-light mb-4">
          Your Wishlist
        </h1>
        <p className="text-text-muted mb-8 max-w-md">
          Please sign in to view and manage your saved items.
        </p>
        <Link
          href="/login"
          className="bg-gold text-primary font-semibold px-8 py-3 rounded-lg tracking-widest uppercase text-sm hover:bg-soft-gold transition-all duration-300"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-40 pb-20 min-h-screen">
      <div className="container-wide">
        <SectionHeader
          label="Your Favorites"
          title="Wishlist"
          subtitle="A collection of your favorite attars, saved for later."
        />

        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl bg-accent/5">
            <Heart size={48} className="text-border mb-4" />
            <p className="text-text-muted text-sm mb-6">
              Your wishlist is currently empty.
            </p>
            <Link
              href="/shop"
              className="text-gold tracking-widest uppercase text-xs border-b border-gold/30 hover:border-gold transition-colors pb-1"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="mt-12">
            <div className="mb-8">
              <p className="text-text-muted text-sm">
                <span className="text-text-light font-medium">
                  {wishlistedProducts.length}
                </span>{" "}
                {wishlistedProducts.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            <ProductGrid products={wishlistedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
