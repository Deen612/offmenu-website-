"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { DiscoveryPreview } from "./DiscoveryPreview";
import { BrandStory, Collections, FAQ, Footer, PartnerStrip, Planned } from "./Sections";
import { Signup } from "./Signup";
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
  const emailRef = useRef<HTMLInputElement>(null);

  const ui = useMemo(
    () => ({
      openPreview: (tab: PreviewTab, opener: HTMLElement | null = null, venueId?: string) =>
        setOpen({ kind: "preview", tab, venueId, opener }),
      openPartner: (opener: HTMLElement | null = null) => setOpen({ kind: "partner", opener }),
      goToWaitlist: () => {
        document.getElementById("waitlist")?.scrollIntoView({ block: "start" });
        // Focus without a second jump; the scroll above already placed the form.
        setTimeout(() => emailRef.current?.focus({ preventScroll: true }), 300);
        history.replaceState(null, "", "#waitlist");
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
        <Vetted />
        <DiscoveryPreview />
        <Collections />
        <BrandStory />
        <Planned />
        <FAQ />
        <Signup ref={emailRef} configured={configured} />
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
