"use client";

import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

export default function CartPage() {
  const { items, clearCart } = useCart();

  // --- WhatsApp Redirection (Temporarily hiding cart functionality) ---
  const isServingViaWhatsApp = true;
  
  if (isServingViaWhatsApp) {
    const whatsappNumber = "916398412670";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order.`;

    return (
      <div className="pt-40 pb-20 min-h-screen">
        <div className="container-wide">
          <div className="mb-12">
            <h1 className="font-heading text-4xl text-text-light mb-2">
              Your Cart
            </h1>
            <div className="gold-separator max-w-[60px] mt-4" />
          </div>

          <div className="text-center py-24 animate-fade-in border border-dashed border-border rounded-xl bg-accent/5 max-w-2xl mx-auto px-4">
            <MessageCircle size={48} className="text-gold mx-auto mb-6 opacity-80" />
            <h2 className="font-heading text-2xl text-text-light mb-4">
              Cart Feature Coming Soon
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

  return (
    <div className="pt-40 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl text-text-light mb-2">
            Your Cart
          </h1>
          <div className="gold-separator max-w-[60px] mt-4" />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border mx-auto mb-6"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p className="text-text-muted text-base mb-6">
              Your cart is empty
            </p>
            <Button href="/shop" variant="outline" id="cart-shop-link">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-muted text-sm">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
                <button
                  onClick={clearCart}
                  className="text-text-muted text-xs tracking-wider uppercase hover:text-red-400 transition-colors duration-300"
                  id="clear-cart-btn"
                >
                  Clear All
                </button>
              </div>
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.size}`}
                  item={item}
                />
              ))}
            </div>

            {/* Summary */}
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
