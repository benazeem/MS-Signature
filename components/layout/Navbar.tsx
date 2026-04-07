"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useSession, signOut } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container-wide flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="nav-logo">
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={44}
            height={44}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <span className="font-heading text-lg tracking-wider text-gold">
              MS SIGNATURE
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-text-muted uppercase">
              Scents
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                pathname === link.href
                  ? "text-gold"
                  : "text-text-muted hover:text-text-light"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          {/* User Auth */}
          {session?.user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-text-muted text-xs tracking-widest uppercase">
                {session.user.name.split(" ")[0]}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }}
                className="text-text-muted text-xs hover:text-gold transition-colors duration-300 uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:block text-text-muted text-xs hover:text-gold transition-colors duration-300 uppercase tracking-widest"
            >
              Sign In
            </Link>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            id="nav-cart"
            className="relative group"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-light group-hover:text-gold transition-colors duration-300"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-primary text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Toggle */}
          <button
            id="nav-mobile-toggle"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] bg-text-light transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-text-light transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-text-light transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-wide pb-8 flex flex-col gap-6 border-t border-border pt-6">
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
          {/* Mobile Auth */}
          <div className="gold-separator my-2" />
          {session?.user ? (
            <>
              <span className="text-sm tracking-widest uppercase text-text-light">
                Hi, {session.user.name}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }}
                className="text-sm tracking-widest uppercase text-left text-text-muted hover:text-gold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm tracking-widest uppercase text-text-muted hover:text-gold"
            >
              Sign up / Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
