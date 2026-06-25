import { NextRequest, NextResponse } from "next/server";
import { createNeonAuth } from "@neondatabase/auth/next/server";

const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const { data: session, error } = await auth.getSession();
    if (error || !session?.user) {
      return NextResponse.json({ user: null });
    }

    const user = {
      id: session.user.id,
      email: session.user.email,
      type: "user" as const,
      user_metadata: {
        full_name: session.user.name ?? undefined,
      },
    };

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function DELETE() {
  try {
    await auth.signOut();
  } catch {
    // ignore
  }
  return NextResponse.json({ success: true });
}
