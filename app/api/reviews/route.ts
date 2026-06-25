import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getAuthSessionFromCookieStore } from "@/lib/auth";

async function getUser() {
  const cookieStore = await cookies();
  return getAuthSessionFromCookieStore(cookieStore);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });

    let canReview = false;
    const user = await getUser();
    if (user?.email) {
      const orders = await prisma.order.findMany({
        where: { userEmail: user.email, status: "delivered" },
      });
      canReview = orders.some((order: { items: unknown }) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const productIdLower = productId.toLowerCase();

        return items.some((item) => {
          if (typeof item !== "object" || item === null) return false;

          const record = item as { id?: unknown; name?: unknown };
          const id = typeof record.id === "string" ? record.id : "";
          const name = typeof record.name === "string" ? record.name.toLowerCase() : "";

          return id === productId || name.includes(productIdLower);
        });
      });
    }

    return NextResponse.json({ reviews, canReview });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, userEmail, userName, rating, comment, images } = body;

    if (!productId || !userEmail || !userName || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userEmail,
        userName,
        rating: Number(rating),
        comment,
        images: images || [],
      },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
