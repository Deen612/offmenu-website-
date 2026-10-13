"use client";

import { copy } from "@/content/copy";
import { rank, defaultPrefs } from "@/content/fixtures";
import { Photo } from "./Photo";
import { useUI } from "./ui";

export function Hero() {
  const t = copy.hero;
  const { openPreview, goToWaitlist } = useUI();
  const cards = rank(defaultPrefs).slice(0, 2);
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="eyebrow accent">{t.label}</p>
          <h1 className="h1">{t.h1}</h1>
          <p className="lede">{t.body}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#waitlist" onClick={(e) => { e.preventDefault(); goToWaitlist(); }}>
              {t.primary}
            </a>
            <button className="link" onClick={(e) => openPreview("feed", e.currentTarget)}>
              {t.secondary}
            </button>
          </div>
        </div>
        <div className="photo-frame" style={{ position: "relative" }}>
          <Photo name="hero" className="hero-photo" eager sizes="(min-width: 1024px) 50vw, 100vw" />
          {/* Decorative: the same content is operable in the preview section and modal. */}
          <div className="hero-panel" aria-hidden="true">
            <span className="eyebrow accent" style={{ fontSize: 10, lineHeight: "14px" }}>{t.panelLabel}</span>
            <span className="panel-area">{t.panelArea}</span>
            <span className="panel-tabs"><b>Café</b><span>Restaurant</span></span>
            {cards.map((r) => (
              <div className="panel-card" key={r.venue.id}>
                <Photo name={r.venue.image} decorative sizes="92px" />
                <span>
                  <strong>{r.venue.name.replace(/^Example (café|restaurant): /, "")}</strong>
                  {r.top && <em>Top match</em>}
                  <span style={{ display: "block", color: "var(--muted)" }}>{r.reason}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
