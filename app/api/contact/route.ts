import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendContactNotificationEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await prisma.contactSubmission.create({
      data: { name, email, subject, message },
    });

    await sendContactNotificationEmail(name, email, subject, message);

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
