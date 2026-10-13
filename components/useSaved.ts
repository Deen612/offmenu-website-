"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "offmenu.preview.saved";

/** Preview saves live in this browser only. They never create an account. */
export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
    const sync = (e: Event) => setSaved((e as CustomEvent<string[]>).detail);
    window.addEventListener("offmenu:saved", sync);
    return () => window.removeEventListener("offmenu:saved", sync);
  }, []);

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      queueMicrotask(() => window.dispatchEvent(new CustomEvent("offmenu:saved", { detail: next })));
      return next;
    });
  }, []);

  return { saved, toggle };
}
