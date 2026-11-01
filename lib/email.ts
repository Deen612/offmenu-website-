// Confirmation email through Resend (resend.com), if RESEND_API_KEY and
// EMAIL_FROM are set. A failed email never undoes a saved signup.
import "server-only";

// Off by default: the plan is one email at launch, sent from the admin CSV.
// Set SEND_SIGNUP_EMAIL=true to also send a short "you're on the list" note.
export function emailConfigured() {
  return Boolean(process.env.SEND_SIGNUP_EMAIL === "true" && process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendConfirmation(to: string, opts: { name: string; inviteLink: string }) {
  if (!emailConfigured()) return false;
  const text = [
    `Hi ${opts.name.split(" ")[0]},`,
    "",
    "You're on the Off Menu list.",
    "",
    "We'll email you the download link when the Off Menu app launches.",
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
