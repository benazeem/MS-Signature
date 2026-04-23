import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { jwtVerify } from "jose";
import { sendOrderConfirmationEmail } from "@/lib/mail";

const JWT_SECRET = new TextEncoder().encode(
  process.env.SUPABASE_JWT_SECRET ?? "ms-signature-scents-guest-secret-2024",
);

async function getEmailFromRequest(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("ms_guest_session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.email as string;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      total,
      shippingAddress,
      customerName,
      customerEmail,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    let signatureMatches = true;

    if (process.env.RAZORPAY_KEY_SECRET) {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
      if (expectedSignature !== razorpay_signature) {
        signatureMatches = false;
      }
    } else {
      console.warn(
        "RAZORPAY_KEY_SECRET is missing. Bypassing signature verification in development.",
      );
    }

    if (!signatureMatches && process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "Payment verification failed due to invalid signature" },
        { status: 400 },
      );
    }

    const sessionEmail = await getEmailFromRequest(req);
    const email = sessionEmail || customerEmail;

    if (!email) {
      return NextResponse.json({ error: "No email provided" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userEmail: email,
        customerName,
        items,
        total,
        shippingAddress,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: "confirmed",
      },
    });

    await prisma.cart.delete({ where: { userEmail: email } }).catch(() => null);

    try {
      await sendOrderConfirmationEmail(
        email,
        customerName,
        order.id,
        items,
        total,
      );
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    try {
      if (shippingAddress) {
        const existingAddress = await prisma.shippingAddress.findFirst({
          where: {
            userEmail: email,
            address: shippingAddress.address,
            pincode: shippingAddress.pincode,
          },
        });

        if (!existingAddress) {
          const addressCount = await prisma.shippingAddress.count({
            where: { userEmail: email },
          });

          await prisma.shippingAddress.create({
            data: {
              userEmail: email,
              name: shippingAddress.name || customerName || "",
              phone: shippingAddress.phone || "",
              address: shippingAddress.address || "",
              city: shippingAddress.city || "",
              state: shippingAddress.state || "",
              pincode: shippingAddress.pincode || "",
              isDefault: addressCount === 0,
            },
          });
        }
      }
    } catch (addressErr) {
      console.error("Failed to save shipping address:", addressErr);
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error("Payment verify error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
