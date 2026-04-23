"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/supabase-auth-context";
import { useGuestAuth } from "@/lib/guest-auth-context";
import { NAV_LINKS } from "@/lib/constants";
import {
  ShoppingBag,
  Package,
  User,
  LogOut,
  X,
  Menu,
  Heart,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user: supaUser, signOut: supaSignOut } = useAuth();
  const { user: guestUser, signOut: guestSignOut } = useGuestAuth();

  const activeUser = supaUser
    ? {
        email: supaUser.email ?? "",
        name: supaUser.user_metadata?.full_name as string | undefined,
      }
    : guestUser
      ? { email: guestUser.email, name: undefined }
      : null;

  const handleSignOut = async () => {
    if (supaUser) await supaSignOut();
    else await guestSignOut();
    setUserMenuOpen(false);
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!userMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [userMenuOpen]);

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-2`}
    >
      <nav className="container-wide flex items-center justify-between h-20">
        <Link
          href="/"
          className="flex flex-col items-center justify-center group"
          id="nav-logo"
          aria-label="Home"
        >
          <span className="font-(family-name:--font-cinzel) text-xl md:text-2xl tracking-[0.15em] text-gold group-hover:text-soft-gold transition-colors duration-500">
            MS SIGNATURE
          </span>
          <span className="block text-[8px] md:text-[9px] tracking-[0.4em] text-text-muted uppercase mt-0.5 group-hover:text-gold/70 transition-colors duration-500">
            Scents
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                pathname === link.href
                  ? "text-gold"
                  : "text-text-muted hover:text-text-light"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          {activeUser ? (
            <div ref={userMenuRef} className="hidden md:block relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                id="nav-user-btn"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
                className="flex items-center gap-2 text-text-muted text-xs hover:text-gold transition-colors duration-300 uppercase tracking-widest"
              >
                <User size={14} />
                {activeUser.name?.split(" ")[0] ??
                  activeUser.email.split("@")[0]}
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-8 w-48 bg-[#111] border border-border rounded-xl overflow-hidden shadow-xl z-50"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-text-muted text-xs tracking-widest uppercase">
                        Signed in as
                      </p>
                      <p className="text-text-light text-xs mt-0.5 truncate">
                        {activeUser?.email}
                      </p>
                    </div>
                    <Link
                      href="/wishlist"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-text-muted text-sm hover:text-gold hover:bg-gold/5 transition-all border-b border-border/50"
                    >
                      <Heart size={14} />
                      Wishlist
                    </Link>
                    <Link
                      href="/track-order"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-text-muted text-sm hover:text-gold hover:bg-gold/5 transition-all border-b border-border/50"
                    >
                      <Package size={14} />
                      My Orders
                    </Link>
                    <Link
                      href="/shipping-addresses"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-text-muted text-sm hover:text-gold hover:bg-gold/5 transition-all"
                    >
                      <MapPin size={14} />
                      Addresses
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-3 text-text-muted text-sm hover:text-red-400 hover:bg-red-500/5 transition-all w-full text-left"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 text-text-muted text-xs hover:text-gold transition-colors duration-300 uppercase tracking-widest"
              id="nav-signin"
            >
              <User size={13} />
              Sign In
            </Link>
          )}

          <Link
            href="/cart"
            id="nav-cart"
            data-cursor="Cart"
            aria-label={`Shopping cart with ${totalItems} items`}
            className="relative group"
          >
            <ShoppingBag
              size={20}
              className="text-text-light group-hover:text-gold transition-colors duration-300"
            />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-primary text-[9px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            id="nav-mobile-toggle"
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                >
                  <X size={20} className="text-text-light" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                >
                  <Menu size={20} className="text-text-light" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-border bg-primary/98 backdrop-blur-md"
          >
            <div className="container-wide py-8 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase ${
                    pathname === link.href ? "text-gold" : "text-text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="gold-separator my-1" />
              <Link
                href="/wishlist"
                className="flex items-center gap-2 text-text-muted text-sm tracking-widest uppercase hover:text-gold transition-colors"
              >
                <Heart size={14} />
                Wishlist
              </Link>
              <Link
                href="/track-order"
                className="flex items-center gap-2 text-text-muted text-sm tracking-widest uppercase hover:text-gold transition-colors"
              >
                <Package size={14} />
                My Orders
              </Link>
              <Link
                href="/shipping-addresses"
                className="flex items-center gap-2 text-text-muted text-sm tracking-widest uppercase hover:text-gold transition-colors"
              >
                <MapPin size={14} />
                Addresses
              </Link>
              {activeUser ? (
                <>
                  <p className="text-text-light text-sm">
                    {activeUser?.name ?? activeUser?.email}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-sm tracking-widest uppercase text-left text-text-muted hover:text-red-400 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm tracking-widest uppercase text-text-muted hover:text-gold transition-colors"
                >
                  <User size={14} />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
