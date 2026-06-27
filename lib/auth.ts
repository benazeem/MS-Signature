import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import type { NextRequest } from "next/server";

export const AUTH_COOKIE_NAME = "ms_auth_session";
export const LEGACY_AUTH_COOKIE_NAME = "ms_guest_session";

export interface AuthSessionUser {
  id?: string;
  email: string;
  type: "user";
  user_metadata: {
    full_name?: string;
  };
}

type CookieStore = {
  get: (name: string) => { value?: string } | undefined;
};

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function getNeonAuthBaseUrl() {
  return process.env.NEON_AUTH_BASE_URL ?? process.env.NEXT_PUBLIC_NEON_AUTH_URL;
}

function getNeonAuthJwksUrl() {
  const explicitUrl = process.env.NEON_AUTH_JWKS_URL;
  if (explicitUrl) return explicitUrl;

  const baseUrl = getNeonAuthBaseUrl();
  if (!baseUrl) return null;

  return `${baseUrl.replace(/\/$/, "")}/.well-known/jwks.json`;
}

function getNeonIssuer() {
  const baseUrl = getNeonAuthBaseUrl();
  if (!baseUrl) return undefined;

  const url = new URL(baseUrl);
  return url.origin;
}

function getJwks() {
  const jwksUrl = getNeonAuthJwksUrl();
  if (!jwksUrl) {
    throw new Error("NEON_AUTH_JWKS_URL or NEON_AUTH_BASE_URL is missing");
  }

  jwks ??= createRemoteJWKSet(new URL(jwksUrl));
  return jwks;
}

function normalizeName(payload: JWTPayload) {
  return typeof payload.name === "string" && payload.name.trim()
    ? payload.name.trim()
    : undefined;
}

function normalizeEmail(email: unknown) {
  return typeof email === "string" && email.includes("@")
    ? email.trim().toLowerCase()
    : null;
}

function toUser(payload: JWTPayload): AuthSessionUser | null {
  const email = normalizeEmail(payload.email);
  if (!email) return null;

  return {
    id: typeof payload.sub === "string" ? payload.sub : undefined,
    email,
    type: "user",
    user_metadata: normalizeName(payload)
      ? { full_name: normalizeName(payload) }
      : {},
  };
}

function getBearerToken(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim();
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: 60 * 15,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export function getNeonSignInUrl(origin: string) {
  const baseUrl = getNeonAuthBaseUrl();
  if (!baseUrl) {
    throw new Error("NEON_AUTH_BASE_URL is missing");
  }

  const url = new URL(baseUrl);
  const callbackUrl = `${origin}/auth/callback`;

  url.searchParams.set("callbackURL", callbackUrl);
  url.searchParams.set("redirect_uri", callbackUrl);
  url.searchParams.set("return_to", callbackUrl);

  return url;
}

export async function verifyAuthToken(token?: string | null) {
  if (!token) return null;

  const issuer = getNeonIssuer();
  const { payload } = await jwtVerify(token, getJwks(), {
    ...(issuer ? { issuer } : {}),
  });

  return toUser(payload);
}

export async function getAuthSessionFromRequest(req: NextRequest) {
  const token =
    getBearerToken(req) ??
    req.cookies.get(AUTH_COOKIE_NAME)?.value ??
    req.cookies.get(LEGACY_AUTH_COOKIE_NAME)?.value;

  try {
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}

export async function getAuthSessionFromCookieStore(cookieStore: CookieStore) {
  const token =
    cookieStore.get(AUTH_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_AUTH_COOKIE_NAME)?.value;

  try {
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}
