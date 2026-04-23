"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { CartItem as CartItemType } from "@/types/cart.types";

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart();
  const itemPrice = item.product.price + item.priceModifier;

  return (
    <div
      className="flex gap-5 p-5 border border-border bg-accent/30"
      id={`cart-item-${item.product.id}-${item.size}`}
    >
      {/* Image */}
      <div className="relative w-20 h-20 shrink-0 bg-primary/50">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-base text-text-light truncate">
          {item.product.name}
        </h3>
        <p className="text-text-muted text-xs mt-0.5">Size: {item.size}</p>
        <p className="text-gold text-sm font-heading mt-1">
          {formatPrice(itemPrice)}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() =>
            updateQuantity(item.product.id, item.size, item.quantity - 1)
          }
          className="w-8 h-8 border border-border text-text-muted hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300 text-sm"
          id={`qty-minus-${item.product.id}`}
        >
          −
        </button>
        <span className="text-text-light text-sm w-6 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() =>
            updateQuantity(item.product.id, item.size, item.quantity + 1)
          }
          className="w-8 h-8 border border-border text-text-muted hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300 text-sm"
          id={`qty-plus-${item.product.id}`}
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.product.id, item.size)}
        className="text-text-muted hover:text-red-400 transition-colors duration-300 shrink-0"
        id={`remove-${item.product.id}`}
        aria-label="Remove item"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
