"use client";

import { useState } from "react";
import { copy } from "@/content/copy";
import type { ImageKey } from "@/content/images";
import { Photo } from "./Photo";
import { useUI } from "./ui";

export function Collections() {
  const t = copy.collections;
  const { openPreview } = useUI();
  return (
    <section className="section" aria-labelledby="collections-h">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="h2" id="collections-h">{t.h2}</h2>
        </div>
        <ul className="collections">
          {t.items.map((c, i) => (
            <li key={c.key} className="reveal">
              <button
                className="collection"
                onClick={(e) => openPreview(c.key === "dinner" ? "search" : "feed", e.currentTarget)}
                aria-label={`${c.title}. ${t.open}`}
              >
                <Photo name={c.key as ImageKey} className="ratio-43" />
                <span className="collection-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="h3">{c.title}</span>
                <span className="muted">{c.body}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Offers and passport share one section: both are planned, neither exists yet. */
export function Planned() {
  const o = copy.offers;
  const p = copy.passport;
  const { openPreview } = useUI();
  return (
    <section className="section cream" aria-label="Planned features">
      <div className="container planned">
        <article className="planned-item reveal" id="offers" aria-labelledby="offers-h">
          <Photo name="offer" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="planned-copy">
            <p className="eyebrow">{o.eyebrow}</p>
            <h2 className="h2" id="offers-h">{o.h2}</h2>
            <p>{o.body}</p>
            <div className="specimen">
              <span className="eyebrow accent">{o.example.label}</span>
              <span className="h3">{o.example.title}</span>
              <span className="meta">{o.example.meta}</span>
              <span className="meta">{o.example.terms}</span>
              <button className="link" onClick={(e) => openPreview("offer", e.currentTarget)}>{o.cta}</button>
            </div>
            <p className="meta">{o.status}</p>
          </div>
        </article>
        <article className="planned-item reveal" id="passport" aria-labelledby="passport-h">
          <div className="planned-copy">
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 className="h2" id="passport-h">{p.h2}</h2>
            <p>{p.body}</p>
            <div className="specimen">
              <span className="eyebrow accent">{p.preview}</span>
              <span className="h3">{p.challenge}</span>
              <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={3} aria-valuenow={1} aria-label={p.progress}>
                <span style={{ width: "33.33%" }} />
              </div>
              <span className="meta">{p.progress} · {p.badge} locked</span>
              <div className="stamp-row" aria-hidden="true">
                <span className="stamp done">1</span>
                <span className="stamp">2</span>
                <span className="stamp">3</span>
              </div>
              <button className="link" onClick={(e) => openPreview("passport", e.currentTarget)}>{p.cta}</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function BrandStory() {
  const t = copy.story;
  return (
    <section className="section" aria-labelledby="story-h">
      <div className="container story">
        <Photo name="story" sizes="(min-width: 1024px) 58vw, 100vw" />
        <div className="story-copy reveal">
          <p className="eyebrow">Cafes Globally</p>
          <h2 className="h2" id="story-h">{t.h2}</h2>
          <p className="muted">{t.body}</p>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const t = copy.faq;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" aria-labelledby="faq-h">
      <div className="container">
        <div className="faq">
          <h2 className="h2" id="faq-h" style={{ marginBottom: 32 }}>{t.h2}</h2>
          <ul className="faq-list">
            {t.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li className="faq-item" key={item.q}>
                  <h3 style={{ margin: 0 }}>
                    <button
                      className="faq-q"
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      id={`faq-q-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {item.q}
                      <span className="sign" aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a" hidden={!isOpen}>
                    {item.a}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PartnerStrip() {
  const t = copy.partner;
  const { openPartner } = useUI();
  return (
    <section id="venues" aria-labelledby="venues-h">
      <div className="container partner-strip">
        <h2 className="h3" id="venues-h">{t.h2}</h2>
        <p className="muted">{t.body}</p>
        <button className="btn btn-ghost" onClick={(e) => openPartner(e.currentTarget)}>{t.button}</button>
      </div>
    </section>
  );
}

export function Footer() {
  const t = copy.footer;
  return (
    <footer className="footer">
      <div className="container">
        <span className="wordmark" aria-hidden="true">{t.wordmark}</span>
        <div className="footer-grid">
          <p>{t.line}</p>
          <p>{t.attribution}</p>
          <p>{t.photos}</p>
        </div>
      </div>
    </footer>
  );
}
