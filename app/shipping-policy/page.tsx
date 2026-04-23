import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: `Learn about ${SITE_NAME}'s shipping process, delivery timelines, and carrier information for attar orders across India.`,
};

const sections = [
  {
    title: "Processing Time",
    content: `All orders are processed within 1–2 business days (Monday–Saturday). Orders placed on Sundays or public holidays will be processed the next working day. You will receive an email confirmation with tracking details once your order is dispatched.`,
  },
  {
    title: "Delivery Timelines",
    content: `Standard Delivery: 3–7 business days across India.\n\nExpress Delivery: 1–2 business days (available in select pin codes at additional cost).\n\nRemote/Hilly Areas: 7–12 business days due to logistical constraints.`,
  },
  {
    title: "Shipping Charges",
    content: `Free Shipping: On all orders above ₹999.\n\nStandard Shipping: ₹99 for orders below ₹999.\n\nExpress Shipping: ₹199 (where applicable).\n\nAll shipments are fully insured against loss or damage during transit.`,
  },
  {
    title: "Packaging",
    content: `Every MS Signature Scents product is carefully packed in our signature gift-ready packaging. Attar bottles are wrapped in protective foam inserts and sealed to prevent leakage during transit. We use eco-conscious packaging materials wherever possible.`,
  },
  {
    title: "Order Tracking",
    content: `Once dispatched, you will receive an email with your tracking number and carrier information. You can use this to track your order in real-time on our Track Order page or the carrier's website.`,
  },
  {
    title: "International Shipping",
    content: `Currently, we ship within India only. International shipping is coming soon. If you are based outside India and wish to place a large order, please contact us at contact@mssignaturescents.com for assistance.`,
  },
  {
    title: "Damaged or Lost Shipments",
    content: `In the rare event your order arrives damaged, please take photographs and contact us within 48 hours of delivery at contact@mssignaturescents.com. We will arrange a replacement at no extra cost.\n\nFor lost shipments, please allow 3 extra business days beyond the estimated delivery date before reporting. We will investigate and resolve the issue promptly.`,
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-3xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Policies</p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">Shipping Policy</h1>
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
