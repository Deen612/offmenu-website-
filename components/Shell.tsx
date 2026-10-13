"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { AppDemo } from "./AppDemo";
import { Collections, FAQ, Footer, PartnerStrip } from "./Sections";
import { Apply } from "./Apply";
import { Vetted } from "./Vetted";
import { Modal } from "./Modal";
import { PartnerForm } from "./PartnerForm";
import { PreviewModal } from "./PreviewModal";
import { UIContext, type PreviewTab } from "./ui";

type Open =
  | { kind: "preview"; tab: PreviewTab; venueId?: string; opener: HTMLElement | null }
  | { kind: "partner"; opener: HTMLElement | null }
  | null;

export function Shell({ configured }: { configured: boolean }) {
  const [open, setOpen] = useState<Open>(null);
  const applyRef = useRef<HTMLElement>(null);

  const ui = useMemo(
    () => ({
      openPreview: (tab: PreviewTab, opener: HTMLElement | null = null, venueId?: string) =>
        setOpen({ kind: "preview", tab, venueId, opener }),
      openPartner: (opener: HTMLElement | null = null) => setOpen({ kind: "partner", opener }),
      goToApply: () => {
        applyRef.current?.scrollIntoView({ block: "start" });
        setTimeout(() => applyRef.current?.querySelector<HTMLElement>("input, button.option")?.focus({ preventScroll: true }), 400);
      },
    }),
    [],
  );
  const close = useCallback(() => setOpen(null), []);

  // One-time reveal; content stays visible without JS because the hidden
  // state only applies under the .js class this adds.
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <UIContext.Provider value={ui}>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Collections />
        <AppDemo />
        <Vetted />
        <Apply ref={applyRef} configured={configured} />
        <FAQ />
        <PartnerStrip />
      </main>
      <Footer />
      {open?.kind === "preview" && (
        <PreviewModal tab={open.tab} venueId={open.venueId} opener={open.opener} onClose={close} />
      )}
      {open?.kind === "partner" && (
        <Modal title={copy.partner.formTitle} onClose={close} opener={open.opener} narrow>
          <PartnerForm configured={configured} />
        </Modal>
      )}
    </UIContext.Provider>
  );
}
