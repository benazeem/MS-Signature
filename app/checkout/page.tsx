"use client";

import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/supabase-auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";

import Image from "next/image";
import {
  ShoppingBag,
  Lock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Home,
  Briefcase,
  Plus,
} from "lucide-react";
import { INDIAN_STATES } from "@/lib/constants";
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

import { RazorpayResponse, RazorpayOptions, ShippingForm, SavedAddress } from "@/types/order.types";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<"details" | "payment" | "success">(
    "details",
  );
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState<ShippingForm>({
    name: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | "new">(
    "new",
  );
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [fetchingPincode, setFetchingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);

  const shipping = totalPrice >= 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  const fetchSavedAddresses = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/user/shipping?email=${encodeURIComponent(user?.email || "")}`,
      );
      if (res.ok) {
        const data: { addresses?: SavedAddress[] } = await res.json();
        const addresses = data.addresses || [];
        setSavedAddresses(addresses);
        if (addresses.length > 0) {
          const defaultAddr =
            addresses.find((a) => a.isDefault) || addresses[0];
          setSelectedAddressId(defaultAddr.id);
          setForm({
            name: defaultAddr.name.replace(/\[HOME\] |\[WORK\] /g, ""),
            email: defaultAddr.email,
            phone: defaultAddr.phone,
            address: defaultAddr.address,
            city: defaultAddr.city,
            state: defaultAddr.state,
            pincode: defaultAddr.pincode,
          });
          setShowAddressForm(false);
        }
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      fetchSavedAddresses();
    }
  }, [user?.email, fetchSavedAddresses]);

  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setForm({ ...form, pincode: val });
    setPincodeError(false);

    if (val.length === 6) {
      setFetchingPincode(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data && data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setForm((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
        } else {
          setPincodeError(true);
        }
      } catch {
        setPincodeError(true);
      } finally {
        setFetchingPincode(false);
      }
    }
  };

  useEffect(() => {
    if (items.length === 0 && step !== "success") {
      router.push("/cart");
    }
  }, [items, step, router]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = () =>
    form.name &&
    form.phone &&
    form.address &&
    form.city &&
    form.state &&
    form.pincode &&
    (user ? true : form.email.includes("@"));

  const handleProceedToPayment = () => {
    setStep("payment");
  };

  const handleRazorpayPayment = async () => {
    setPaying(true);
    setError("");

    try {
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Razorpay"));
          document.body.appendChild(script);
        });
      }

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          currency: "INR",
          notes: { email: user?.email || form.email, name: form.name },
        }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        setError(orderData.error || "Failed to initiate payment");
        setPaying(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MS Signature Scents",
        description: `Order of ${items.length} item(s)`,
        order_id: orderData.orderId,
        prefill: {
          name: form.name,
          email: user?.email || form.email,
          contact: form.phone,
        },
        theme: { color: "#D4AF37" },
        handler: async (response) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              items: items.map((i) => ({
                id: i.product.id,
                name: i.product.name,
                size: i.size,
                quantity: i.quantity,
                price: i.product.price + i.priceModifier,
              })),
              total: grandTotal,
              shippingAddress: form,
              customerName: form.name,
              customerEmail: user?.email || form.email,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            clearCart();
            setOrderId(verifyData.orderId);
            setStep("success");
          } else {
            setError("Payment verification failed. Please contact support.");
          }
          setPaying(false);
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Payment initialization failed. Please try again.");
      setPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-40 flex justify-center">
        <Loader2 size={24} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            Secure Checkout
          </p>
          <h1 className="font-heading text-4xl text-text-light">
            Complete Your Order
          </h1>
          <div className="gold-separator max-w-15 mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle2 size={40} className="text-gold" />
              </motion.div>
              <h2 className="font-heading text-3xl text-text-light mb-3">
                Order Confirmed!
              </h2>
              <p className="text-text-muted mb-2">
                Order #{orderId.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-text-muted text-sm mb-8">
                A confirmation has been sent to{" "}
                <strong className="text-text-light">
                  {user?.email || form.email}
                </strong>
              </p>
              <div className="flex gap-4 justify-center">
                <Button href="/" variant="outline" id="checkout-home-btn">
                  Back to Home
                </Button>
                <Button href="/shop" id="checkout-shop-more-btn">
                  Shop More
                </Button>
              </div>
            </motion.div>
          )}

          {step !== "success" && (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10"
            >
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center gap-3 text-xs tracking-widest uppercase">
                  <span
                    className={`flex items-center gap-2 ${step === "details" ? "text-gold" : "text-text-muted"}`}
                  >
                    <span className="w-5 h-5 rounded-full border flex items-center justify-center border-current text-[10px]">
                      1
                    </span>
                    Details
                  </span>
                  <ChevronRight size={12} className="text-border" />
                  <span
                    className={`flex items-center gap-2 ${step === "payment" ? "text-gold" : "text-text-muted"}`}
                  >
                    <span className="w-5 h-5 rounded-full border flex items-center justify-center border-current text-[10px]">
                      2
                    </span>
                    Payment
                  </span>
                </div>

                <div className="p-6 bg-accent/20 border border-border rounded-xl space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-gold" />
                    <h2 className="text-text-light font-heading text-lg">
                      Shipping Details
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {user && savedAddresses.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {savedAddresses.map((addr) => (
                          <button
                            key={addr.id}
                            onClick={() => {
                              setSelectedAddressId(addr.id);
                              setShowAddressForm(false);
                              setForm({
                                name: addr.name.replace(
                                  /\[HOME\] |\[WORK\] /g,
                                  "",
                                ),
                                phone: addr.phone,
                                email: addr.email,
                                address: addr.address,
                                city: addr.city,
                                state: addr.state,
                                pincode: addr.pincode,
                              });
                            }}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              selectedAddressId === addr.id
                                ? "border-gold bg-gold/5 shadow-[0_0_15px_rgba(197,160,89,0.1)]"
                                : "border-border bg-accent/5 hover:border-border/80"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center gap-1">
                                {addr.name.includes("[WORK]") ? (
                                  <Briefcase size={10} />
                                ) : (
                                  <Home size={10} />
                                )}
                                {addr.name.includes("[WORK]") ? "Work" : "Home"}
                              </span>
                              {selectedAddressId === addr.id && (
                                <CheckCircle2 size={14} className="text-gold" />
                              )}
                            </div>
                            <p className="text-text-light text-sm font-medium mb-1 truncate">
                              {addr.name.replace(/\[HOME\] |\[WORK\] /g, "")}
                            </p>
                            <p className="text-text-muted text-xs truncate">
                              {addr.address}
                            </p>
                            <p className="text-text-muted text-xs">
                              {addr.city}, {addr.pincode}
                            </p>
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setSelectedAddressId("new");
                            setShowAddressForm(true);
                            setForm({
                              name: "",
                              email: user?.email || "",
                              phone: "",
                              address: "",
                              city: "",
                              state: "",
                              pincode: "",
                            });
                          }}
                          className={`p-4 rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                            selectedAddressId === "new"
                              ? "border-gold bg-gold/5 text-gold"
                              : "border-border text-text-muted hover:border-text-muted/50"
                          }`}
                        >
                          <Plus size={20} />
                          <span className="text-xs font-medium uppercase tracking-widest">
                            New Address
                          </span>
                        </button>
                      </div>
                    )}

                    {showAddressForm && (
                      <div className="space-y-4 p-6 bg-white/2 border border-white/10 rounded-2xl shadow-inner">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative col-span-2">
                            <div className="absolute right-3 top-3 flex items-center gap-2">
                              {fetchingPincode && (
                                <Loader2
                                  size={14}
                                  className="animate-spin text-gold"
                                />
                              )}
                              <span className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[9px] uppercase tracking-widest text-text-light font-medium backdrop-blur-md flex items-center gap-1">
                                <MapPin size={8} className="text-gold" /> INDIA
                              </span>
                            </div>
                            <input
                              required
                              name="pincode"
                              value={form.pincode}
                              onChange={handlePincodeChange}
                              placeholder=" "
                              className={`peer w-full bg-white/5 border ${pincodeError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-gold"} rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none transition-all`}
                            />
                            <label className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none">
                              Pincode
                            </label>
                          </div>

                          {form.pincode.length === 6 && !pincodeError && (
                            <>
                              <div className="relative col-span-2 sm:col-span-1">
                                <input
                                  required
                                  name="city"
                                  value={form.city}
                                  onChange={handleFormChange}
                                  className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light focus:outline-none focus:border-gold transition-all"
                                />
                                <label className="absolute left-4 top-2 text-[10px] text-text-muted uppercase tracking-widest">
                                  City
                                </label>
                              </div>
                              <div className="relative col-span-2 sm:col-span-1">
                                <select
                                  required
                                  name="state"
                                  value={form.state}
                                  onChange={handleFormChange}
                                  className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light focus:outline-none focus:border-gold transition-all appearance-none"
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="bg-[#111]"
                                  >
                                    State
                                  </option>
                                  {INDIAN_STATES.map((s) => (
                                    <option
                                      key={s}
                                      value={s}
                                      className="bg-[#111]"
                                    >
                                      {s}
                                    </option>
                                  ))}
                                </select>
                                <label className="absolute left-4 top-2 text-[10px] text-text-muted uppercase tracking-widest">
                                  State
                                </label>
                              </div>
                            </>
                          )}

                          <div className="relative col-span-2 sm:col-span-1">
                            <input
                              required
                              name="name"
                              value={form.name}
                              onChange={handleFormChange}
                              placeholder=" "
                              className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold transition-all"
                            />
                            <label className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none">
                              Full Name
                            </label>
                          </div>
                          {!user && (
                            <div className="relative col-span-2 sm:col-span-1">
                              <input
                                required
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleFormChange}
                                placeholder=" "
                                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold transition-all"
                              />
                              <label className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none">
                                Email Address
                              </label>
                            </div>
                          )}
                          <div
                            className={`relative col-span-2 ${user ? "sm:col-span-1" : ""}`}
                          >
                            <input
                              required
                              name="phone"
                              value={form.phone}
                              onChange={handleFormChange}
                              placeholder=" "
                              className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold transition-all"
                            />
                            <label className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none">
                              Mobile
                            </label>
                          </div>
                          <div className="relative col-span-2">
                            <input
                              required
                              name="address"
                              value={form.address}
                              onChange={handleFormChange}
                              placeholder=" "
                              className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold transition-all"
                            />
                            <label className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none">
                              Address (House No, Street, Area)
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {step === "payment" && (
                    <button
                      onClick={() => setStep("details")}
                      className="text-xs text-text-muted hover:text-gold tracking-widest uppercase transition-colors"
                    >
                      ← Edit details
                    </button>
                  )}
                </div>

                {step === "details" && (
                  <div>
                    {!user && (
                      <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-lg mb-4">
                        <AlertCircle
                          size={16}
                          className="text-gold mt-0.5 shrink-0"
                        />
                        <p className="text-text-light text-sm leading-relaxed">
                          Checking out as a Guest. We will send tracking updates
                          to your email.
                        </p>
                      </div>
                    )}
                    {user && (
                      <div className="flex items-center gap-2 p-3 bg-green-500/5 border border-green-500/20 rounded-lg mb-4">
                        <CheckCircle2 size={14} className="text-green-400" />
                        <p className="text-text-light text-sm">
                          Verified as <strong>{user.email}</strong>
                        </p>
                      </div>
                    )}
                    <Button
                      onClick={handleProceedToPayment}
                      disabled={!isFormValid()}
                      className="w-full"
                      id="checkout-proceed-btn"
                    >
                      {user ? "Proceed to Payment" : "Continue as Guest"}
                    </Button>
                  </div>
                )}

                {step === "payment" && (
                  <div className="p-6 bg-accent/20 border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock size={16} className="text-gold" />
                      <h2 className="text-text-light font-heading text-lg">
                        Secure Payment
                      </h2>
                    </div>
                    <p className="text-text-muted text-sm mb-6">
                      Powered by Razorpay. Your payment information is encrypted
                      and secure.
                    </p>

                    {error && (
                      <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                        <AlertCircle
                          size={14}
                          className="text-red-400 mt-0.5"
                        />
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    <button
                      onClick={handleRazorpayPayment}
                      disabled={paying}
                      id="pay-now-btn"
                      className="w-full bg-gold text-primary font-semibold py-4 rounded-lg tracking-widest uppercase text-sm transition-all duration-300 hover:bg-soft-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {paying ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Lock size={14} />
                      )}
                      {paying
                        ? "Initiating Payment..."
                        : `Pay ₹${grandTotal.toLocaleString("en-IN")}`}
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-28">
                  <div className="p-6 bg-accent/20 border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-6">
                      <ShoppingBag size={16} className="text-gold" />
                      <h2 className="text-text-light font-heading text-lg">
                        Order Summary
                      </h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div
                          key={`${item.product.id}-${item.size}`}
                          className="flex gap-3"
                        >
                          <div className="relative w-14 h-16 bg-[#111] rounded shrink-0 overflow-hidden border border-border">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-text-light text-sm font-medium truncate">
                              {item.product.name}
                            </p>
                            <p className="text-text-muted text-xs">
                              {item.size} · ×{item.quantity}
                            </p>
                            <p className="text-gold text-sm mt-1">
                              ₹
                              {(
                                (item.product.price + item.priceModifier) *
                                item.quantity
                              ).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="gold-separator mb-4" />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-text-muted">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-text-muted">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-green-400">Free</span>
                          ) : (
                            `₹${shipping}`
                          )}
                        </span>
                      </div>
                      <div className="gold-separator my-3" />
                      <div className="flex justify-between text-text-light font-semibold text-base">
                        <span>Total</span>
                        <span className="text-gold">
                          ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {shipping > 0 && (
                      <p className="text-[#666] text-xs mt-3">
                        Add ₹{(999 - totalPrice).toLocaleString("en-IN")} more
                        for free shipping
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
