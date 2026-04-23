"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { CartItem, CartContextType } from "@/types/cart.types";
import { Product } from "@/types/product.types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ms-cart");
      const parsed = saved ? JSON.parse(saved) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("ms-cart", JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((product: Product, size: string, priceModifier: number) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, size, quantity: 1, priceModifier }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter((item) => !(item.product.id === productId && item.size === size))
      );
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product.price + item.priceModifier) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
