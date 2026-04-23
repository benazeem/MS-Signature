"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Package,
  MapPin,
  Calendar,
  Clock,
  ChevronLeft,
  CheckCircle2,
  Truck,
  ShoppingBag,
  CreditCard,
  User,
  Phone,
  Loader2,
  Star,
  Edit3,
  X,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/lib/supabase-auth-context";
import { useGuestAuth } from "@/lib/guest-auth-context";
import { useToast } from "@/components/ui/Toast";
import { OrderDetail } from "@/types/order.types";

const statusSteps = [
  {
    status: "confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    status: "processing",
    label: "Processing",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    status: "shipped",
    label: "Shipped",
    icon: Truck,
    color: "text-purple-500",
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: ShoppingBag,
    color: "text-gold",
  },
];

const progressWidthClasses = ["w-0", "w-1/3", "w-2/3", "w-full"] as const;

export default function OrderDetailPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : null;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setPageError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const [reviewProduct, setReviewProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();
  const { user: supabaseUser } = useAuth();
  const { user: guestUser } = useGuestAuth();

  const userEmail = supabaseUser?.email || guestUser?.email;
  const userName =
    supabaseUser?.user_metadata?.full_name ||
    userEmail?.split("@")[0] ||
    "Guest";

  const currentStatusIndex = useMemo(
    () =>
      order ? statusSteps.findIndex((s) => s.status === order.status) : -1,
    [order],
  );

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      if (retryCount >= MAX_RETRIES) {
        setPageError(
          "Unable to load order details after multiple attempts. Please try again later.",
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();

        if (res.ok) {
          setOrder(data.order);
          setRetryCount(0); // Reset on success
        } else {
          throw new Error(data.error || "Order not found");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load order details...";
        setPageError(errorMessage);

        // Schedule retry
        if (retryCount < MAX_RETRIES) {
          const delay = Math.floor(Math.random() * 5000) + 5000; // 5-10 seconds
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, delay);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, retryCount]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/reviews/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) setImages((prev) => [...prev, data.url]);
      else showToast(data.error || "Failed to upload image", "error");
    } catch {
      showToast("Network error uploading image", "error");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewProduct) return;
    if (!comment.trim()) {
      showToast("Please write a review.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: reviewProduct.id,
          userEmail,
          userName,
          rating,
          comment,
          images,
        }),
      });

      if (res.ok) {
        showToast("Review submitted successfully!", "success");
        setReviewProduct(null);
        setComment("");
        setRating(5);
        setImages([]);
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to submit review", "error");
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
        <p className="text-text-muted text-xs uppercase tracking-[0.3em] animate-pulse">
          Retrieving Order Details
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20"
          >
            <Package className="text-red-400/60" size={32} />
          </motion.div>
          <h1 className="text-3xl font-heading text-text-light mb-4">
            {error || "Order Not Found"}
          </h1>
          <p className="text-text-muted mb-8 text-sm leading-relaxed">
            {error
              ? "We encountered an issue while retrieving your order details."
              : "We couldn't find the order you're looking for. It may have been deleted or the link might be incorrect."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/track-order"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-primary font-bold px-8 py-3.5 rounded-full uppercase tracking-widest text-[10px] hover:bg-soft-gold transition-all shadow-[0_4px_20px_rgba(197,160,89,0.2)]"
            >
              <ChevronLeft size={14} />
              My Orders
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-text-light font-bold px-8 py-3.5 rounded-full uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all border border-white/10"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-32 pb-20 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/track-order"
          className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8 group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm uppercase tracking-widest">
            Back to My Orders
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-primary border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <h1 className="text-3xl font-heading text-text-light mb-2">
                    Order Details
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm">
                    <span className="flex items-center gap-1.5">
                      <Package size={14} className="text-gold" />#
                      {order.id.slice(-8).toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gold" />
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-text-muted text-xs uppercase tracking-[0.2em] mb-1">
                    Total Amount
                  </p>
                  <p className="text-3xl font-heading text-gold">
                    ₹{order.total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <div className="relative flex justify-between">
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-white/5">
                    <div
                      className={`h-full bg-gold transition-all duration-1000 ease-out ${progressWidthClasses[currentStatusIndex] ?? "w-full"}`}
                    />
                  </div>

                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <div
                        key={step.status}
                        className="relative z-10 flex flex-col items-center"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                            isActive
                              ? "bg-primary border-gold text-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                              : "bg-[#111] border-white/5 text-text-muted opacity-40"
                          } ${isCurrent ? "scale-110" : ""}`}
                        >
                          <Icon size={18} />
                        </div>
                        <p
                          className={`mt-3 text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${
                            isActive
                              ? "text-gold"
                              : "text-text-muted opacity-40"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-primary border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <h2 className="text-xl font-heading text-text-light mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-gold" />
                Items Purchased
              </h2>
              <div className="space-y-6">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 group pb-6 border-b border-white/5 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-1 items-center gap-4">
                      <div className="w-16 h-16 bg-[#111] border border-white/5 rounded-xl flex items-center justify-center text-gold transition-colors group-hover:border-gold/30 relative overflow-hidden shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Package size={24} />
                        )}
                      </div>
                      <div className="flex-1">
                        {item.slug ? (
                          <Link
                            href={`/product/${item.slug}`}
                            className="text-text-light font-medium tracking-wide hover:text-gold transition-colors block"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <h3 className="text-text-light font-medium tracking-wide">
                            {item.name}
                          </h3>
                        )}
                        <p className="text-text-muted text-xs uppercase tracking-widest mt-1">
                          Size: {item.size} · Qty: {item.quantity}
                        </p>

                        {order.status === "delivered" && item.id && (
                          <button
                            onClick={() =>
                              setReviewProduct({
                                id: item.id!,
                                name: item.name,
                              })
                            }
                            className="text-[10px] uppercase tracking-widest text-gold hover:text-soft-gold mt-3 flex items-center gap-1.5 transition-colors"
                          >
                            <Edit3 size={12} />
                            Write a Review
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-left sm:text-right ml-20 sm:ml-0">
                      <p className="text-text-light font-medium">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      <p className="text-text-muted text-[10px] mt-0.5">
                        ₹{item.price}/each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl bg-primary border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <h2 className="text-lg font-heading text-text-light mb-6 flex items-center gap-2">
                <MapPin size={18} className="text-gold" />
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User size={16} className="text-text-muted mt-1" />
                  <div>
                    <p className="text-text-light font-medium text-sm">
                      {order.shippingAddress.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-text-muted text-xs mt-1">
                      <Phone size={12} />
                      {order.shippingAddress.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-white/5 pt-4 mt-4">
                  <div className="text-text-muted text-sm leading-relaxed tracking-wide">
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                    <br />
                    <span className="text-gold font-medium">
                      {order.shippingAddress.pincode}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-primary border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <h2 className="text-lg font-heading text-text-light mb-6 flex items-center gap-2">
                <CreditCard size={18} className="text-gold" />
                Payment Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted uppercase tracking-widest text-[10px]">
                    Method
                  </span>
                  <span className="text-text-light font-medium">Razorpay</span>
                </div>
                {order.razorpayOrderId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted uppercase tracking-widest text-[10px]">
                      Order ID
                    </span>
                    <span className="text-text-light font-mono text-xs">
                      {order.razorpayOrderId.slice(-10)}
                    </span>
                  </div>
                )}
                {order.razorpayPaymentId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted uppercase tracking-widest text-[10px]">
                      Payment ID
                    </span>
                    <span className="text-text-light font-mono text-xs">
                      {order.razorpayPaymentId.slice(-10)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm border-t border-white/5 pt-3 mt-3">
                  <span className="text-text-muted uppercase tracking-widest text-[10px]">
                    Status
                  </span>
                  <span className="text-green-500 font-bold text-xs uppercase tracking-widest">
                    Captured
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111] border border-border rounded-2xl p-6 md:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setReviewProduct(null)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-light transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-heading text-2xl text-text-light mb-1">
                Review {reviewProduct.name}
              </h3>
              <p className="text-text-muted text-sm mb-6">
                Share your thoughts on this attar with others.
              </p>

              <form onSubmit={submitReview} className="space-y-5">
                <div>
                  <label className="text-text-muted text-xs tracking-widest uppercase mb-2 block">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={28}
                          className={
                            s <= rating
                              ? "text-gold fill-gold"
                              : "text-border hover:text-gold/50"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="text-text-muted text-xs tracking-widest uppercase mb-2 block"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was the fragrance? Longevity? Projection?"
                    className="w-full bg-primary border border-border rounded-lg p-3 text-sm text-text-light placeholder:text-border focus:border-gold/50 focus:outline-none transition-colors min-h-24 resize-y"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-xs tracking-widest uppercase mb-2 block">
                    Add Photos (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-16 h-16 rounded-md overflow-hidden border border-border"
                      >
                        <Image
                          src={img}
                          alt="Uploaded preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setImages((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                          className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 hover:bg-red-500 transition-colors"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="w-16 h-16 rounded-md border border-dashed border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-text-muted"
                      >
                        {uploadingImage ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <ImageIcon size={20} />
                        )}
                      </button>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold text-primary font-semibold py-3.5 rounded-lg tracking-widest uppercase text-xs transition-all duration-300 hover:bg-soft-gold disabled:opacity-60 flex justify-center items-center gap-2 mt-4"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  {submitting ? "Submitting..." : "Publish Review"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
