// Single-password admin for the waitlist. Set ADMIN_PASSWORD in the
// deployment's environment; without it, /admin stays locked for everyone.
import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "om_admin";

function expected(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 10) return null;
  return createHmac("sha256", pw).update("off-menu-admin-v1").digest("hex");
}

export function passwordMatches(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 10) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function sessionValue(): string | null {
  return expected();
}

export async function isAdmin(): Promise<boolean> {
  const want = expected();
  if (!want) return false;
  const got = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  return got.length === want.length && timingSafeEqual(Buffer.from(got), Buffer.from(want));
}
