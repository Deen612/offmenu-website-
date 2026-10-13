"use client";

import { copy } from "@/content/copy";
import type { Result } from "@/content/fixtures";
import { Photo } from "./Photo";
import { useSaved } from "./useSaved";

export function Results({ results, onOpen }: { results: Result[]; onOpen?: (id: string, el: HTMLElement) => void }) {
  const { saved, toggle } = useSaved();
  const t = copy.discover;
  return (
    <ol className="results" aria-live="polite">
      {results.map((r) => {
        const isSaved = saved.includes(r.venue.id);
        return (
          <li className="result" key={r.venue.id}>
            <Photo name={r.venue.image} sizes="200px" />
            <div className="result-body">
              {r.top && <span className="result-top">Top match</span>}
              {onOpen ? (
                <button
                  className="result-title"
                  style={{ background: "none", border: 0, padding: 0, textAlign: "left", cursor: "pointer" }}
                  onClick={(e) => onOpen(r.venue.id, e.currentTarget)}
                >
                  {r.venue.name}
                </button>
              ) : (
                <span className="result-title">{r.venue.name}</span>
              )}
              <span className="meta">
                {r.venue.kind === "cafe" ? "Café" : "Restaurant"} · {r.venue.neighbourhood} · {r.venue.price}
              </span>
              <span>{r.reason}</span>
              <button className="save-btn" aria-pressed={isSaved} onClick={() => toggle(r.venue.id)}>
                {isSaved ? t.saved : t.save}
                <span className="sr-only"> {r.venue.name}</span>
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
