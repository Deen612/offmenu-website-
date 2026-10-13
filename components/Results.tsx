"use client";

import { copy } from "@/content/copy";
import type { Result } from "@/content/fixtures";
import { useSaved } from "./useSaved";

/** Matches set like a menu: name, dotted leader, price. No photos of real places. */
export function Results({ results, onOpen }: { results: Result[]; onOpen?: (id: string, el: HTMLElement) => void }) {
  const { saved, toggle } = useSaved();
  const t = copy.discover;
  return (
    <ol className="menu" aria-live="polite">
      {results.map((r, i) => {
        const isSaved = saved.includes(r.venue.id);
        return (
          <li className="menu-row" key={r.venue.id}>
            <div className="menu-main">
              <div className="menu-line">
                {onOpen ? (
                  <button className="menu-name" onClick={(e) => onOpen(r.venue.id, e.currentTarget)}>
                    {r.venue.name}
                  </button>
                ) : (
                  <span className="menu-name">{r.venue.name}</span>
                )}
                <span className="menu-dots" aria-hidden="true" />
                <span className="menu-price">{r.venue.price}</span>
              </div>
              <p className="menu-meta">
                {r.venue.knownFor} · {r.venue.neighbourhood}
                {r.nearby ? " · nearby" : ""}
              </p>
              <p className="menu-why">
                {r.reason}
              </p>
            </div>
            <button className="save-btn" aria-pressed={isSaved} onClick={() => toggle(r.venue.id)}>
              {isSaved ? t.saved : t.save}
              <span className="sr-only"> {r.venue.name}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
