"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { formatPrice } from "@/lib/utils";
// import { useCart } from "@/lib/cart-context";
// import { useWishlist } from "@/lib/wishlist-context";
import { Button } from "@/components/ui/Button";
// import { SIZES } from "@/lib/constants";
import { Product } from "@/types/product.types";

export function ProductInfo({ product }: { product: Product }) {
  const hasSizes = product.sizes && product.sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState(
    hasSizes ? product.sizes![0] : { label: "", value: "", price: 0 },
  );
  // const { addItem } = useCart();
  // const { isWishlisted, toggleWishlist } = useWishlist();
  // const [added, setAdded] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const totalPrice = product.price + selectedSize.price;

  const handleAddToCart = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmWhatsApp = () => {
    setShowConfirmModal(false);
    const whatsappNumber = "916398412670";
    const text = encodeURIComponent(
      `Hi, I'm interested in buying ${product.name}${hasSizes ? ` - ${selectedSize.label}` : ""}.`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-8">
      <span className="text-gold text-xs tracking-[0.3em] uppercase">
        {product.category}
      </span>

      <h1 className="font-heading text-4xl md:text-5xl text-text-light leading-tight">
        {product.name}
      </h1>

      <p className="text-text-muted text-lg italic font-heading">
        {product.tagline}
      </p>

      <div className="flex items-baseline gap-3">
        <span className="text-gold font-heading text-3xl">
          {formatPrice(totalPrice)}
        </span>
        {hasSizes && (
          <span className="text-text-muted text-xs tracking-wider">
            for {selectedSize.label}
          </span>
        )}
      </div>

      <div className="gold-separator" />

      <p className="text-text-muted text-sm leading-relaxed">
        {product.description}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(product.notes).map(([key, value]) => (
          <div
            key={key}
            className="text-center p-4 bg-accent/50 border border-border"
          >
            <span className="text-gold text-[10px] tracking-[0.2em] uppercase block mb-2">
              {key}
            </span>
            <span className="text-text-light text-xs">{value}</span>
          </div>
        ))}
      </div>

      {hasSizes && (
        <div>
          <span className="text-text-muted text-xs tracking-widest uppercase block mb-3">
            Size
          </span>
          <div className="flex gap-3">
            {product.sizes!.map((size) => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 text-xs tracking-wider uppercase transition-all duration-300 ${
                  selectedSize.value === size.value
                    ? "bg-gold text-primary font-semibold"
                    : "border border-border text-text-muted hover:border-gold hover:text-gold"
                }`}
                id={`size-${size.value}`}
                aria-pressed={selectedSize.value === size.value}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-2">
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="flex-1"
          id="add-to-cart-btn"
          disabled={!product.inStock}
        >
          {!product.inStock ? "Sold Out" : "Order via WhatsApp"}
        </Button>
        {/* <button
          onClick={() => toggleWishlist(product.id)}
          className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
            isWishlisted(product.id)
              ? "border-gold bg-gold/10 text-gold"
              : "border-border text-text-muted hover:border-gold hover:text-gold"
          }`}
          id="wishlist-btn"
          aria-label={
            isWishlisted(product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isWishlisted(product.id) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button> */}
      </div>

      {mounted &&
        showConfirmModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-md">
            <div
              className="bg-[#111] border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-lg text-text-light mb-3">
                Order via WhatsApp
              </h3>
              <p className="text-text-muted text-sm mb-6 leading-relaxed">
                You will be redirected to WhatsApp to order **{product.name}
                {hasSizes ? ` (${selectedSize.label})` : ""}**. Would you like
                to proceed?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 border border-border rounded-lg text-xs tracking-wider uppercase text-text-muted hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmWhatsApp}
                  className="px-4 py-2 bg-gold text-primary rounded-lg text-xs tracking-wider uppercase font-semibold hover:bg-soft-gold transition-colors duration-200"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
