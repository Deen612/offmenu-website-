"use client";

import { copy } from "@/content/copy";
import { Photo } from "./Photo";
import { useUI } from "./ui";

/** Opulist-style: two large photo panels; the right one carries the pitch. */
export function Hero() {
  const t = copy.hero;
  const { goToApply } = useUI();
  return (
    <section className="hero2" id="top">
      <div className="container hero2-grid">
        <div className="hero2-panel">
          <Photo name="hero" className="fill" eager position="center 60%" />
        </div>
        <div className="hero2-panel dark">
          <Photo name="dinner" className="fill" eager position="center 40%" />
          <div className="hero2-shade" aria-hidden="true" />
          <div className="hero2-copy">
            <h1 className="h1">{t.h1}</h1>
            <p>{t.body}</p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#apply" onClick={(e) => { e.preventDefault(); goToApply(); }}>
                {t.primary}
              </a>
              <a className="link link-light" href="#app">{t.secondary}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
