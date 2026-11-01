import { isAdmin } from "@/lib/admin";
import { listRows } from "@/lib/store";

const COLUMNS = {
  waitlist: ["created_at", "name", "email", "source", "referral_code", "referred_by", "consent_at", "consent_version"],
  venues: ["created_at", "venue_name", "venue_type", "city", "contact_email", "website"],
} as const;

const cell = (v: unknown) => {
  const s = v == null ? "" : String(v);
  // Quote everything; neutralise spreadsheet formulas.
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};

export async function GET(req: Request) {
  if (!(await isAdmin())) return new Response("Not signed in", { status: 401 });
  const which = new URL(req.url).searchParams.get("table") === "venues" ? "venues" : "waitlist";
  const rows = await listRows(which === "venues" ? "partner_interest" : "waitlist_signups");
  if (!rows) return new Response("Store not configured or unreachable", { status: 503 });
  const cols = COLUMNS[which];
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="off-menu-${which}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
