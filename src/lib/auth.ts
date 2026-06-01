import { cookies } from "next/headers";

const SESSION_COOKIE = "okhome_session";

const PASSWORD = process.env.DASHBOARD_PASSWORD ?? "";

const encoder = new TextEncoder();

function getSecret(): string {
  return process.env.SESSION_SECRET ?? "";
}

async function hmacHex(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time string comparison (equal length assumed from HMAC output). */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function expectedToken(): Promise<string> {
  return hmacHex("okhome-dashboard-v1");
}

export function checkPassword(input: string): boolean {
  if (!PASSWORD) return false;
  return timingSafeEqual(input, PASSWORD);
}

export async function createSession(): Promise<void> {
  const token = await expectedToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const expected = await expectedToken();
  return timingSafeEqual(token, expected);
}
