"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CustomCursor } from "@/components/ui/CustomCursor";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return (
      <div className="min-h-screen w-screen bg-white">
        {children}
      </div>
    );
  }

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-gold text-primary px-3 py-2 rounded-md"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>
      <CustomCursor />
      <WhatsAppButton />
      <Navbar />
      {pathname === "/" && <div className="h-14 sm:h-16 lg:h-20" />}
      <main id="content" className="flex-1 relative">{children}</main>
      <Footer />
    </>
  );
}
