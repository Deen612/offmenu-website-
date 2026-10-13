"use client";

import { forwardRef, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { isEmail } from "@/lib/validate";

type Status = "idle" | "sending" | "saved" | "duplicate" | "failed" | "unconfigured";

export const Signup = forwardRef<HTMLInputElement, { configured: boolean }>(function Signup({ configured }, emailRef) {
  const t = copy.waitlist;
  const [status, setStatus] = useState<Status>(configured ? "idle" : "unconfigured");
  const [errors, setErrors] = useState<{ email?: boolean; consent?: boolean }>({});
  const inFlight = useRef(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const consent = form.get("consent") === "on";
    const next = { email: !isEmail(email), consent: !consent };
    setErrors(next);
    if (next.email || next.consent) {
      (e.currentTarget.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          city: form.get("city"),
          consent,
          source: "homepage",
          company: form.get("company"),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: Status; errors?: typeof errors };
      if (data.status === "invalid" as Status) {
        setErrors(data.errors ?? {});
        setStatus("idle");
      } else if (data.status === "saved" && res.ok) setStatus("saved");
      else if (data.status === "duplicate") setStatus("duplicate");
      else if (data.status === "unconfigured") setStatus("unconfigured");
      else setStatus("failed");
    } catch {
      setStatus("failed");
    } finally {
      inFlight.current = false;
    }
  }

  const message =
    status === "saved" ? t.success
    : status === "duplicate" ? t.duplicate
    : status === "failed" ? t.failure
    : status === "unconfigured" ? t.unconfigured
    : null;

  return (
    <section className="section" id="waitlist" aria-labelledby="waitlist-h">
      <div className="container signup">
        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <p className="eyebrow">Waitlist</p>
          <h2 className="h2" id="waitlist-h">{t.h2}</h2>
          <p className="muted">{t.body}</p>
        </div>
        {status === "saved" ? (
          <p className="status" role="status" tabIndex={-1} ref={(el) => el?.focus()}>{message}</p>
        ) : (
          <form className="form" noValidate onSubmit={submit}>
            <div className="field">
              <label htmlFor="wl-email">{t.email}</label>
              <input
                ref={emailRef}
                id="wl-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className="input"
                aria-invalid={errors.email || undefined}
                aria-describedby={errors.email ? "wl-email-err" : undefined}
                required
              />
              {errors.email && <p className="error" id="wl-email-err">{t.emailError}</p>}
            </div>
            <div className="field">
              <label htmlFor="wl-city">
                {t.city} <span className="opt">{t.optional}</span>
              </label>
              <input id="wl-city" name="city" className="input" autoComplete="address-level2" maxLength={80} />
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="wl-company">Company</label>
              <input id="wl-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="field">
              <label className="check">
                <input
                  type="checkbox"
                  name="consent"
                  aria-invalid={errors.consent || undefined}
                  aria-describedby={errors.consent ? "wl-consent-err" : undefined}
                />
                <span>{t.consent}</span>
              </label>
              {errors.consent && <p className="error" id="wl-consent-err">{t.consentError}</p>}
            </div>
            <button className="btn btn-primary" type="submit" disabled={status === "sending"} aria-disabled={status === "unconfigured" || undefined}>
              {status === "sending" ? t.submitting : t.submit}
            </button>
            {message && (
              <p className={`status ${status === "duplicate" ? "" : "bad"}`} role="status">{message}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
});
