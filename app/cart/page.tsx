"use client";

import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <div className="pt-28 pb-20">
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
