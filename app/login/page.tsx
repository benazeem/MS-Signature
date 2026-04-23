"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/supabase-auth-context";
import { useEffect } from "react";

import { LoginMode } from "@/types/auth.types";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Enter your email address");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/magic-link", {
      method: "POST",
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to send magic link");
      setLoading(false);
    } else {
      setMode("link-sent");
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="border border-border bg-accent/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={20} className="text-gold" />
            </div>
            <h1 className="font-heading text-3xl text-text-light mb-1">
              {mode === "link-sent" ? "Check Your Email" : "Welcome Back"}
            </h1>
            <p className="text-text-muted text-sm">
              {mode === "link-sent"
                ? `We sent a magic link to ${email}`
                : "Sign in to MS Signature Scents"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {mode === "link-sent" && (
              <motion.div
                key="link-sent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-text-muted text-sm text-center mb-6 leading-relaxed">
                  We&apos;ve sent a secure magic link to{" "}
                  <strong className="text-gold">{email}</strong>. Click the link
                  in the email to sign in instantly.
                </p>

                <p className="text-xs text-text-muted text-center mb-6">
                  You can safely close this window or return to shopping on your
                  original device if you opened the link on your phone.
                </p>

                <button
                  onClick={() => {
                    setMode("signin");
                    setError("");
                  }}
                  className="w-full text-center text-text-muted text-xs hover:text-gold transition-colors tracking-widest uppercase"
                >
                  ← Change email / Resend
                </button>
              </motion.div>
            )}

            {mode === "signin" && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {error && (
                  <p className="text-red-400 text-xs mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    {error}
                  </p>
                )}

                <form onSubmit={handleSendLink} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-[#999] text-xs tracking-widest uppercase mb-1.5 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="checkout-input px-4"
                        required
                        id="login-name"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#999] text-xs tracking-widest uppercase mb-1.5 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="checkout-input pl-10"
                        required
                        id="login-email"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    id="login-submit-btn"
                    className="w-full bg-gold text-primary font-semibold py-3.5 rounded-lg tracking-widest uppercase text-sm transition-all duration-300 hover:bg-soft-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                  >
                    {loading && <Loader2 size={15} className="animate-spin" />}
                    {loading ? "Sending Magic Link..." : "Send Magic Link"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
