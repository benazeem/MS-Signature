import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSessionFromRequest } from "@/lib/auth";
import { CartItem } from "@/types/cart.types";

async function getEmailFromRequest(req: NextRequest): Promise<string | null> {
  const user = await getAuthSessionFromRequest(req);
  return user?.email ?? null;
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
