import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const footerLinks = {
  Shop: [
    { label: "All Fragrances", href: "/shop" },
    { label: "Oud Collection", href: "/shop?category=oud" },
    { label: "Floral Collection", href: "/shop?category=floral" },
    { label: "Musk Collection", href: "/shop?category=musk" },
    { label: "Bestsellers", href: "/shop?filter=bestseller" },
  ],
  Help: [
    { label: "Track Order", href: "/track-order" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "About Us", href: "/about" },
    { label: "Meet the Developer", href: "/developer" },
  ],
  Policies: [
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Return & Refund", href: "/return-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ms_signature_scents",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/917895411144",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex flex-col items-start mb-6 group"
              aria-label="Home"
            >
              <span className="font-(family-name:--font-cinzel) text-xl tracking-[0.15em] text-gold group-hover:text-soft-gold transition-colors duration-500">
                MS SIGNATURE
              </span>
              <span className="block text-[8px] tracking-[0.4em] text-text-muted uppercase mt-0.5 group-hover:text-gold/70 transition-colors duration-500">
                Scents
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              Crafting pure, long-lasting attars with heritage methods. Every
              drop tells a story of tradition and excellence.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading text-[11px] tracking-[0.3em] uppercase text-gold mb-5">
                {category}
              </h4>
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-text-muted text-sm hover:text-text-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="gold-separator mt-14 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link
              href="/privacy-policy"
              className="hover:text-gold transition-colors"
            >
              Privacy
            </Link>
            <span className="text-border">·</span>
            <Link
              href="/terms-of-service"
              className="hover:text-gold transition-colors"
            >
              Terms
            </Link>
            <span className="text-border">·</span>
            <span>Crafted with dedication in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
