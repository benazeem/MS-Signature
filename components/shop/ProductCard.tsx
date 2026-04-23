"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Heart, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/ui/Toast";
import { Product } from "@/types/product.types";
import { Badge } from "@/components/ui/Badge";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { SIZES } from "@/lib/constants";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addItem, removeItem, updateQuantity, items } = useCart();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const [selectedSize, setSelectedSize] = useState<string>(SIZES[0].value);
  const [showSizes, setShowSizes] = useState(false);

  const selectedSizeDef =
    SIZES.find((s) => s.value === selectedSize) ?? SIZES[0];
  const finalPrice = product.price + selectedSizeDef.price;

  const cartItem = items.find(
    (i) => i.product.id === product.id && i.size === selectedSize,
  );
  const inCart = !!cartItem;
  const cartQty = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem(product, selectedSize, selectedSizeDef.price);
    showToast(`${product.name} (${selectedSize}) added to cart`, "success");
  };

  const handleIncrease = () =>
    updateQuantity(product.id, selectedSize, cartQty + 1);
  const handleDecrease = () => {
    if (cartQty <= 1) {
      removeItem(product.id, selectedSize);
    } else {
      updateQuantity(product.id, selectedSize, cartQty - 1);
    }
  };

  return (
    <Tilt3D
      className={`group relative flex flex-col bg-accent/50 gold-border-glow animate-fade-in-up`}
      scale={1.02}
      maxTilt={6}
    >
      <div
        style={{ animationDelay: `${index * 0.1}s` }}
        id={`product-card-${product.slug}`}
        className="flex flex-col h-full"
      >
        <Link
          href={`/product/${product.slug}`}
          className="block relative h-[300px] product-image-hover bg-primary/50 shrink-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ${!product.inStock ? "grayscale contrast-125 brightness-75" : "group-hover:scale-110"}`}
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="border border-white/20 bg-black/60 px-4 py-2 rounded-lg transform -rotate-12">
                <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">
                  Not In Stock
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-accent via-transparent to-transparent opacity-60" />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.bestSeller && <Badge>Best Seller</Badge>}
          </div>

          <AnimatePresence>
            {inCart && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-3 right-12 w-6 h-6 bg-gold text-primary text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg"
              >
                {cartQty}
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-primary/70 backdrop-blur-sm border border-border hover:border-gold/60 transition-all duration-300 z-10 rounded-full"
          id={`wishlist-${product.slug}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={14}
            className={`transition-colors duration-200 ${wishlisted ? "fill-gold text-gold" : "text-text-muted"}`}
          />
        </button>

        <div className="p-4 flex flex-col flex-1">
          <Link href={`/product/${product.slug}`}>
            <span className="text-text-muted text-[9px] tracking-[0.25em] uppercase block mb-0.5">
              {product.category}
            </span>
            <h3 className="font-heading text-base text-text-light group-hover:text-gold transition-colors duration-300 mb-0.5">
              {product.name}
            </h3>
            <p className="text-text-muted text-xs mb-3 leading-snug">
              {product.tagline}
            </p>
          </Link>

          <div className="mb-3">
            <button
              onClick={() => setShowSizes(!showSizes)}
              className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-text-muted hover:text-gold transition-colors duration-200"
            >
              <span className="border border-border px-2 py-0.5 rounded text-[9px]">
                {selectedSize}
              </span>
              <span>Size</span>
              <span className="text-[8px]">{showSizes ? "▲" : "▼"}</span>
            </button>

            <AnimatePresence>
              {showSizes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-1.5 mt-2">
                    {SIZES.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => {
                          setSelectedSize(size.value);
                          setShowSizes(false);
                        }}
                        className={`px-2.5 py-1 text-[10px] tracking-wider border rounded transition-all duration-200 ${
                          selectedSize === size.value
                            ? "border-gold text-gold bg-gold/10"
                            : "border-border text-text-muted hover:border-gold/50 hover:text-text-light"
                        }`}
                      >
                        {size.label}
                        {size.price > 0 && (
                          <span className="ml-1 opacity-70">
                            +₹{size.price}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-gold font-heading text-lg">
                {formatPrice(finalPrice)}
              </span>
              {selectedSizeDef.price > 0 && (
                <span className="text-text-muted text-[9px] block -mt-0.5">
                  for {selectedSize}
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {inCart ? (
                <motion.div
                  key="in-cart"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2 border border-gold/40 rounded-full px-2 py-1"
                >
                  <button
                    onClick={handleDecrease}
                    className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-red-400 transition-colors"
                    id={`cart-decrease-${product.slug}-${selectedSize}`}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="text-gold font-heading text-sm min-w-[16px] text-center">
                    {cartQty}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-gold transition-colors"
                    id={`cart-increase-${product.slug}-${selectedSize}`}
                    aria-label="Increase quantity"
                  >
                    <Plus size={10} />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="add-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={`flex items-center gap-1.5 text-[10px] tracking-wider uppercase border px-3 py-1.5 rounded-full transition-all duration-200 ${
                    !product.inStock
                      ? "border-white/10 text-text-muted/40 cursor-not-allowed bg-white/5"
                      : "border-border text-text-muted hover:border-gold hover:text-gold hover:bg-gold/5"
                  }`}
                  id={`add-to-cart-${product.slug}`}
                  data-cursor={product.inStock ? "Add" : "Disabled"}
                >
                  <ShoppingBag size={11} />
                  {product.inStock ? "Add" : "Sold Out"}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Tilt3D>
  );
}
