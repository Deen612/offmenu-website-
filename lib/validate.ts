// Validation shared by the browser forms and the API routes, so the server
// never trusts what the client already checked.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isEmail(raw: string): boolean {
  const email = raw.trim();
  return email.length <= 254 && EMAIL.test(email);
}

export function cleanText(raw: unknown, max: number): string {
  return typeof raw === "string" ? raw.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export function isWebsite(raw: string): boolean {
  if (!raw) return true;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export type WaitlistInput = { email: string; city: string; consent: boolean; source: string };
export type WaitlistErrors = Partial<Record<"email" | "consent", true>>;

export function validateWaitlist(body: unknown): { input: WaitlistInput; errors: WaitlistErrors } {
  const b = (body ?? {}) as Record<string, unknown>;
  const input: WaitlistInput = {
    email: cleanText(b.email, 254),
    city: cleanText(b.city, 80),
    consent: b.consent === true,
    source: cleanText(b.source, 40) || "homepage",
  };
  const errors: WaitlistErrors = {};
  if (!isEmail(input.email)) errors.email = true;
  if (!input.consent) errors.consent = true;
  return { input, errors };
}

export type PartnerInput = {
  venue: string;
  city: string;
  email: string;
  kind: "cafe" | "restaurant" | "";
  website: string;
};
export type PartnerErrors = Partial<Record<keyof PartnerInput, true>>;

export function validatePartner(body: unknown): { input: PartnerInput; errors: PartnerErrors } {
  const b = (body ?? {}) as Record<string, unknown>;
  const kind = b.kind === "cafe" || b.kind === "restaurant" ? b.kind : "";
  const input: PartnerInput = {
    venue: cleanText(b.venue, 120),
    city: cleanText(b.city, 80),
    email: cleanText(b.email, 254),
    kind,
    website: cleanText(b.website, 300),
  };
  const errors: PartnerErrors = {};
  if (!input.venue) errors.venue = true;
  if (!input.city) errors.city = true;
  if (!isEmail(input.email)) errors.email = true;
  if (!input.kind) errors.kind = true;
  if (!isWebsite(input.website)) errors.website = true;
  return { input, errors };
}
