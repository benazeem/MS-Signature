"use client";

import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function CartSummary() {
  const router = useRouter();
  const { totalPrice, totalItems } = useCart();
  const shipping = totalPrice > 999 ? 0 : 99;
  const finalTotal = totalPrice + shipping;

  return (
    <div className="border border-border bg-accent/30 p-8 sticky top-24" id="cart-summary">
      <h3 className="font-heading text-xl text-text-light mb-6">
        Order Summary
      </h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span className="text-text-light">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Shipping</span>
          <span className="text-text-light">
            {shipping === 0 ? (
              <span className="text-gold">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-text-muted text-xs">
            Free shipping on orders above ₹999
          </p>
        )}

        <div className="gold-separator my-4" />

        <div className="flex justify-between text-base">
          <span className="text-text-light font-medium">Total</span>
          <span className="text-gold font-heading text-xl">
            {formatPrice(finalTotal)}
          </span>
        </div>
      </div>

      <Button
        className="w-full mt-8"
        size="lg"
        id="checkout-btn"
        onClick={() => {
          if (totalItems === 0) return;
          router.push("/checkout");
        }}
      >
        Proceed to Checkout
      </Button>

      <p className="text-text-muted text-[10px] text-center mt-4 tracking-wider">
        Secure checkout · Free returns
      </p>
    </div>
  );
}
