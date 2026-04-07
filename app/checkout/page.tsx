"use client";

import { useSession } from "@/lib/auth-client";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
  const { data: session, isPending } = useSession();
  const { totalItems, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/checkout");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div className="pt-32 text-center text-text-muted">Loading...</div>;
  }

  if (!session?.user) {
    return null; // will redirect
  }

  const handleMocCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setLoading(false);
      alert("Order placed successfully! This is a mock checkout.");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl p-8 border border-border bg-accent/30 animate-fade-in-up">
        <h1 className="font-heading text-3xl text-text-light mb-6 text-center">
          Secure Checkout
        </h1>
        
        <div className="mb-8 p-6 bg-primary border border-border text-center">
          <p className="text-text-muted text-sm mb-2 uppercase tracking-widest text-gold text-xs">Account Info</p>
          <p className="text-text-light font-medium">{session.user.name}</p>
          <p className="text-text-muted text-sm">{session.user.email}</p>
        </div>

        {totalItems > 0 ? (
          <div className="space-y-6">
            <h3 className="text-text-light font-heading text-xl">Payment Method</h3>
            <div className="p-4 border border-border bg-primary/50 text-text-muted text-sm text-center italic">
              Mock checkout enabled. No real payment required.
            </div>

            <Button onClick={handleMocCheckout} className="w-full" disabled={loading}>
              {loading ? "Processing Order..." : "Place Order Now"}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-text-muted mb-6">Your cart is empty.</p>
            <Button href="/shop" variant="outline">
              Return to Shop
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
