import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Returns & Refund Policy",
  description: `${SITE_NAME}'s hassle-free return and refund policy. Learn about our 7-day return window, conditions, and refund timelines.`,
};

const sections = [
  {
    title: "Return Window",
    content: `We accept returns within 7 days of delivery for unopened, unused products in their original packaging. Due to the nature of perfume products (hygiene and safety), opened bottles are not eligible for return unless the product is defective or damaged.`,
  },
  {
    title: "Eligible Returns",
    content: `✓ Products received in a damaged or defective condition\n✓ Wrong product delivered\n✓ Unopened products in original packaging within 7 days\n\n✗ Opened or used products (unless defective)\n✗ Products without original packaging\n✗ Returns requested after 7 days of delivery`,
  },
  {
    title: "How to Initiate a Return",
    content: `1. Email us at contact@mssignaturescents.com with your order number, reason for return, and photographs (if damaged).\n2. Our team will review and respond within 24–48 hours.\n3. If approved, we will arrange a pickup from your address at no charge.\n4. Once the product is received and inspected, your refund will be processed.`,
  },
  {
    title: "Refund Timeline",
    content: `After we receive and inspect the returned product:\n\n• Original payment method (UPI/Card/Net Banking): 5–7 business days\n• Store credit: Instant\n\nYou will receive an email notification once the refund is processed. Bank processing times may vary.`,
  },
  {
    title: "Exchange Policy",
    content: `We are happy to exchange an unopened product for a different fragrance or size within 7 days of delivery. Exchange requests are subject to product availability. Shipping charges for exchanges are borne by the customer unless the exchange is due to a defective product.`,
  },
  {
    title: "Non-Returnable Items",
    content: `• Limited edition or seasonal releases\n• Gift sets that have been opened\n• Products purchased during final sale events\n• Customized or personalized orders`,
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-3xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Policies</p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">Returns & Refunds</h1>
          <div className="gold-separator max-w-[60px] mb-6" />
          <p className="text-text-muted text-sm mb-12">Last updated: April 2026</p>
        </ScrollReveal>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.05}>
              <div className="border-b border-border pb-10">
                <h2 className="font-heading text-xl text-text-light mb-4">{section.title}</h2>
                <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
