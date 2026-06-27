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
      <div style={{ minHeight: "100vh", width: "100vw", background: "#fff" }}>
        {children}
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <WhatsAppButton />
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </>
  );
}
