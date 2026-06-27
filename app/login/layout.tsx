import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | MS Signature Scents",
  description: "Sign in to your account to manage orders, wishlist, and preferences.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
