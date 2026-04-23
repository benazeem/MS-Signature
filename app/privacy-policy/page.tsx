import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read ${SITE_NAME}'s privacy policy to understand how we collect, use, and protect your personal data.`,
};

const sections = [
  {
    title: "Information We Collect",
    content: `When you shop with us, we collect the following information:\n\n• Email address (for order confirmation and Magic Link authentication)\n• Name and phone number (for shipping)\n• Delivery address\n• Payment transaction IDs (we do not store full card details — payments are processed by Razorpay)\n• Device and browser information (for analytics and security)`,
  },
  {
    title: "How We Use Your Information",
    content: `• To process and fulfill your orders (including Guest Checkouts)\n• To send order confirmations and tracking updates\n• To verify your identity via secure Magic Links (no passwords stored)\n• To respond to your customer service inquiries\n• To improve our products and services\n• To send promotional offers (only with your consent — you can unsubscribe anytime)`,
  },
  {
    title: "Data Storage & Security",
    content: `Your data is stored securely in our encrypted database (Supabase). We implement industry-standard security measures including:\n\n• HTTPS encryption for all data in transit\n• Bcrypt hashing for any sensitive tokens\n• HttpOnly cookies for session management\n• Regular security audits\n\nWe never sell your personal information to third parties.`,
  },
  {
    title: "Payment Security",
    content: `All payments are processed by Razorpay, a PCI-DSS compliant payment gateway. MS Signature Scents does not store your credit/debit card numbers or UPI details. Your payment information is handled entirely by Razorpay's secure infrastructure.`,
  },
  {
    title: "Cookies",
    content: `We use cookies to:\n• Maintain your session (httpOnly, 7-day expiry)\n• Store cart data locally (localStorage)\n• Collect anonymous analytics via privacy-respecting tools\n\nYou can disable cookies in your browser settings, but this may affect checkout functionality.`,
  },
  {
    title: "Third-Party Services",
    content: `We use the following third-party services:\n• Razorpay — Payment processing\n• Supabase — Database and authentication\n• Brevo (Sendinblue) — Transactional emails\n• Sanity.io — Content management\n\nEach service has its own privacy policy that governs their data handling.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to:\n• Request access to your personal data\n• Request deletion of your data\n• Opt out of marketing communications\n• Lodge a complaint with the relevant data protection authority\n\nTo exercise these rights, email us at privacy@mssignaturescents.com.`,
  },
  {
    title: "Contact",
    content: `If you have any questions about this privacy policy, contact us at:\n\nprivacy@mssignaturescents.com\n\nMS Signature Scents\nMumbai, Maharashtra, India`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-wide max-w-3xl">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl text-text-light mb-4">Privacy Policy</h1>
          <div className="gold-separator max-w-15 mb-6" />
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
