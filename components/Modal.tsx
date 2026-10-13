"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** Dialog with focus trap, Escape to close, scroll lock and focus return. */
export function Modal({
  title,
  onClose,
  opener,
  narrow = false,
  children,
}: {
  title: string;
  onClose: () => void;
  opener: HTMLElement | null;
  narrow?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("locked");
    ref.current?.querySelector<HTMLElement>(".modal-close")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const els = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("locked");
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose, opener]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className={`modal ${narrow ? "narrow" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-head">
          <h2 className="h3" id="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
