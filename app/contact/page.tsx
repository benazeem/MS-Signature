"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Mail,
  Phone,
  MessageCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/lib/supabase-auth-context";

export default function ContactPage() {
  const { user } = useAuth();

  const userName = user?.user_metadata.full_name || "";
  const userEmail = user?.email || "";
  const [form, setForm] = useState({
    name: userName,
    email: userEmail,
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@mssignaturescents.com",
      href: "mailto:contact@mssignaturescents.com",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 6398412670",
      href: "https://wa.me/916398412670",
    },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-5xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Support
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">
            Get in Touch
          </h1>
          <div className="gold-separator max-w-[60px] mb-6" />
          <p className="text-text-muted max-w-md mb-12">
            Have a question about an order, a fragrance, or just want to say
            hello? We&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {contactMethods.map(({ icon: Icon, label, value, href }, i) => (
              <ScrollReveal key={label} delay={i * 0.1} direction="left">
                <div className="flex items-start gap-4 p-5 border border-border rounded-xl hover:border-gold/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-[#666] text-xs tracking-widest uppercase mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-text-light text-sm hover:text-gold transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-text-light text-sm">{value}</p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.4} direction="left">
              <div className="p-5 border border-border rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle size={16} className="text-gold" />
                  <p className="text-text-muted text-xs tracking-widest uppercase">
                    Business Hours
                  </p>
                </div>
                <p className="text-text-light text-sm">Monday – Saturday</p>
                <p className="text-text-muted text-sm">
                  10:00 AM – 7:00 PM IST
                </p>
                <p className="text-text-muted text-xs mt-2">
                  We typically reply within 24 hours
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <div className="p-8 bg-accent/20 border border-border rounded-2xl">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} className="text-gold" />
                    </div>
                    <h2 className="font-heading text-2xl text-text-light mb-3">
                      Message Sent!
                    </h2>
                    <p className="text-text-muted">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#999] text-xs tracking-widest uppercase mb-1.5 block">
                          Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="checkout-input"
                        />
                      </div>
                      <div>
                        <label className="text-[#999] text-xs tracking-widest uppercase mb-1.5 block">
                          Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="checkout-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#999] text-xs tracking-widest uppercase mb-1.5 block">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="checkout-input"
                      >
                        <option value="">Select a topic</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="return">Return / Refund</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[#999] text-xs tracking-widest uppercase mb-1.5 block">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="checkout-input resize-none"
                      />
                    </div>

                    {error && <p className="text-red-400 text-xs">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      id="contact-submit-btn"
                      className="w-full bg-gold text-primary font-semibold py-3.5 rounded-lg tracking-widest uppercase text-sm transition-all duration-300 hover:bg-soft disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : null}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
