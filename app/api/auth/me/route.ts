import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("ms_guest_session")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return NextResponse.json({
      user: { email: payload.email as string, type: "guest" },
    });
  } catch {
    const response = NextResponse.json({ user: null });
    response.cookies.delete("ms_guest_session");
    return response;
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("ms_guest_session");
  return response;
}
