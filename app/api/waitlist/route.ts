import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/content/copy";
import { allow, clientKey } from "@/lib/rate-limit";
import { saveWaitlist } from "@/lib/store";
import { normalizeEmail, validateWaitlist } from "@/lib/validate";

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
  const result = await saveWaitlist({
    email: input.email,
    email_normalized: normalizeEmail(input.email),
    city: input.city || null,
    source: input.source,
    consent_at: new Date().toISOString(),
    consent_version: CONSENT_VERSION,
  });
  const code = { saved: 201, duplicate: 409, unconfigured: 503, failed: 502 }[result];
  return NextResponse.json({ status: result }, { status: code });
}
