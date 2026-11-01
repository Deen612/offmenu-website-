import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/content/copy";
import { sendConfirmation } from "@/lib/email";
import { allow, clientKey } from "@/lib/rate-limit";
import { saveWaitlist } from "@/lib/store";
import { normalizeEmail, validateWaitlist } from "@/lib/validate";

/** Saves a name and email for the app launch list. */
export async function POST(req: Request) {
  if (!allow(`waitlist:${clientKey(req)}`)) {
    return NextResponse.json({ status: "failed" }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: "invalid", errors: { email: true } }, { status: 400 });
  }
  // Honeypot: real visitors never see or fill this field.
  if ((body as Record<string, unknown>)?.company) {
    return NextResponse.json({ status: "saved" }, { status: 201 });
  }
  const { input, errors } = validateWaitlist(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ status: "invalid", errors }, { status: 400 });
  }
  const referral_code = randomBytes(4).toString("hex");
  const result = await saveWaitlist({
    name: input.name,
    email: input.email,
    email_normalized: normalizeEmail(input.email),
    source: input.source,
    consent_at: new Date().toISOString(),
    consent_version: CONSENT_VERSION,
    referral_code,
    referred_by: input.ref || null,
  });
  if (result === "saved") {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    await sendConfirmation(input.email, { name: input.name, inviteLink: `${origin}/?ref=${referral_code}` });
  }
  const code = { saved: 201, duplicate: 409, unconfigured: 503, failed: 502 }[result];
  return NextResponse.json(result === "saved" ? { status: result, referral_code } : { status: result }, { status: code });
}
