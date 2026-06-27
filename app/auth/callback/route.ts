// This callback route is no longer used.
// OAuth callbacks are handled automatically by the @neondatabase/auth proxy
// at app/api/auth/[...all]/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5000"));
}
