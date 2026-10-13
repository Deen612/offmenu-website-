"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { PERSONAS, personaFor, questions, type Priority, type QuizAnswers } from "@/content/quiz";
import { isEmail } from "@/lib/validate";

type Status = "idle" | "sending" | "duplicate" | "failed" | "unconfigured";
type Answers = Partial<{
  q1_energy: QuizAnswers["q1_energy"];
  q2_priorities: Priority[];
  q3_novelty: QuizAnswers["q3_novelty"];
  q4_dealbreaker: QuizAnswers["q4_dealbreaker"];
}>;

// Steps: 0 city · 1–4 questions · 5 persona · 6 email · 7 done
const TOTAL = 6;

export const Apply = forwardRef<HTMLElement, { configured: boolean }>(function Apply({ configured }, ref) {
  const t = copy.apply;
  const [step, setStep] = useState(0);
  const [city, setCity] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [status, setStatus] = useState<Status>(configured ? "idle" : "unconfigured");
  const [errors, setErrors] = useState<{ email?: boolean; consent?: boolean }>({});
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [refCode, setRefCode] = useState("");
  const inFlight = useRef(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get("ref");
      if (r && /^[a-z0-9]{6,12}$/.test(r)) setRefCode(r);
    } catch {}
  }, []);

  // Move focus to each new step's heading so keyboard and screen-reader users follow along.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    panel.current?.querySelector<HTMLElement>("[data-step-focus]")?.focus();
  }, [step]);

  const q = step >= 1 && step <= 4 ? questions[step - 1] : null;
  const complete = (a: Answers): a is QuizAnswers =>
    !!a.q1_energy && a.q2_priorities?.length === 2 && !!a.q3_novelty && !!a.q4_dealbreaker;
  const persona = complete(answers) ? PERSONAS[personaFor(answers)] : null;

  function choose(qid: string, id: string, multi: boolean) {
    if (multi) {
      const cur = (answers.q2_priorities ?? []) as Priority[];
      const has = cur.includes(id as Priority);
      const next = has ? cur.filter((x) => x !== id) : cur.length < 2 ? [...cur, id as Priority] : [cur[1], id as Priority];
      setAnswers({ ...answers, q2_priorities: next });
      return;
    }
    setAnswers({ ...answers, [qid]: id });
    setTimeout(() => setStep((s) => s + 1), 180);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const consent = form.get("consent") === "on";
    const next = { email: !isEmail(email), consent: !consent };
    setErrors(next);
    if (next.email || next.consent) {
      e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city, consent, source: "apply", taste: answers, ref: refCode, company: form.get("company") }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: string; referral_code?: string; errors?: typeof errors };
      if (data.status === "saved" && res.ok) {
        setCode(data.referral_code ?? null);
        setStatus("idle");
        setStep(7);
      } else if (data.status === "invalid") {
        setErrors(data.errors ?? {});
        setStatus("idle");
      } else if (data.status === "duplicate") setStatus("duplicate");
      else if (data.status === "unconfigured") setStatus("unconfigured");
      else setStatus("failed");
    } catch {
      setStatus(configured ? "failed" : "unconfigured");
    } finally {
      inFlight.current = false;
    }
  }

  const link = code ? `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${code}` : "";
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      document.getElementById("ref-link")?.focus();
      (document.getElementById("ref-link") as HTMLInputElement | null)?.select();
    }
  }

  return (
    <section className="section apply" id="apply" ref={ref} aria-labelledby="apply-h">
      <div className="container apply-grid">
        <div className="apply-intro">
          <p className="label">{t.eyebrow}</p>
          <h2 className="h2" id="apply-h">{t.h2}</h2>
          <p className="lede">{t.lede}</p>
        </div>

        <div className="apply-card" ref={panel}>
          {step < 7 && (
            <div className="apply-progress">
              <span className="label">
                {t.step} {Math.min(step + 1, TOTAL + 1)} {t.of} {TOTAL + 1}
              </span>
              <span className="bar" aria-hidden="true">
                <span style={{ width: `${((step + 1) / (TOTAL + 1)) * 100}%` }} />
              </span>
            </div>
          )}

          {step === 0 && (
            <form
              className="apply-step"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(1);
              }}
            >
              <label className="apply-q" htmlFor="apply-city" data-step-focus tabIndex={-1}>
                {t.cityQ}
              </label>
              <input
                id="apply-city"
                className="input input-big"
                placeholder={t.cityPlaceholder}
                value={city}
                onChange={(e) => setCity(e.target.value.slice(0, 80))}
                autoComplete="address-level2"
              />
              <div className="apply-nav">
                <button className="btn btn-primary" type="submit">{city.trim() ? t.next : t.start}</button>
              </div>
            </form>
          )}

          {q && (
            <fieldset className="apply-step">
              <legend className="apply-q" data-step-focus tabIndex={-1}>
                {q.prompt}
                {q.multi && <span className="label"> {t.pickTwo}</span>}
              </legend>
              <div className="options">
                {q.options.map((o) => {
                  const selected = q.multi
                    ? (answers.q2_priorities ?? []).includes(o.id as Priority)
                    : answers[q.id as keyof Answers] === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className="option"
                      aria-pressed={selected}
                      onClick={() => choose(q.id, o.id, q.multi)}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <div className="apply-nav">
                <button type="button" className="link" onClick={() => setStep(step - 1)}>{t.back}</button>
                {(q.multi ? (answers.q2_priorities?.length ?? 0) === 2 : !!answers[q.id as keyof Answers]) && (
                  <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)}>{t.next}</button>
                )}
              </div>
            </fieldset>
          )}

          {step === 5 && persona && (
            <div className="apply-step persona">
              <p className="label">{t.personaEyebrow}</p>
              <p className="persona-name" data-step-focus tabIndex={-1}>{persona.name.toLowerCase()}</p>
              <p className="persona-tag">{persona.tagline}</p>
              <p className="muted small">{t.personaNote}</p>
              <div className="apply-nav">
                <button type="button" className="link" onClick={() => setStep(4)}>{t.back}</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(6)}>{t.next}</button>
              </div>
            </div>
          )}

          {step === 6 && (
            <form className="apply-step" noValidate onSubmit={submit}>
              <p className="apply-q" data-step-focus tabIndex={-1}>{t.emailQ}</p>
              <div className="field">
                <label htmlFor="apply-email">{t.email}</label>
                <input
                  id="apply-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className="input input-big"
                  aria-invalid={errors.email || undefined}
                  aria-describedby={errors.email ? "apply-email-err" : undefined}
                />
                {errors.email && <p className="error" id="apply-email-err">{t.emailError}</p>}
              </div>
              <div className="hp" aria-hidden="true">
                <label htmlFor="apply-company">Company</label>
                <input id="apply-company" name="company" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="field">
                <label className="check">
                  <input
                    type="checkbox"
                    name="consent"
                    aria-invalid={errors.consent || undefined}
                    aria-describedby={errors.consent ? "apply-consent-err" : undefined}
                  />
                  <span>{t.consent}</span>
                </label>
                {errors.consent && <p className="error" id="apply-consent-err">{t.consentError}</p>}
              </div>
              <div className="apply-nav">
                <button type="button" className="link" onClick={() => setStep(5)}>{t.back}</button>
                <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? t.submitting : t.submit}
                </button>
              </div>
              {status === "duplicate" && <p className="status" role="status">{t.duplicate}</p>}
              {status === "failed" && <p className="status bad" role="status">{t.failure}</p>}
              {status === "unconfigured" && <p className="status bad" role="status">{t.unconfigured}</p>}
            </form>
          )}

          {step === 7 && (
            <div className="apply-step done">
              <p className="apply-done-h" data-step-focus tabIndex={-1}>{t.doneH}</p>
              <p>{city.trim() ? `${t.doneBody} ${city.trim()}.` : t.doneBodyNoCity}</p>
              {persona && <p className="label">{persona.name}</p>}
              {code && (
                <div className="refer">
                  <p className="apply-q small-q">{t.referH}</p>
                  <p className="muted">{t.referBody}</p>
                  <div className="refer-row">
                    <input id="ref-link" className="input" readOnly value={link} aria-label="Your invite link" />
                    <button type="button" className="btn btn-primary" onClick={copyLink}>{copied ? t.copied : t.copy}</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
