// Confirmation email through Resend (resend.com), if RESEND_API_KEY and
// EMAIL_FROM are set. A failed email never undoes a saved signup.
import "server-only";

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendConfirmation(to: string, opts: { city: string | null; inviteLink: string }) {
  if (!emailConfigured()) return false;
  const where = opts.city ? ` in ${opts.city}` : "";
  const text = [
    "You're on the Off Menu list.",
    "",
    `We'll email you when Off Menu opens${where}.`,
    "",
    "Friends who join with your link move you up:",
    opts.inviteLink,
    "",
    "Off Menu. Hand-picked cafés and restaurants.",
    "Not you? Reply to this email and we'll remove you.",
  ].join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.EMAIL_FROM, to, subject: "You’re on the Off Menu list", text }),
      signal: AbortSignal.timeout(6000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
