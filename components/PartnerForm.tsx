"use client";

import { useRef, useState } from "react";
import { copy } from "@/content/copy";
import { isEmail, isWebsite } from "@/lib/validate";

type Field = "venue" | "city" | "email" | "kind" | "website";
type Status = "idle" | "sending" | "saved" | "failed" | "unconfigured";

export function PartnerForm({ configured }: { configured: boolean }) {
  const t = copy.partner;
  const w = copy.waitlist;
  const [status, setStatus] = useState<Status>(configured ? "idle" : "unconfigured");
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const inFlight = useRef(false);

  if (status === "saved") {
    return <p className="status" role="status" tabIndex={-1} ref={(el) => el?.focus()}>{t.success}</p>;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Partial<Record<Field, boolean>> = {
      venue: !v("venue"),
      city: !v("city"),
      email: !isEmail(v("email")),
      kind: !v("kind"),
      website: !isWebsite(v("website")),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      (e.currentTarget.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venue: v("venue"),
          city: v("city"),
          email: v("email"),
          kind: v("kind"),
          website: v("website"),
          company: v("company"),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: string };
      if (res.ok && data.status === "saved") setStatus("saved");
      else if (data.status === "unconfigured") setStatus("unconfigured");
      else setStatus("failed");
    } catch {
      setStatus("failed");
    } finally {
      inFlight.current = false;
    }
  }

  const text = (name: Field, label: string, opts: { type?: string; optional?: boolean; auto?: string; err?: string } = {}) => (
    <div className="field">
      <label htmlFor={`p-${name}`}>
        {label} {opts.optional && <span className="opt">{w.optional}</span>}
      </label>
      <input
        id={`p-${name}`}
        name={name}
        type={opts.type ?? "text"}
        className="input"
        autoComplete={opts.auto}
        aria-invalid={errors[name] || undefined}
        aria-describedby={errors[name] ? `p-${name}-err` : undefined}
      />
      {errors[name] && <p className="error" id={`p-${name}-err`}>{opts.err ?? t.required}</p>}
    </div>
  );

  return (
    <form className="form" noValidate onSubmit={submit}>
      <p className="muted">{t.formNote}</p>
      {text("venue", t.venue, { auto: "organization" })}
      {text("city", t.city, { auto: "address-level2" })}
      {text("email", t.email, { type: "email", auto: "email", err: w.emailError })}
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }} aria-describedby={errors.kind ? "p-kind-err" : undefined}>
        <legend style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{t.type}</legend>
        <div className="radio-row">
          <label><input type="radio" name="kind" value="cafe" aria-invalid={errors.kind || undefined} /> {t.cafe}</label>
          <label><input type="radio" name="kind" value="restaurant" /> {t.restaurant}</label>
        </div>
        {errors.kind && <p className="error" id="p-kind-err">{t.required}</p>}
      </fieldset>
      {text("website", t.website, { type: "url", optional: true, auto: "url", err: t.urlError })}
      <div className="hp" aria-hidden="true">
        <label htmlFor="p-company">Company</label>
        <input id="p-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? w.submitting : t.submit}
      </button>
      {status === "failed" && <p className="status bad" role="status">{w.failure}</p>}
      {status === "unconfigured" && (
        <p className="status bad" role="status">Venue registration isn’t available yet. Please check back soon.</p>
      )}
    </form>
  );
}
