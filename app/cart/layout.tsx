import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected attar perfume oils and proceed to checkout.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
