"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Package, MapPin, Calendar, Clock, ChevronLeft, 
  CheckCircle2, Truck, ShoppingBag, CreditCard,
  User, Phone
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

import { OrderDetail } from "@/types/order.types";

const statusSteps = [
  { status: "confirmed", label: "Confirmed", icon: CheckCircle2, color: "text-green-500" },
  { status: "processing", label: "Processing", icon: Clock, color: "text-blue-500" },
  { status: "shipped", label: "Shipped", icon: Truck, color: "text-purple-500" },
  { status: "delivered", label: "Delivered", icon: ShoppingBag, color: "text-gold" },
];

const progressWidthClasses = ["w-0", "w-1/3", "w-2/3", "w-full"] as const;

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        } else {
          router.push("/track-order");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) return null;

  const currentStatusIndex = Math.max(0, statusSteps.findIndex((s) => s.status === order.status));
  const progressWidthClass = progressWidthClasses[currentStatusIndex] ?? "w-full";

  return (
    <div className="min-h-screen bg-primary pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/track-order"
          className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest">Back to My Orders</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-primary border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <h1 className="text-3xl font-heading text-text-light mb-2">Order Details</h1>
                  <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm">
                    <span className="flex items-center gap-1.5">
                      <Package size={14} className="text-gold" />
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gold" />
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-text-muted text-xs uppercase tracking-[0.2em] mb-1">Total Amount</p>
                  <p className="text-3xl font-heading text-gold">₹{order.total.toLocaleString("en-IN")}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-12 pt-12 border-t border-white/5">
                <div className="relative flex justify-between">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-white/5">
                    <div 
                      className={`h-full bg-gold transition-all duration-1000 ease-out ${progressWidthClass}`}
                    />
                  </div>

                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <div key={step.status} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                          isActive ? "bg-primary border-gold text-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]" : "bg-[#111] border-white/5 text-text-muted opacity-40"
                        } ${isCurrent ? "scale-110" : ""}`}>
                          <Icon size={18} />
                        </div>
                        <p className={`mt-3 text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${
                          isActive ? "text-gold" : "text-text-muted opacity-40"
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Items Card */}
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
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-16 h-16 bg-[#111] border border-white/5 rounded-xl flex items-center justify-center text-gold transition-colors group-hover:border-gold/30">
                      <Package size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-text-light font-medium tracking-wide">{item.name}</h3>
                      <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-light font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      <p className="text-text-muted text-[10px] mt-0.5">₹{item.price}/each</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Delivery Address Card */}
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
                    <p className="text-text-light font-medium text-sm">{order.shippingAddress.name}</p>
                    <div className="flex items-center gap-1.5 text-text-muted text-xs mt-1">
                      <Phone size={12} />
                      {order.shippingAddress.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-white/5 pt-4 mt-4">
                  <div className="text-text-muted text-sm leading-relaxed tracking-wide">
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                    <span className="text-gold font-medium">{order.shippingAddress.pincode}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Info Card */}
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
                  <span className="text-text-muted uppercase tracking-widest text-[10px]">Method</span>
                  <span className="text-text-light font-medium">Razorpay</span>
                </div>
                {order.razorpayOrderId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted uppercase tracking-widest text-[10px]">Order ID</span>
                    <span className="text-text-light font-mono text-xs">{order.razorpayOrderId.slice(-10)}</span>
                  </div>
                )}
                {order.razorpayPaymentId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted uppercase tracking-widest text-[10px]">Payment ID</span>
                    <span className="text-text-light font-mono text-xs">{order.razorpayPaymentId.slice(-10)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm border-t border-white/5 pt-3 mt-3">
                  <span className="text-text-muted uppercase tracking-widest text-[10px]">Status</span>
                  <span className="text-green-500 font-bold text-xs uppercase tracking-widest">Captured</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
