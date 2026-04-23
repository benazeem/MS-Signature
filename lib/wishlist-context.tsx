"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { useGuestAuth } from "@/lib/guest-auth-context";
import { useAuth } from "@/lib/supabase-auth-context";
import { useToast } from "@/components/ui/Toast";

import { WishlistContextType } from "@/types/wishlist.types";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const EMPTY_WISHLIST: string[] = [];

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const { user: guestUser } = useGuestAuth();
  const { user: supabaseUser } = useAuth();

  const snapshotRef = useRef<{ key: string | null; raw: string; parsed: string[] }>({
    key: null,
    raw: "[]",
    parsed: EMPTY_WISHLIST,
  });

  const userEmail = supabaseUser?.email || guestUser?.email;
  const wishlistKey = useMemo(() => (userEmail ? `ms-wishlist-${userEmail}` : null), [userEmail]);

  const getWishlistSnapshot = useCallback((): string[] => {
    if (!wishlistKey || typeof window === "undefined") return EMPTY_WISHLIST;

    try {
      const raw = localStorage.getItem(wishlistKey) ?? "[]";
      const cached = snapshotRef.current;

      if (cached.key === wishlistKey && cached.raw === raw) {
        return cached.parsed;
      }

      const parsed = JSON.parse(raw);
      const normalized = Array.isArray(parsed) ? parsed : EMPTY_WISHLIST;
      snapshotRef.current = { key: wishlistKey, raw, parsed: normalized };
      return normalized;
    } catch {
      snapshotRef.current = { key: wishlistKey, raw: "[]", parsed: EMPTY_WISHLIST };
      return EMPTY_WISHLIST;
    }
  }, [wishlistKey]);

  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("storage", onStoreChange);
    window.addEventListener("ms-wishlist-change", onStoreChange);
    return () => {
      window.removeEventListener("storage", onStoreChange);
      window.removeEventListener("ms-wishlist-change", onStoreChange);
    };
  }, []);

  const getServerWishlistSnapshot = useCallback(() => EMPTY_WISHLIST, []);

  const wishlist = useSyncExternalStore(
    subscribe,
    getWishlistSnapshot,
    getServerWishlistSnapshot
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (!wishlistKey) {
        showToast("Sign in to save items to your wishlist", "info");
        return;
      }

      const current = getWishlistSnapshot();
      const next = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];

      localStorage.setItem(wishlistKey, JSON.stringify(next));
      window.dispatchEvent(new Event("ms-wishlist-change"));
    },
    [getWishlistSnapshot, showToast, wishlistKey]
  );

  const isWishlisted = useCallback(
    (productId: string) => (wishlistKey ? wishlist.includes(productId) : false),
    [wishlist, wishlistKey]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
