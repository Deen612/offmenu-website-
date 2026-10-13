"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { useUI } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const { openPartner, goToWaitlist } = useUI();
  const t = copy.nav;

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <nav className="nav-left" aria-label="Sections">
          <a className="nav-link" href="#discover">{t.discover}</a>
          <a className="nav-link" href="#offers">{t.offers}</a>
          <a className="nav-link" href="#passport">{t.passport}</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="Off Menu, back to top">
          OFF MENU
        </a>
        <div className="nav-right">
          <a className="nav-link" href="#venues" onClick={(e) => { e.preventDefault(); openPartner(e.currentTarget); }}>
            {t.venues}
          </a>
          <a className="btn btn-primary" href="#waitlist" onClick={(e) => { e.preventDefault(); goToWaitlist(); }}>
            {t.waitlist}
          </a>
        </div>
        <button
          ref={btn}
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.close : t.menu}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" />
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Menu">
        <a className="nav-link" href="#discover" onClick={close}>{t.discover}</a>
        <a className="nav-link" href="#offers" onClick={close}>{t.offers}</a>
        <a className="nav-link" href="#passport" onClick={close}>{t.passport}</a>
        <a className="nav-link" href="#venues" onClick={close}>{t.venues}</a>
        <a className="btn btn-primary" href="#waitlist" onClick={(e) => { e.preventDefault(); close(); goToWaitlist(); }}>
          {t.waitlist}
        </a>
      </nav>
    </header>
  );
}
