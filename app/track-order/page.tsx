"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Package,
  CheckCircle2,
  Truck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/supabase-auth-context";
import { useGuestAuth } from "@/lib/guest-auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { OrderStatus } from "@/types/order.types";

const statusSteps = [
  { key: "confirmed", label: "Order Confirmed", icon: CheckCircle2 },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

export default function TrackOrderPage() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderStatus[] | null>(null);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const { user: supabaseUser, isLoading: authLoading } = useAuth();
  const { user: guestUser, isLoading: guestLoading } = useGuestAuth();
  const router = useRouter();

  const userEmail = supabaseUser?.email || guestUser?.email;
  const isAuthLoading = authLoading || guestLoading;

  const fetchOrders = useCallback(
    async (email: string) => {
      if (retryCount >= MAX_RETRIES) {
        setError(
          "Unable to retrieve orders after multiple attempts. Please try again later.",
        );
        setOrders([]); // Stop the infinite loop by setting orders to an empty array
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `/api/orders?email=${encodeURIComponent(email)}`,
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch orders");
        }

        setOrders(data.orders);
        setRetryCount(0); // Reset on success
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Network error. Please try again.";
        setError(errorMessage);

        // If we haven't reached max retries, schedule a retry
        if (retryCount < MAX_RETRIES) {
          const delay = Math.floor(Math.random() * 5000) + 5000; // 5-10 seconds
          console.log(`Retrying in ${delay}ms... (Attempt ${retryCount + 1})`);
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, delay);
        } else {
          setOrders([]); // Stop loop
        }
      } finally {
        setLoading(false);
      }
    },
    [retryCount],
  );

  useEffect(() => {
    if (!isAuthLoading && !userEmail) {
      router.push("/login");
    }
  }, [isAuthLoading, userEmail, router]);

  useEffect(() => {
    if (userEmail && orders === null && !loading && retryCount === 0) {
      fetchOrders(userEmail);
    }
  }, [userEmail, orders, loading, fetchOrders, retryCount]);

  // Effect to handle retries
  useEffect(() => {
    if (
      userEmail &&
      orders === null &&
      !loading &&
      retryCount > 0 &&
      retryCount < MAX_RETRIES
    ) {
      fetchOrders(userEmail);
    }
  }, [retryCount, userEmail, orders, loading, fetchOrders]);

  const getStepIndex = (status: string) => {
    const idx = statusSteps.findIndex((s) => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  if (isAuthLoading || !userEmail) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex justify-center items-center">
        <Loader2 size={32} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-3xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Orders
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">
            Track Your Order
          </h1>
          <div className="gold-separator max-w-15 mb-6" />
          <p className="text-text-muted mb-10">
            Viewing order history for{" "}
            <strong className="text-text-light">{userEmail}</strong>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl mb-8"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                  <AlertCircle size={16} className="text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-red-400 text-sm font-medium">
                    Order Retrieval Issue
                  </p>
                  <p className="text-red-400/60 text-xs">{error}</p>
                </div>
                <button
                  onClick={() => fetchOrders(userEmail)}
                  className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 font-bold px-3 py-1.5 bg-red-500/10 rounded-lg transition-colors"
                >
                  Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 flex flex-col items-center justify-center gap-4"
            >
              <Loader2 size={32} className="animate-spin text-gold/40" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted animate-pulse">
                Scanning Order History
              </p>
            </motion.div>
          ) : (
            orders !== null && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {orders.length === 0 && !error ? (
                  <div className="text-center py-20 px-6 rounded-3xl border border-dashed border-white/5 bg-white/2">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                      <Package size={28} className="text-text-muted/40" />
                    </div>
                    <h3 className="text-xl font-heading text-text-light mb-2">
                      No Orders Found
                    </h3>
                    <p className="text-text-muted text-sm max-w-xs mx-auto mb-8">
                      You haven&apos;t placed any orders with this email address
                      yet. Once you do, they will appear here.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex bg-gold text-primary font-bold px-8 py-3.5 rounded-full uppercase tracking-widest text-[10px] hover:bg-soft-gold transition-all"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => {
                      const stepIdx = getStepIndex(order.status);
                      return (
                        <Link
                          key={order.id}
                          href={`/track-order/${order.id}`}
                          className="block p-6 border border-border rounded-xl bg-accent/10 hover:border-gold/40 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
                            <div>
                              <p className="text-text-muted text-xs tracking-widest uppercase mb-1">
                                Order ID
                              </p>
                              <p className="text-text-light font-medium">
                                #{order.id.slice(0, 8).toUpperCase()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-text-muted text-xs tracking-widest uppercase mb-1">
                                Placed
                              </p>
                              <p className="text-text-light text-sm">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-text-muted text-xs tracking-widest uppercase mb-1">
                                Total
                              </p>
                              <p className="text-gold font-semibold">
                                ₹{order.total.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center mb-6 overflow-x-auto pb-2">
                            {statusSteps.map((step, i) => {
                              const isCompleted = i <= stepIdx;
                              const isCurrent = i === stepIdx;
                              const Icon = step.icon;
                              return (
                                <div
                                  key={step.key}
                                  className="flex items-center flex-1 min-w-0"
                                >
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                        isCompleted
                                          ? "border-gold bg-gold/10"
                                          : "border-border bg-transparent"
                                      } ${isCurrent ? "animate-pulse-gold" : ""}`}
                                    >
                                      <Icon
                                        size={14}
                                        className={
                                          isCompleted
                                            ? "text-gold"
                                            : "text-border"
                                        }
                                      />
                                    </div>
                                    <p
                                      className={`text-[10px] tracking-wider uppercase mt-2 whitespace-nowrap ${isCompleted ? "text-text-muted" : "text-border"}`}
                                    >
                                      {step.label}
                                    </p>
                                  </div>
                                  {i < statusSteps.length - 1 && (
                                    <div
                                      className={`flex-1 h-px mx-2 ${i < stepIdx ? "bg-gold/30" : "bg-border"}`}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-text-muted">
                                  {item.name} ({item.size}) ×{item.quantity}
                                </span>
                                <span className="text-text-light">
                                  ₹
                                  {(item.price * item.quantity).toLocaleString(
                                    "en-IN",
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-gold mt-4">
                            View Details
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
