import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt={SITE_NAME} width={40} height={40} />
              <span className="font-heading text-lg tracking-wider text-gold">
                MS SIGNATURE SCENTS
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Crafting pure, long-lasting attars with heritage methods.
              Every drop tells a story of tradition and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm tracking-widest uppercase text-gold mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-muted text-sm hover:text-text-light transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="text-text-muted text-sm hover:text-text-light transition-colors duration-300"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm tracking-widest uppercase text-gold mb-6">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 text-text-muted text-sm">
              <p>contact@mssignaturescents.com</p>
              <p>+91 98765 43210</p>
              <p>Mumbai, India</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {["Instagram", "WhatsApp", "Facebook"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-all duration-300"
                  aria-label={name}
                >
                  <span className="text-xs">{name[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="gold-separator mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Crafted with dedication in India
          </p>
        </div>
      </div>
    </footer>
  );
}
