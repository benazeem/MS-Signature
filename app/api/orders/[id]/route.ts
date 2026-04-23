import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { client } from "@/sanity/lib/client";
import { OrderItem } from "@/types/order.types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let enrichedItems: OrderItem[] = [];
    if (Array.isArray(order.items)) {
      const items = order.items as unknown as OrderItem[];
      const itemIds = items.map((item) => item.id).filter(Boolean);
      let sanityProducts: Array<{ _id: string; slug: string; image: string }> =
        [];

      try {
        if (itemIds.length > 0) {
          sanityProducts = await client.fetch(
            `*[_type == "product" && _id in $ids] {
              _id,
              "slug": slug.current,
              "image": image.asset->url
            }`,
            { ids: itemIds },
          );
        }

        enrichedItems = items.map((item) => {
          const sanityProduct = sanityProducts.find((p) => p._id === item.id);
          return {
            ...item,
            slug: sanityProduct?.slug || item.slug || "",
            image: sanityProduct?.image || item.image || "",
          };
        });
      } catch (sanityError) {
        console.error("Sanity enrichment error:", sanityError);
        // Fallback to non-enriched items so the order is still viewable
        enrichedItems = items;
      }
    }

    return NextResponse.json({ order: { ...order, items: enrichedItems } });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
