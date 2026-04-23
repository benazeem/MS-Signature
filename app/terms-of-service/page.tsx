import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Read the terms and conditions governing your use of ${SITE_NAME}'s website and purchase of our attar products.`,
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using the MS Signature Scents website (mssignaturescents.com), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.`,
  },
  {
    title: "Products & Pricing",
    content: `All product descriptions, images, and prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.\n\nPrices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. Prices do not include shipping charges, which are calculated at checkout.`,
  },
  {
    title: "Orders & Payment",
    content: `By placing an order, you represent that you are at least 18 years of age. We reserve the right to refuse or cancel any order at our discretion.\n\nOrders can be placed via registered accounts (using secure Magic Link authentication) or via Guest Checkout. You are responsible for providing accurate shipping and email details.\n\nPayment is processed through Razorpay, a secure payment gateway. By making a payment, you agree to Razorpay's terms and conditions. We do not store payment card information.`,
  },
  {
    title: "Intellectual Property",
    content: `All content on this website — including text, graphics, logos, images, product descriptions, and software — is the exclusive property of MS Signature Scents and is protected by applicable intellectual property laws.\n\nYou may not reproduce, distribute, or use any content from this site without our written permission.`,
  },
  {
    title: "Limitation of Liability",
    content: `MS Signature Scents shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website.\n\nOur total liability for any claim shall not exceed the amount paid by you for the specific product giving rise to the claim.`,
  },
  {
    title: "Governing Law",
    content: `These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.`,
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.`,
  },
  {
    title: "Contact",
    content: `For questions about these terms, contact us at:\n\nlegal@mssignaturescents.com\n\nMS Signature Scents, Mumbai, Maharashtra, India`,
  },
];

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-3xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">Terms of Service</h1>
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
