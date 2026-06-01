import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "okhome_session";

const SECRET = process.env.SESSION_SECRET ?? "";
const PASSWORD = process.env.DASHBOARD_PASSWORD ?? "";

/** Deterministic signed token. Knowing it requires knowing SESSION_SECRET. */
function expectedToken(): string {
  return createHmac("sha256", SECRET)
    .update("okhome-dashboard-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(input: string): boolean {
  if (!PASSWORD) return false;
  return safeEqual(input, PASSWORD);
}

/** Set the session cookie. Call only from a Server Action or Route Handler. */
export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** Read the session cookie and verify it. Safe in Server Components. */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, expectedToken());
}
