import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import { CartItem } from "@/types/cart.types";

const JWT_SECRET = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

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

export async function GET(req: NextRequest) {
  const email = await getEmailFromRequest(req);
  if (!email) return NextResponse.json({ items: [] });

  const cart = await prisma.cart.findUnique({ where: { userEmail: email } });
  return NextResponse.json({ items: cart?.items ?? [] });
}

export async function POST(req: NextRequest) {
  const email = await getEmailFromRequest(req);
  if (!email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = (await req.json()) as { items: CartItem[] };

  await prisma.cart.upsert({
    where: { userEmail: email },
    update: { items: items as object[] },
    create: { userEmail: email, items: items as object[] },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const email = await getEmailFromRequest(req);
  if (!email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.cart.delete({ where: { userEmail: email } }).catch(() => null);
  return NextResponse.json({ success: true });
}
