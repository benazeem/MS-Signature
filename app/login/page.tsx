"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Loader2, Mail, Sparkles, KeyRound } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createAuthClient } from "@neondatabase/auth/next";

const authClient = createAuthClient();

type Step = "email" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, refresh } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });

      if (authError) {
        setError(authError.message || "Failed to send OTP");
        return;
      }

      setStep("otp");
    } catch {
      setError("Failed to send sign-in code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Enter the code from your email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await authClient.signIn.emailOtp({
        email,
        otp,
      });

      if (authError) {
        setError(authError.message || "Invalid code");
        return;
      }

      await refresh();
      router.push("/");
    } catch {
      setError("Failed to verify code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-20 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="border border-border bg-accent/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
              {step === "email" ? (
                <Sparkles size={20} className="text-gold" />
              ) : (
                <KeyRound size={20} className="text-gold" />
              )}
            </div>
            <h1 className="font-heading text-3xl text-text-light mb-1">
              {step === "email" ? "Welcome Back" : "Check Your Email"}
            </h1>
            <p className="text-text-muted text-sm">
              {step === "email"
                ? "Enter your email to receive a sign-in code"
                : `We sent a 6-digit code to ${email}`}
            </p>
          </div>

          <div className="mb-8 p-4 border border-gold/30 bg-gold/5 rounded-xl text-center">
            <p className="text-gold text-sm font-medium">
              We are currently serving our customers exclusively through WhatsApp and Instagram.
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </p>
          )}

          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
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
                {loading ? "Sending Code..." : "Send Sign-In Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-[#999] text-xs tracking-widest uppercase mb-1.5 block">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="checkout-input text-center tracking-[0.5em] text-xl font-mono"
                  required
                  id="login-otp"
                  autoComplete="one-time-code"
                  maxLength={6}
                  inputMode="numeric"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                id="login-verify-btn"
                className="w-full bg-gold text-primary font-semibold py-3.5 rounded-lg tracking-widest uppercase text-sm transition-all duration-300 hover:bg-soft-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? "Verifying..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={() => { setStep("email"); setOtp(""); setError(""); }}
                className="w-full text-text-muted text-sm py-2 hover:text-text-light transition-colors"
              >
                ← Use a different email
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
