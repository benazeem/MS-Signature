import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    const addresses = await prisma.shippingAddress.findMany({
      where: { userEmail: email },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ addresses });
  } catch {
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, address, city, state, pincode, isDefault } = body;

    if (!email || !name || !phone || !address || !city || !state || !pincode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (isDefault) {
      await prisma.shippingAddress.updateMany({
        where: { userEmail: email },
        data: { isDefault: false },
      });
    }

    const newAddress = await prisma.shippingAddress.create({
      data: {
        userEmail: email,
        name,
        phone,
        address,
        city,
        state,
        pincode,
        isDefault: isDefault || false,
      },
    });

    return NextResponse.json({ address: newAddress }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create address" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, id, isDefault, name, phone, address, city, state, pincode } = body;

    if (!email || !id) {
      return NextResponse.json({ error: "Missing email or address ID" }, { status: 400 });
    }

    const existing = await prisma.shippingAddress.findUnique({ where: { id } });
    if (!existing || existing.userEmail !== email) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (isDefault) {
      await prisma.shippingAddress.updateMany({
        where: { userEmail: email },
        data: { isDefault: false },
      });
    }

    await prisma.shippingAddress.update({
      where: { id },
      data: {
        isDefault: Boolean(isDefault),
        ...(typeof name === "string" ? { name } : {}),
        ...(typeof phone === "string" ? { phone } : {}),
        ...(typeof address === "string" ? { address } : {}),
        ...(typeof city === "string" ? { city } : {}),
        ...(typeof state === "string" ? { state } : {}),
        ...(typeof pincode === "string" ? { pincode } : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update address" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (!id || !email) {
      return NextResponse.json({ error: "Missing id or email" }, { status: 400 });
    }

    const existing = await prisma.shippingAddress.findUnique({ where: { id } });
    if (!existing || existing.userEmail !== email) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.shippingAddress.delete({ where: { id } });

    if (existing.isDefault) {
      const next = await prisma.shippingAddress.findFirst({
        where: { userEmail: email },
        orderBy: { createdAt: "desc" },
      });
      if (next) {
        await prisma.shippingAddress.update({
          where: { id: next.id },
          data: { isDefault: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete address" }, { status: 500 });
  }
}
