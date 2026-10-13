import { NextResponse } from "next/server";
import { allow, clientKey } from "@/lib/rate-limit";
import { savePartner } from "@/lib/store";
import { validatePartner } from "@/lib/validate";

export async function POST(req: Request) {
  if (!allow(`partner:${clientKey(req)}`, 3)) {
    return NextResponse.json({ status: "failed" }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: "invalid", errors: {} }, { status: 400 });
  }
  if ((body as Record<string, unknown>)?.company) {
    return NextResponse.json({ status: "saved" }, { status: 201 });
  }
  const { input, errors } = validatePartner(body);
  if (Object.keys(errors).length || !input.kind) {
    return NextResponse.json({ status: "invalid", errors }, { status: 400 });
  }
  const result = await savePartner({
    venue_name: input.venue,
    city: input.city,
    contact_email: input.email,
    venue_type: input.kind,
    website: input.website || null,
  });
  const code = { saved: 201, duplicate: 201, unconfigured: 503, failed: 502 }[result];
  return NextResponse.json({ status: result === "duplicate" ? "saved" : result }, { status: code });
}
