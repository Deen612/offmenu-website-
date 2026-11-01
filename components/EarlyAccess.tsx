"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { menu } from "@/content/menu";
import { isEmail } from "@/lib/validate";

type State = "idle" | "sending" | "saved" | "duplicate" | "failed" | "unconfigured";

/** Name and email for the app launch list. Nothing else. */
export const EarlyAccess = forwardRef<HTMLElement, { configured: boolean }>(function EarlyAccess({ configured }, ref) {
  const t = menu.bill;
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; consent?: boolean }>({});
  const [code, setCode] = useState<string | null>(null);
  const [first, setFirst] = useState("");
  const [copied, setCopied] = useState(false);
  const [refCode, setRefCode] = useState("");
  const busy = useRef(false);

  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get("ref");
      if (r && /^[a-z0-9]{6,12}$/.test(r)) setRefCode(r);
    } catch {}
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "");
    const consent = f.get("consent") === "on";
    const next = { name: !name, email: !isEmail(email), consent: !consent };
    setErrors(next);
    if (next.name || next.email || next.consent) {
      e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    busy.current = true;
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, consent, source: "homepage", ref: refCode, company: f.get("company") }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: string; referral_code?: string };
      if (res.ok && data.status === "saved") {
        setFirst(name.split(" ")[0]);
        setCode(data.referral_code ?? null);
        setState("saved");
      } else if (data.status === "duplicate") setState("duplicate");
      else if (data.status === "unconfigured") setState("unconfigured");
      else setState("failed");
    } catch {
      setState(configured ? "failed" : "unconfigured");
    } finally {
      busy.current = false;
    }
  }

  const link = code && typeof window !== "undefined" ? `${window.location.origin}/?ref=${code}` : "";
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      (document.getElementById("invite-link") as HTMLInputElement | null)?.select();
    }
  }

  return (
    <section className="section apply" id="apply" ref={ref} aria-labelledby="bill-h">
      <div className="container apply-grid">
        <div className="apply-intro">
          <h2 className="h2" id="bill-h">{t.title}</h2>
          <p className="lede">{t.note}</p>
          <ul className="apply-why">
            <li>Members-only deals at places on the list</li>
            <li>Rewards for the places you keep going back to</li>
            <li>Your list, ranked for your taste, ready on day one</li>
          </ul>
        </div>

        <div className="slip apply-card">
          {state === "saved" ? (
            <div className="slip-body done" role="status">
              <p className="slip-q" tabIndex={-1} ref={(el) => el?.focus()}>You’re on the list{first ? `, ${first}` : ""}.</p>
              <p>We’ll email you the download link when the app launches.</p>
              {code && (
                <div className="invite">
                  <p className="slip-label">Friends who join with your link move you up the list</p>
                  <div className="invite-row">
                    <input id="invite-link" className="slip-input mono" readOnly value={link} aria-label="Your invite link" />
                    <button type="button" className="menu-btn-solid" onClick={copyLink}>{copied ? "Copied" : "Copy"}</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="slip-body">
              <label className="slip-label" htmlFor="bill-name">Name</label>
              <input
                id="bill-name"
                name="name"
                className="slip-input"
                autoComplete="name"
                maxLength={80}
                aria-invalid={errors.name || undefined}
                aria-describedby={errors.name ? "bill-name-err" : undefined}
              />
              {errors.name && <p className="slip-err" id="bill-name-err">Add your name.</p>}
              <label className="slip-label" htmlFor="bill-email">Email</label>
              <input
                id="bill-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="slip-input"
                placeholder="name@example.com"
                aria-invalid={errors.email || undefined}
                aria-describedby={errors.email ? "bill-email-err" : undefined}
              />
              {errors.email && <p className="slip-err" id="bill-email-err">That email doesn’t look right.</p>}
              <div className="hp" aria-hidden="true">
                <label htmlFor="bill-company">Company</label>
                <input id="bill-company" name="company" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="slip-check">
                <input type="checkbox" name="consent" aria-invalid={errors.consent || undefined} aria-describedby={errors.consent ? "bill-consent-err" : undefined} />
                <span>Email me when the Off Menu app launches. Unsubscribe any time.</span>
              </label>
              {errors.consent && <p className="slip-err" id="bill-consent-err">Tick the box so we can email you at launch.</p>}
              <button className="menu-btn-solid" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Saving…" : "Get early access"}
              </button>
              {state === "duplicate" && <p className="slip-msg" role="status">You’re already on the list.</p>}
              {state === "failed" && <p className="slip-err" role="status">Didn’t save. Check your connection and try again.</p>}
              {state === "unconfigured" && <p className="slip-msg" role="status">Demo only. Nothing is saved here.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
});
