"use client";

import { memo, useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Plus,
  Star,
  Loader2,
  Home,
  Briefcase,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/lib/supabase-auth-context";
import { useGuestAuth } from "@/lib/guest-auth-context";
import { INDIAN_STATES } from "@/lib/constants";
import { useToast } from "@/components/ui/Toast";
import { motion, AnimatePresence } from "motion/react";

import { ShippingAddress } from "@/types/common.types";

const ShippingAddressesComponent = () => {
  const { user: supabaseUser } = useAuth();
  const { user: guestUser } = useGuestAuth();
  const email = supabaseUser?.email || guestUser?.email;

  const { showToast } = useToast();
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    landmark: "",
    address: "",
    isDefault: false,
  });

  const [addressType, setAddressType] = useState<"home" | "work">("home");
  const [pincodeError, setPincodeError] = useState(false);
  const [fetchingPincode, setFetchingPincode] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setForm({
      name: "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      landmark: "",
      address: "",
      isDefault: false,
    });
    setAddressType("home");
    setPincodeError(false);
    setEditingAddressId(null);
  }, []);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/user/shipping?email=${encodeURIComponent(email || "")}`,
      );
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      fetchAddresses();
    } else {
      setLoading(false);
    }
  }, [email, fetchAddresses]);

  const handleSetDefault = async (id: string) => {
    if (!email) return;
    try {
      const res = await fetch("/api/user/shipping", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, id, isDefault: true }),
      });
      if (res.ok) {
        showToast("Default address updated", "success");
        fetchAddresses();
      }
    } catch {
      showToast("Failed to update address", "error");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!email) return;
    setDeletingId(id);
    try {
      const res = await fetch(
        `/api/user/shipping?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        showToast("Address removed", "success");
        fetchAddresses();
      } else {
        showToast("Failed to remove address", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditAddress = (address: ShippingAddress) => {
    const isWork = address.name.includes("[WORK]");
    const cleanName = address.name.replace(/\[HOME\] |\[WORK\] /g, "");

    let landmark = "";
    let baseAddress = address.address;

    if (address.address.includes(", Landmark:")) {
      const parts = address.address.split(", Landmark:");
      baseAddress = parts[0]?.trim() || "";
      landmark = parts[1]?.trim() || "";
    }

    setAddressType(isWork ? "work" : "home");
    setForm({
      name: cleanName,
      phone: address.phone,
      pincode: address.pincode,
      city: address.city,
      state: address.state,
      landmark,
      address: baseAddress,
      isDefault: address.isDefault,
    });
    setPincodeError(false);
    setEditingAddressId(address.id);
    setShowForm(true);
  };

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

  const handlePincodeBlur = () => {
    if (form.pincode.length > 0 && form.pincode.length < 6) {
      setPincodeError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast("You must be signed in", "error");
      return;
    }
    if (form.pincode.length !== 6 || pincodeError) {
      setPincodeError(true);
      return;
    }

    setSubmitting(true);
    const finalAddress = form.landmark
      ? `${form.address}, Landmark: ${form.landmark}`
      : form.address;
    const finalName = `[${addressType.toUpperCase()}] ${form.name}`;

    try {
      const payload = {
        id: editingAddressId,
        name: finalName,
        phone: form.phone,
        address: finalAddress,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        email,
        isDefault: addresses.length === 0 ? true : form.isDefault,
      };

      const res = await fetch("/api/user/shipping", {
        method: editingAddressId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(
          editingAddressId
            ? "Address updated successfully"
            : "Address saved successfully",
          "success",
        );
        setShowForm(false);
        resetForm();
        fetchAddresses();
      } else {
        showToast(
          editingAddressId
            ? "Failed to update address"
            : "Failed to save address",
          "error",
        );
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  } as const;

  const shakeAnimation = pincodeError
    ? { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } }
    : {};

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div id="addresses" className="mt-16 scroll-mt-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-2xl text-text-light mb-2">
            Shipping Addresses
          </h2>
          <p className="text-text-muted text-sm">
            Manage your delivery locations
          </p>
        </div>
        <button
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="flex items-center gap-2 text-sm text-gold hover:text-soft-gold transition-colors uppercase tracking-widest"
        >
          {showForm ? (
            "Cancel"
          ) : (
            <>
              <Plus size={16} /> Add New
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="p-6 md:p-8 bg-primary/80 backdrop-blur-md border border-white/10 rounded-2xl mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6 relative z-10"
            >
              <motion.div variants={itemVariants} className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddressType("home")}
                  className={`flex-1 py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all duration-300 ${
                    addressType === "home"
                      ? "bg-gold/10 border-gold/50 text-gold shadow-[0_0_15px_rgba(197,160,89,0.2)]"
                      : "bg-white/5 border-white/10 text-text-muted hover:border-white/20"
                  }`}
                >
                  <Home
                    size={16}
                    className={
                      addressType === "home" ? "text-gold" : "opacity-50"
                    }
                  />
                  <span className="text-sm font-medium tracking-wide">
                    HOME
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setAddressType("work")}
                  className={`flex-1 py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all duration-300 ${
                    addressType === "work"
                      ? "bg-teal-500/10 border-teal-500/50 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]"
                      : "bg-white/5 border-white/10 text-text-muted hover:border-white/20"
                  }`}
                >
                  <Briefcase
                    size={16}
                    className={
                      addressType === "work" ? "text-teal-400" : "opacity-50"
                    }
                  />
                  <span className="text-sm font-medium tracking-wide">
                    WORK
                  </span>
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                animate={shakeAnimation}
                className="relative"
              >
                <div className="absolute right-3 top-3 flex items-center gap-2">
                  {fetchingPincode && (
                    <Loader2 size={16} className="animate-spin text-gold" />
                  )}
                  <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-md text-[10px] uppercase tracking-widest text-text-light font-medium backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                    <MapPin size={10} className="text-gold" /> INDIA
                  </span>
                </div>
                <input
                  required
                  id="pincode"
                  type="text"
                  placeholder=" "
                  value={form.pincode}
                  onChange={handlePincodeChange}
                  onBlur={handlePincodeBlur}
                  className={`peer w-full bg-white/5 border ${pincodeError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-gold"} rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:ring-1 ${pincodeError ? "focus:ring-red-500/50" : "focus:ring-gold/50"} transition-all`}
                />
                <label
                  htmlFor="pincode"
                  className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none"
                >
                  Pincode (6 Digits)
                </label>
                {pincodeError && (
                  <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                    <AlertCircle size={12} /> Invalid Pincode
                  </p>
                )}
              </motion.div>

              <AnimatePresence>
                {form.pincode.length === 6 && !pincodeError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="relative">
                      <input
                        required
                        id="city"
                        placeholder=" "
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                      />
                      <label
                        htmlFor="city"
                        className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none"
                      >
                        City
                      </label>
                    </div>
                    <div className="relative">
                      <select
                        required
                        id="state"
                        value={form.state}
                        onChange={(e) =>
                          setForm({ ...form, state: e.target.value })
                        }
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#111]">
                          Select State
                        </option>
                        {INDIAN_STATES.map((st) => (
                          <option
                            key={st}
                            value={st}
                            className="bg-[#111] text-text-light"
                          >
                            {st}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="state"
                        className="absolute left-4 top-2 text-[10px] text-text-muted uppercase tracking-widest pointer-events-none"
                      >
                        State
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative col-span-2 sm:col-span-1">
                  <input
                    required
                    id="fname"
                    placeholder=" "
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                  />
                  <label
                    htmlFor="fname"
                    className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none"
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative col-span-2 sm:col-span-1">
                  <input
                    required
                    id="phone"
                    placeholder=" "
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none"
                  >
                    Mobile Number
                  </label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <input
                  required
                  id="address"
                  placeholder=" "
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                />
                <label
                  htmlFor="address"
                  className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none"
                >
                  House No, Building, Street, Area
                </label>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <input
                  required
                  id="landmark"
                  placeholder=" "
                  value={form.landmark}
                  onChange={(e) =>
                    setForm({ ...form, landmark: e.target.value })
                  }
                  className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-text-light placeholder-transparent focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                />
                <label
                  htmlFor="landmark"
                  className="absolute left-4 top-4 text-xs text-text-muted uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold pointer-events-none"
                >
                  Famous Landmark
                </label>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 pt-2"
              >
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={form.isDefault}
                  onChange={(e) =>
                    setForm({ ...form, isDefault: e.target.checked })
                  }
                  className="accent-gold w-4 h-4 rounded border-white/10 bg-white/5"
                />
                <label
                  htmlFor="isDefault"
                  className="text-sm text-text-light cursor-pointer tracking-wide"
                >
                  Make this my default address
                </label>
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={submitting}
                className="w-full mt-4 bg-linear-to-r from-gold to-soft-gold text-primary px-6 py-3.5 rounded-xl uppercase tracking-widest text-sm font-bold hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all flex items-center justify-center min-w-[120px]"
              >
                {submitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : editingAddressId ? (
                  "Update Address"
                ) : (
                  "Save Smart Address"
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>

      {addresses.length === 0 && !showForm ? (
        <div className="text-center py-16 bg-white/2 border border-dashed border-white/10 rounded-2xl shadow-inner">
          <MapPin
            className="mx-auto text-text-muted mb-4 opacity-50"
            size={36}
          />
          <p className="text-text-muted text-sm tracking-wide">
            No shipping addresses saved yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-6 rounded-2xl border relative backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                address.isDefault
                  ? "border-gold/30 bg-gold/3 shadow-[0_8px_30px_rgba(197,160,89,0.1)]"
                  : "border-white/10 bg-white/2 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              }`}
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 text-[10px] bg-gold text-primary px-2.5 py-1 rounded-md flex items-center gap-1 font-bold uppercase tracking-widest shadow-sm">
                  <Star size={10} /> Default
                </span>
              )}
              <h3 className="text-text-light font-medium mb-1 pr-20 flex items-center gap-2">
                {address.name.includes("[WORK]") ? (
                  <Briefcase size={14} className="text-teal-400" />
                ) : (
                  <Home size={14} className="text-gold opacity-80" />
                )}
                {address.name.replace(/\[HOME\] |\[WORK\] /g, "")}
              </h3>
              <p className="text-text-muted text-sm mb-4">{address.phone}</p>
              <div className="h-px w-full bg-linear-to-r from-white/10 to-transparent mb-4" />
              <p className="text-[#999] text-sm leading-relaxed mb-5 min-h-[60px] tracking-wide">
                {address.address}
                <br />
                {address.city}, {address.state}{" "}
                <span className="text-gold ml-1 font-medium">
                  {address.pincode}
                </span>
              </p>

              <div className="flex items-center gap-4">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-[11px] text-text-muted hover:text-gold uppercase tracking-[0.2em] transition-colors font-medium"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleEditAddress(address)}
                  className="text-[11px] text-text-muted hover:text-gold uppercase tracking-[0.2em] transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  disabled={deletingId === address.id}
                  className="ml-auto text-[11px] text-text-muted hover:text-red-400 uppercase tracking-[0.2em] transition-colors font-medium flex items-center gap-1 disabled:opacity-50"
                  aria-label="Delete address"
                >
                  {deletingId === address.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Trash2 size={12} />
                  )}
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ShippingAddresses = memo(ShippingAddressesComponent);
