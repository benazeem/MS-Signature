import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Find answers to common questions about ${SITE_NAME}'s attars, ordering, shipping, and payments.`,
};

const faqs = [
  {
    category: "About Our Attars",
    questions: [
      {
        q: "What is attar (ittar)?",
        a: "Attar, also known as ittar, is a natural perfume oil derived from botanical sources such as flowers, wood, and resins through traditional steam or hydro-distillation. Unlike modern synthetic perfumes, attars are alcohol-free, long-lasting, and deeply personal fragrances.",
      },
      {
        q: "Are your attars 100% natural?",
        a: "Yes. All MS Signature Scents attars are crafted from 100% natural botanical ingredients. We do not use synthetic chemicals, alcohol, or artificial fixatives. Our fragrances are pure perfume oil.",
      },
      {
        q: "How long do attars last on the skin?",
        a: "Natural attars are concentrated and oil-based, making them significantly longer-lasting than alcohol-based perfumes. On skin, you can expect 6–12 hours of fragrance, and on clothing, the scent can linger for days.",
      },
      {
        q: "How should I apply attar?",
        a: "Apply a small amount (1–2 drops) to pulse points: wrists, neck, behind ears, and inner elbows. The warmth of your skin helps diffuse the fragrance. Avoid rubbing — let it absorb naturally for the best scent development.",
      },
      {
        q: "Are your attars suitable for sensitive skin?",
        a: "Most of our attars are suitable for sensitive skin since they are alcohol-free. However, we recommend doing a patch test before full use, especially for oud-based or spice-heavy fragrances. If irritation occurs, discontinue use.",
      },
    ],
  },
  {
    category: "Ordering & Payment",
    questions: [
      {
        q: "Do I need to create an account to order?",
        a: "No. You can shop and checkout as a guest. Simply provide your email address — we'll send a secure magic link to your inbox for instant verification, and then you can proceed to payment. Your email becomes your identifier for order tracking.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major payment methods via Razorpay: UPI (PhonePe, Google Pay, Paytm), credit and debit cards (Visa, Mastercard, Rupay), net banking, and EMI options on eligible orders.",
      },
      {
        q: "Is it safe to pay on your website?",
        a: "Absolutely. All payments are processed by Razorpay, which is PCI-DSS Level 1 compliant. Your card details are never stored on our servers. We use HTTPS encryption on every page.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or cancelled within 2 hours of placement by contacting us at contact@mssignaturescents.com. Once the order is dispatched, modifications are not possible.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3–7 business days across India. Express delivery (1–2 days) is available in select cities at ₹199 extra.",
      },
      {
        q: "Is shipping free?",
        a: "Yes! Shipping is free on all orders above ₹999. For orders below ₹999, a flat shipping charge of ₹99 applies.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is dispatched, you will receive an email with your tracking number. You can use this on our Track Order page or directly on the courier's website.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns of unopened products within 7 days of delivery. Opened products are non-returnable unless defective. Please email us at contact@mssignaturescents.com to initiate a return.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 5–7 business days to your original payment method after we receive and inspect the returned product. Store credit refunds are instant.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-3xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Support</p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">
            Frequently Asked Questions
          </h1>
          <div className="gold-separator max-w-[60px] mb-6" />
          <p className="text-text-muted mb-12 leading-relaxed">
            Everything you need to know about our attars, orders, and more. Can&apos;t find your answer?{" "}
            <a href="/contact" className="text-gold hover:underline">Contact us</a>.
          </p>
        </ScrollReveal>

        <div className="space-y-12">
          {faqs.map((category, ci) => (
            <ScrollReveal key={category.category} delay={ci * 0.1}>
              <h2 className="font-heading text-2xl text-text-light mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-gold rounded-full" />
                {category.category}
              </h2>
              <div className="space-y-6 pl-4">
                {category.questions.map((faq, qi) => (
                  <details
                    key={qi}
                    className="group border-b border-border pb-6"
                  >
                    <summary className="flex justify-between items-start cursor-pointer list-none text-text-light text-sm font-medium hover:text-gold transition-colors duration-200 gap-4">
                      <span>{faq.q}</span>
                      <span className="text-gold mt-0.5 shrink-0 transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-text-muted text-sm leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
