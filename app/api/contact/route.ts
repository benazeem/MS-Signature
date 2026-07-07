import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendContactNotificationEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim() : "";
    const normalizedSubject =
      typeof subject === "string" && subject.trim().length > 0
        ? subject.trim()
        : "General Inquiry";
    const normalizedMessage =
      typeof message === "string" ? message.trim() : "";

    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    try {
      await prisma.contactSubmission.create({
        data: {
          name: normalizedName,
          email: normalizedEmail,
          subject: normalizedSubject,
          message: normalizedMessage,
        },
      });
    } catch (dbError) {
      console.error("Contact submission persistence failed:", dbError);
    }

    try {
      await sendContactNotificationEmail(
        normalizedName,
        normalizedEmail,
        normalizedSubject,
        normalizedMessage,
      );
    } catch (emailError) {
      console.error("Contact email delivery failed:", emailError);
      return NextResponse.json(
        {
          error:
            "We could not deliver your message right now. Please try again later or contact us on WhatsApp.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
