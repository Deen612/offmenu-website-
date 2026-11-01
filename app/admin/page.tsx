import type { Metadata } from "next";
import { PERSONAS, type PersonaKey } from "@/content/quiz";
import { isAdmin } from "@/lib/admin";
import { emailConfigured } from "@/lib/email";
import { listRows, storeConfigured } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Off Menu admin", robots: { index: false, follow: false } };

type Row = Record<string, unknown>;

function tally(rows: Row[], key: string) {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = String(r[key] ?? "").trim() || "(none)";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

export default async function Admin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  if (!(await isAdmin())) {
    return (
      <main className="admin">
        <h1 className="admin-h">Off Menu admin</h1>
        {!process.env.ADMIN_PASSWORD && <p className="admin-warn">Set ADMIN_PASSWORD (10+ characters) in the environment to enable this page.</p>}
        <form method="post" action="/api/admin/login" className="admin-login">
          <label htmlFor="pw">Password</label>
          <input id="pw" name="password" type="password" autoComplete="current-password" required />
          <button type="submit">Sign in</button>
          {error && <p className="admin-warn">Wrong password.</p>}
        </form>
      </main>
    );
  }

  const [signups, venues] = await Promise.all([listRows("waitlist_signups"), listRows("partner_interest")]);
  const rows = signups ?? [];
  const referrals = new Map<string, number>();
  for (const r of rows) if (r.referred_by) referrals.set(String(r.referred_by), (referrals.get(String(r.referred_by)) ?? 0) + 1);
  const top = rows
    .map((r) => ({ email: String(r.email), city: String(r.city ?? ""), n: referrals.get(String(r.referral_code)) ?? 0 }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 20);
  const quizDone = rows.filter((r) => r.persona).length;
  const today = rows.filter((r) => String(r.created_at ?? "").slice(0, 10) === new Date().toISOString().slice(0, 10)).length;

  return (
    <main className="admin">
      <div className="admin-top">
        <h1 className="admin-h">Off Menu admin</h1>
        <form method="post" action="/api/admin/logout"><button type="submit">Sign out</button></form>
      </div>

      {!storeConfigured() && <p className="admin-warn">No store configured. Set SIGNUP_STORE=supabase and the two SUPABASE_ keys.</p>}
      {signups === null && storeConfigured() && <p className="admin-warn">Couldn’t reach the database.</p>}
      {!emailConfigured() && <p className="admin-note">Confirmation emails are off. Set RESEND_API_KEY and EMAIL_FROM to turn them on.</p>}

      <section className="admin-stats">
        <div><b>{rows.length}</b><span>emails</span></div>
        <div><b>{today}</b><span>today</span></div>
        <div><b>{quizDone}</b><span>finished the quiz</span></div>
        <div><b>{venues?.length ?? 0}</b><span>venues</span></div>
      </section>

      <p className="admin-actions">
        <a href="/api/admin/export?table=waitlist">Download all emails (CSV)</a>
        <a href="/api/admin/export?table=venues">Download venues (CSV)</a>
      </p>

      <div className="admin-grid">
        <section>
          <h2>By city</h2>
          <table><tbody>{tally(rows, "city").map(([k, n]) => <tr key={k}><td>{k}</td><td>{n}</td></tr>)}</tbody></table>
        </section>
        <section>
          <h2>By persona</h2>
          <table><tbody>{tally(rows, "persona").map(([k, n]) => <tr key={k}><td>{PERSONAS[k as PersonaKey]?.name ?? k}</td><td>{n}</td></tr>)}</tbody></table>
        </section>
        <section>
          <h2>Top referrers</h2>
          {top.length ? (
            <table><tbody>{top.map((t) => <tr key={t.email}><td>{t.email}</td><td>{t.city}</td><td>{t.n}</td></tr>)}</tbody></table>
          ) : <p>No referrals yet.</p>}
        </section>
      </div>

      <section>
        <h2>Latest signups</h2>
        <table className="admin-table">
          <thead><tr><th>When</th><th>Email</th><th>City</th><th>Persona</th><th>Referred by</th></tr></thead>
          <tbody>
            {rows.slice(0, 200).map((r) => (
              <tr key={String(r.email_normalized ?? r.email)}>
                <td>{String(r.created_at ?? "").slice(0, 16).replace("T", " ")}</td>
                <td>{String(r.email)}</td>
                <td>{String(r.city ?? "")}</td>
                <td>{r.persona ? PERSONAS[r.persona as PersonaKey]?.name : ""}</td>
                <td>{String(r.referred_by ?? "")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
