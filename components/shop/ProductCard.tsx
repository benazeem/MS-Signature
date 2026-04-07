"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className={`group relative bg-accent/50 gold-border-glow animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
      id={`product-card-${product.slug}`}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative h-[320px] product-image-hover bg-primary/50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent via-transparent to-transparent opacity-60" />

        {/* Best Seller badge */}
        {product.bestSeller && (
          <div className="absolute top-4 left-4">
            <Badge>Best Seller</Badge>
          </div>
        )}
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-primary/60 backdrop-blur-sm border border-border hover:border-gold transition-all duration-300 z-10"
        id={`wishlist-${product.slug}`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={wishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={wishlisted ? "text-gold" : "text-text-muted"}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Info */}
      <div className="p-5">
        <Link href={`/product/${product.slug}`}>
          <span className="text-text-muted text-[10px] tracking-[0.2em] uppercase block mb-1">
            {product.category}
          </span>
          <h3 className="font-heading text-lg text-text-light group-hover:text-gold transition-colors duration-300 mb-1">
            {product.name}
          </h3>
          <p className="text-text-muted text-xs mb-3">{product.tagline}</p>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-gold font-heading text-lg">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product, "6ml", 500)}
            className="text-text-muted text-xs tracking-wider uppercase hover:text-gold transition-colors duration-300 opacity-0 group-hover:opacity-100"
            id={`add-to-cart-${product.slug}`}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
