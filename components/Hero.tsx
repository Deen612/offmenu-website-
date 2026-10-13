"use client";

import { copy } from "@/content/copy";
import { Photo } from "./Photo";
import { useUI } from "./ui";

export function Hero() {
  const t = copy.hero;
  const { goToApply } = useUI();
  return (
    <section className="hero" id="top">
      <Photo name="hero" className="hero-bg" eager position="center 62%" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-inner">
        <p className="label hero-label">{t.label}</p>
        <h1 className="h1">{t.h1}</h1>
        <p className="hero-body">{t.body}</p>
        <div className="hero-actions">
          <a className="btn btn-light" href="#apply" onClick={(e) => { e.preventDefault(); goToApply(); }}>
            {t.primary}
          </a>
          <a className="link link-light" href="#how">{t.secondary}</a>
        </div>
      </div>
      <p className="hero-caption label">{t.caption}</p>
    </section>
  );
}
