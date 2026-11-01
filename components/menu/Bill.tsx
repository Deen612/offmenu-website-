"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { menu } from "@/content/menu";
import { PERSONAS, personaFor, questions, type Priority, type QuizAnswers } from "@/content/quiz";
import { isEmail } from "@/lib/validate";

type Answers = Partial<{
  q1_energy: QuizAnswers["q1_energy"];
  q2_priorities: Priority[];
  q3_novelty: QuizAnswers["q3_novelty"];
  q4_dealbreaker: QuizAnswers["q4_dealbreaker"];
}>;
type SaveState = "idle" | "sending" | "duplicate" | "failed" | "unconfigured";

/**
 * Email first, saved immediately. The quiz comes after and updates the same
 * record, so someone who stops halfway is still on the list.
 * Steps: 0 email · 1–4 questions · 5 done
 */
export const Bill = forwardRef<HTMLElement, { configured: boolean }>(function Bill({ configured }, ref) {
  const t = menu.bill;
  const [step, setStep] = useState(0);
  const [state, setState] = useState<SaveState>("idle");
  const [errors, setErrors] = useState<{ email?: boolean; consent?: boolean }>({});
  const [city, setCity] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [tokens, setTokens] = useState<{ code: string; edit: string } | null>(null);
  const [demo, setDemo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refCode, setRefCode] = useState("");
  const busy = useRef(false);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get("ref");
      if (r && /^[a-z0-9]{6,12}$/.test(r)) setRefCode(r);
    } catch {}
  }, []);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    card.current?.querySelector<HTMLElement>("[data-focus]")?.focus();
  }, [step]);

  async function submitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    const consent = f.get("consent") === "on";
    const next = { email: !isEmail(email), consent: !consent };
    setErrors(next);
    if (next.email || next.consent) {
      e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    busy.current = true;
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city, consent, source: "menu", ref: refCode, company: f.get("company") }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: string; referral_code?: string; edit_token?: string };
      if (res.ok && data.status === "saved" && data.referral_code && data.edit_token) {
        setTokens({ code: data.referral_code, edit: data.edit_token });
        setState("idle");
        setStep(1);
      } else if (data.status === "duplicate") setState("duplicate");
      else if (data.status === "unconfigured") setState("unconfigured");
      else setState("failed");
    } catch {
      setState(configured ? "failed" : "unconfigured");
    } finally {
      busy.current = false;
    }
  }

  function choose(qid: string, id: string, multi: boolean) {
    if (multi) {
      const cur = answers.q2_priorities ?? [];
      const has = cur.includes(id as Priority);
      const next = has ? cur.filter((x) => x !== id) : cur.length < 2 ? [...cur, id as Priority] : [cur[1], id as Priority];
      setAnswers({ ...answers, q2_priorities: next });
      return;
    }
    const next = { ...answers, [qid]: id };
    setAnswers(next);
    setTimeout(() => {
      if (step === 4) finish(next);
      else setStep((s) => s + 1);
    }, 160);
  }

  async function finish(a: Answers) {
    setStep(5);
    if (!tokens) return;
    try {
      await fetch("/api/waitlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edit_token: tokens.edit, taste: a }),
      });
    } catch {
      // The email is already saved; a missed quiz update only costs the persona.
    }
  }

  const done = (a: Answers): a is QuizAnswers => !!a.q1_energy && a.q2_priorities?.length === 2 && !!a.q3_novelty && !!a.q4_dealbreaker;
  const persona = done(answers) ? PERSONAS[personaFor(answers)] : null;
  const link = tokens && typeof window !== "undefined" ? `${window.location.origin}/?ref=${tokens.code}` : "";
  const q = step >= 1 && step <= 4 ? questions[step - 1] : null;

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
    <section className="course" id="apply" ref={ref} aria-labelledby="bill-h">
      <header className="course-head">
        <p className="course-name">{t.course}</p>
        <h2 className="course-title" id="bill-h">{t.title}</h2>
        <p className="course-note">{t.note}</p>
      </header>

      <div className="slip" ref={card}>
        <div className="slip-top">
          <span>Order no. {tokens ? tokens.code.toUpperCase() : "—"}</span>
          <span>{step === 0 ? "1 of 5" : step <= 4 ? `${step + 1} of 5` : "Done"}</span>
        </div>

        {step === 0 && (
          <form noValidate onSubmit={submitEmail} className="slip-body">
            <label className="slip-q" htmlFor="bill-email" data-focus tabIndex={-1}>Your email</label>
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
            <label className="slip-label" htmlFor="bill-city">City <span>(optional)</span></label>
            <input id="bill-city" className="slip-input" value={city} onChange={(e) => setCity(e.target.value.slice(0, 80))} autoComplete="address-level2" />
            <div className="hp" aria-hidden="true">
              <label htmlFor="bill-company">Company</label>
              <input id="bill-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="slip-check">
              <input type="checkbox" name="consent" aria-invalid={errors.consent || undefined} aria-describedby={errors.consent ? "bill-consent-err" : undefined} />
              <span>Email me when the Off Menu app launches. Unsubscribe any time.</span>
            </label>
            {errors.consent && <p className="slip-err" id="bill-consent-err">Tick the box so we can send your invite.</p>}
            <button className="menu-btn-solid" type="submit" disabled={state === "sending"}>
              {state === "sending" ? "Saving…" : "Get early access"}
            </button>
            {state === "duplicate" && <p className="slip-msg" role="status">You’re already on the list.</p>}
            {state === "failed" && <p className="slip-err" role="status">Didn’t save. Check your connection and try again.</p>}
            {state === "unconfigured" && (
              <p className="slip-msg" role="status">
                Demo only, nothing is saved here.{" "}
                <button type="button" className="text-btn" onClick={() => { setDemo(true); setStep(1); }}>Try the questions anyway</button>
              </p>
            )}
          </form>
        )}

        {q && (
          <fieldset className="slip-body">
            <legend className="slip-q" data-focus tabIndex={-1}>
              {q.prompt}
              {q.multi && <span className="slip-hint"> Pick two.</span>}
            </legend>
            {step === 1 && (tokens || demo) && <p className="slip-saved">{tokens ? "You’re on the list. These tune your first list in the app." : "Demo mode."}</p>}
            <ul className="slip-options">
              {q.options.map((o) => {
                const on = q.multi ? (answers.q2_priorities ?? []).includes(o.id as Priority) : answers[q.id as keyof Answers] === o.id;
                return (
                  <li key={o.id}>
                    <button type="button" className="slip-option" aria-pressed={on} onClick={() => choose(q.id, o.id, q.multi)}>
                      <span>{o.label}</span>
                      <span className="tick" aria-hidden="true">{on ? "✓" : ""}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="slip-nav">
              {step > 1 ? <button type="button" className="text-btn" onClick={() => setStep(step - 1)}>Back</button> : <span />}
              {q.multi && (answers.q2_priorities?.length ?? 0) === 2 && (
                <button type="button" className="menu-btn-solid" onClick={() => setStep(step + 1)}>Next</button>
              )}
              {step === 1 && <button type="button" className="text-btn" onClick={() => setStep(5)}>Skip for now</button>}
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <div className="slip-body done">
            <p className="slip-q" data-focus tabIndex={-1}>You’re on the list.</p>
            {persona ? (
              <>
                <p className="slip-persona">{persona.name}</p>
                <p className="slip-tag">{persona.tagline}</p>
                <p>We’ll email you the download link when the app launches. Your list will be waiting.</p>
              </>
            ) : (
              <p>We’ll email you the download link when the app launches.</p>
            )}
            {tokens && (
              <div className="invite">
                <p className="slip-label">Friends who join with your link move you up the list</p>
                <div className="invite-row">
                  <input id="invite-link" className="slip-input mono" readOnly value={link} aria-label="Your invite link" />
                  <button type="button" className="menu-btn-solid" onClick={copyLink}>{copied ? "Copied" : "Copy"}</button>
                </div>
              </div>
            )}
            {demo && <p className="slip-msg">Demo mode. Nothing was saved.</p>}
          </div>
        )}
        <p className="slip-foot">Off Menu · Every place scored by an editor</p>
      </div>
    </section>
  );
});
