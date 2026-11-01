"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { menu } from "@/content/menu";
import { DEMO_DISCLAIMER, defaultPrefs, rank, type Prefs } from "@/content/fixtures";
import { copy } from "@/content/copy";
import { Controls } from "../Controls";
import { Logo } from "../Logo";
import { Modal } from "../Modal";
import { PartnerForm } from "../PartnerForm";
import { Results } from "../Results";
import { Bill } from "./Bill";

function Course({ id, course, title, note, children }: { id?: string; course: string; title: string; note?: string; children: React.ReactNode }) {
  const hid = `${id ?? course.toLowerCase().replace(/\s+/g, "-")}-h`;
  return (
    <section className="course" id={id} aria-labelledby={hid}>
      <header className="course-head">
        <p className="course-name">{course}</p>
        <h2 className="course-title" id={hid}>{title}</h2>
        {note && <p className="course-note">{note}</p>}
      </header>
      {children}
    </section>
  );
}

function Mains() {
  const t = menu.mains;
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const results = rank(prefs);
  return (
    <Course id="list" course={t.course} title={t.title} note={t.note}>
      <div className="mains-controls">
        <Controls prefs={prefs} onChange={setPrefs} />
      </div>
      {/* Re-keyed on every change so the list reprints line by line. */}
      <div className="reprint" key={JSON.stringify(prefs)}>
        <Results results={results} />
      </div>
      <p className="fine">{DEMO_DISCLAIMER}</p>
    </Course>
  );
}

function Specials() {
  const t = menu.specials;
  return (
    <Course id="offers" course={t.course} title={t.title} note={t.note}>
      <ul className="dishes">
        {t.items.map((d) => (
          <li key={d.name} className="dish">
            <div className="dish-line">
              <span className="dish-name">{d.name}</span>
              <span className="leader" aria-hidden="true" />
              <span className="dish-price">{d.price}</span>
            </div>
            <p className="dish-note">{d.terms}</p>
          </li>
        ))}
      </ul>
      <p className="fine">{t.example}</p>
    </Course>
  );
}

function Digestif() {
  const t = menu.digestif;
  const [on, setOn] = useState<Record<string, boolean>>({});
  const total = t.rows.reduce((n, r) => n + r.stamps.length, 0);
  const count = Object.values(on).filter(Boolean).length;
  return (
    <Course id="passport" course={t.course} title={t.title} note={t.note}>
      <div className="stampcard">
        <div className="stampcard-head">
          <Logo className="stampcard-logo" title="Off Menu passport" />
          <span aria-live="polite">{count} of {total} stamps</span>
        </div>
        {t.rows.map((r) => {
          const full = r.stamps.every((s) => on[`${r.badge}:${s}`]);
          return (
            <div key={r.badge} className="stamprow">
              <div className="stamps2">
                {r.stamps.map((s, i) => {
                  const k = `${r.badge}:${s}`;
                  return (
                    <button
                      key={k}
                      className={`stamp2 ${on[k] ? "on" : ""}`}
                      style={{ ["--tilt" as string]: `${(i % 2 ? 1 : -1) * (4 + i * 3)}deg` }}
                      aria-pressed={!!on[k]}
                      onClick={() => setOn({ ...on, [k]: !on[k] })}
                    >
                      <span className="stamp2-ink" aria-hidden="true">{on[k] ? "Visited" : ""}</span>
                      <span className="stamp2-name">{s}</span>
                    </button>
                  );
                })}
              </div>
              <p className={`rowbadge ${full ? "won" : ""}`}>
                {full ? "Badge: " : "Fill the row: "}
                <b>{r.badge}</b>
              </p>
            </div>
          );
        })}
      </div>
      <p className="fine">{t.demo}</p>
    </Course>
  );
}

function SmallPrint() {
  const t = menu.smallPrint;
  return (
    <section className="course small" aria-labelledby="small-h">
      <h2 className="course-title" id="small-h">{t.title}</h2>
      <div className="faq2">
        {t.items.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function MenuPage({ configured }: { configured: boolean }) {
  const m = menu.masthead;
  const billRef = useRef<HTMLElement>(null);
  const [partner, setPartner] = useState<HTMLElement | null | false>(false);
  const toBill = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    billRef.current?.scrollIntoView({ block: "start" });
    setTimeout(() => document.getElementById("bill-email")?.focus({ preventScroll: true }), 400);
  }, []);
  const close = useCallback(() => setPartner(false), []);
  const today = useMemo(() => new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }), []);

  return (
    <div className="table-top">
      <a className="skip" href="#card">Skip to the menu</a>
      <main className="card" id="card">
        <header className="masthead">
          <p className="mast-date" suppressHydrationWarning>{today}</p>
          <h1 className="mast-logo">
            <Logo className="mast-logo-svg" title="Off Menu" />
          </h1>
          <p className="mast-line">{m.line}</p>
          <ul className="mast-notes">
            {m.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <a className="menu-btn-solid" href="#apply" onClick={toBill}>{m.cta}</a>
          <p className="mast-from">{m.from}</p>
        </header>

        <Course id="how" course={menu.starters.course} title={menu.starters.title}>
          <ul className="dishes">
            {menu.starters.items.map((d) => (
              <li key={d.name} className="dish">
                <p className="dish-name">{d.name}</p>
                <p className="dish-note">{d.note}</p>
              </li>
            ))}
          </ul>
        </Course>

        <Mains />
        <Specials />
        <Digestif />
        <Bill ref={billRef} configured={configured} />
        <SmallPrint />

        <footer className="card-foot">
          <p>{menu.venues.line}</p>
          <button className="text-btn" onClick={(e) => setPartner(e.currentTarget)}>{menu.venues.cta}</button>
          <p className="fine">Off Menu · Hand-picked cafés and restaurants · From the team behind Cafes Globally</p>
        </footer>
      </main>

      {partner !== false && (
        <Modal title={copy.partner.formTitle} onClose={close} opener={partner} narrow>
          <PartnerForm configured={configured} />
        </Modal>
      )}
    </div>
  );
}
