import { getTransporter, EMAIL_FROM, ADMIN_EMAIL } from "./config";
import { getMagicLinkTemplate } from "./templates/magic-link";
import { getOrderInvoiceTemplate } from "./templates/order-invoice";
import { getContactNotificationTemplate } from "./templates/contact-notification";

export async function sendMagicLinkEmail(email: string, actionLink: string) {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: "Sign in to MS Signature Scents",
    html: getMagicLinkTemplate(actionLink),
  });
}

export async function sendOrderConfirmationEmail(
  email: string,
  name: string,
  orderId: string,
  items: Array<{ name: string; size: string; quantity: number; price: number }>,
  total: number
) {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: `Order Confirmed & Invoice — #${orderId.slice(0, 8).toUpperCase()} | MS Signature Scents`,
    html: getOrderInvoiceTemplate(name, orderId, items, total),
  });
}

export async function sendContactNotificationEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: ADMIN_EMAIL,
    subject: `New Inquiry: ${subject} — From ${name}`,
    html: getContactNotificationTemplate(name, email, subject, message),
  });
}
