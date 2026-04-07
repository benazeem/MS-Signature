"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn.email({
      email,
      password,
    });

    if (res.error) {
      setError(res.error.message || "Invalid credentials");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-border bg-accent/30 animate-fade-in-up">
        <h1 className="font-heading text-3xl text-text-light mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-text-muted text-sm text-center mb-8">
          Sign in to your MS Signature Scents account
        </p>

        {error && (
          <div className="mb-6 p-3 border border-red-500/50 bg-red-500/10 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-widest text-text-muted uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-primary border border-border p-3 text-sm text-text-light focus:border-gold outline-none transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-text-muted uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-primary border border-border p-3 text-sm text-text-light focus:border-gold outline-none transition-colors duration-300"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-gold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
