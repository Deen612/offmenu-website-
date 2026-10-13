"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { Logo } from "./Logo";
import { useUI } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const { openPartner, goToApply } = useUI();
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
  const apply = (e: React.MouseEvent) => {
    e.preventDefault();
    close();
    goToApply();
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <nav className="nav-desktop nav-left" aria-label="Sections">
          <a className="nav-link" href="#app">{t.app}</a>
          <a className="nav-link" href="#how">{t.how}</a>
        </nav>
        <a className="brand" href="#top" aria-label="Off Menu, back to top">
          <Logo className="brand-logo" title="Off Menu" />
        </a>
        <nav className="nav-desktop nav-right" aria-label="Account">
          <a className="nav-link" href="#venues" onClick={(e) => { e.preventDefault(); openPartner(e.currentTarget); }}>
            {t.venues}
          </a>
          <a className="btn btn-primary" href="#apply" onClick={apply}>{t.apply}</a>
        </nav>
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
        <a className="nav-link" href="#app" onClick={close}>{t.app}</a>
        <a className="nav-link" href="#how" onClick={close}>{t.how}</a>
        <a className="nav-link" href="#venues" onClick={close}>{t.venues}</a>
        <a className="btn btn-primary" href="#apply" onClick={apply}>{t.apply}</a>
      </nav>
    </header>
  );
}
