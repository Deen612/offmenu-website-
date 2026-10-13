"use client";

import { useState } from "react";
import { copy } from "@/content/copy";
import type { ImageKey } from "@/content/images";
import { Logo } from "./Logo";
import { Photo } from "./Photo";
import { useUI } from "./ui";

export function Collections() {
  const t = copy.collections;
  const { openPreview } = useUI();
  return (
    <section className="section" aria-labelledby="collections-h">
      <div className="container">
        <div className="section-head">
          <p className="label">{t.eyebrow}</p>
          <h2 className="h2" id="collections-h">{t.h2}</h2>
        </div>
        <ul className="collections">
          {t.items.map((c) => (
            <li key={c.key}>
              <button
                className="collection"
                onClick={(e) => openPreview(c.key === "dinner" ? "search" : "feed", e.currentTarget)}
                aria-label={`${c.title}. ${t.open}`}
              >
                <Photo name={c.key as ImageKey} className="ratio-43" />
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

export function Offers() {
  const o = copy.offers;
  const { openPreview } = useUI();
  return (
    <section className="section cream" id="offers" aria-labelledby="offers-h">
      <div className="container offers">
        <Photo name="offer" className="offers-photo" position="center 70%" />
        <div className="offers-copy">
          <p className="label">{o.eyebrow}</p>
          <h2 className="h2" id="offers-h">{o.h2}</h2>
          <p className="lede">{o.body}</p>
          <div className="ticket">
            <span className="label accent">{o.example.label}</span>
            <span className="ticket-title">{o.example.title}</span>
            <span className="label">{o.example.meta}</span>
            <span className="ticket-terms">{o.example.terms}</span>
            <button className="link" onClick={(e) => openPreview("offer", e.currentTarget)}>{o.cta}</button>
          </div>
          <p className="label muted-label">{o.status}</p>
        </div>
      </div>
    </section>
  );
}

export function BrandStory() {
  const t = copy.story;
  return (
    <section className="story-section" aria-labelledby="story-h">
      <Photo name="story" className="story-photo" position="center 45%" />
      <div className="container story-inner">
        <div className="story-copy">
          <p className="label">{t.eyebrow}</p>
          <h2 className="h2" id="story-h">{t.h2}</h2>
          <p className="muted">{t.body}</p>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const t = copy.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" aria-labelledby="faq-h">
      <div className="container faq-wrap">
        <h2 className="h2" id="faq-h">{t.h2}</h2>
        <ul className="faq-list">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className="faq-item" key={item.q}>
                <h3 className="faq-h">
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
        <Logo className="footer-logo" />
        <div className="footer-grid">
          <p>{t.line}</p>
          <p>{t.attribution}</p>
          <p>{t.photos}</p>
        </div>
      </div>
    </footer>
  );
}
