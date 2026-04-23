import type { Metadata } from "next";
import { Playfair_Display, Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { GuestAuthProvider } from "@/lib/guest-auth-context";
import { SupabaseAuthProvider } from "@/lib/supabase-auth-context";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});



export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — The Art of Fine Attar`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "attar", "perfume oil", "oud", "rose attar", "musk", "luxury fragrance",
    "Indian perfume", "natural attar", "buy attar online", "premium attar India",
    "alcohol-free perfume", "Arabic perfume", "ittar", "concentrated perfume oil",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — The Art of Fine Attar`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — The Art of Fine Attar`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cinzel.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <SupabaseAuthProvider>
          <GuestAuthProvider>
            <ToastProvider>
              <CartProvider>
                <WishlistProvider>
                  <CustomCursor />
                  <Navbar />
                  <main className="flex-1 relative">{children}</main>
                  <Footer />
                </WishlistProvider>
              </CartProvider>
            </ToastProvider>
          </GuestAuthProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
