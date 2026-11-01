import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/content/copy";
import { isQuizAnswers, personaFor } from "@/content/quiz";
import { sendConfirmation } from "@/lib/email";
import { allow, clientKey } from "@/lib/rate-limit";
import { saveWaitlist, updateTaste } from "@/lib/store";
import { normalizeEmail, validateWaitlist } from "@/lib/validate";

const token = (bytes: number) => randomBytes(bytes).toString("hex");

/** Step 1: save the email straight away, before any quiz questions. */
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
  const referral_code = token(4);
  const edit_token = token(16);
  const result = await saveWaitlist({
    email: input.email,
    email_normalized: normalizeEmail(input.email),
    city: input.city || null,
    source: input.source,
    consent_at: new Date().toISOString(),
    consent_version: CONSENT_VERSION,
    taste: input.taste,
    persona: input.taste ? personaFor(input.taste) : null,
    referral_code,
    referred_by: input.ref || null,
    edit_token,
  });
  if (result === "saved") {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    await sendConfirmation(input.email, { city: input.city || null, inviteLink: `${origin}/?ref=${referral_code}` });
  }
  const code = { saved: 201, duplicate: 409, unconfigured: 503, failed: 502 }[result];
  return NextResponse.json(result === "saved" ? { status: result, referral_code, edit_token } : { status: result }, { status: code });
}

/** Step 2: add the four quiz answers to the signup made in step 1. */
export async function PATCH(req: Request) {
  if (!allow(`waitlist-taste:${clientKey(req)}`, 10)) {
    return NextResponse.json({ status: "failed" }, { status: 429 });
  }
  const body = (await req.json().catch(() => ({}))) as { edit_token?: unknown; taste?: unknown };
  if (typeof body.edit_token !== "string" || !/^[a-f0-9]{32}$/.test(body.edit_token) || !isQuizAnswers(body.taste)) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }
  const persona = personaFor(body.taste);
  const result = await updateTaste(body.edit_token, body.taste, persona);
  const code = { saved: 200, missing: 404, failed: 502, unconfigured: 503 }[result];
  return NextResponse.json({ status: result, persona }, { status: code });
}
