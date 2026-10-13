"use client";

import { useState } from "react";
import { copy } from "@/content/copy";
import { defaultPrefs, rank, sampleRequests, type Prefs } from "@/content/fixtures";
import { Controls } from "./Controls";
import { Results } from "./Results";
import { useUI } from "./ui";

export function DiscoveryPreview() {
  const t = copy.discover;
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [request, setRequest] = useState<string | null>(null);
  const { openPreview } = useUI();
  const results = rank(prefs);

  return (
    <section className="section cream" id="discover" aria-labelledby="discover-h">
      <div className="container">
        <div className="section-head">
          <p className="label">{t.eyebrow}</p>
          <h2 className="h2" id="discover-h">{t.h2}</h2>
          <p className="lede">{t.body}</p>
        </div>
        <div className="discover-panel">
          <p className="preview-flag">{t.previewLabel}</p>
          <div className="controls">
            <div className="area-row">
              <span className="h3">{t.area}</span>
              <span className="meta">No location used</span>
            </div>
            <Controls prefs={prefs} onChange={(p) => { setPrefs(p); setRequest(null); }} />
            <div className="search-box">
              <label className="field-label" htmlFor="preview-search">{t.searchLabel}</label>
              <input
                id="preview-search"
                className="input"
                placeholder={t.searchPlaceholder}
                disabled
                aria-describedby="preview-search-note"
                value={request ?? ""}
                readOnly
              />
              <p id="preview-search-note" className="meta">{t.searchNote}</p>
              <div className="samples">
                {sampleRequests.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="link"
                    aria-pressed={request === s.label}
                    onClick={() => { setPrefs(s.prefs); setRequest(s.label); }}
                  >
                    “{s.label}”
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="results-head">
              <span className="eyebrow accent">{t.illustrative}</span>
              {request || prefs !== defaultPrefs ? (
                <button className="link" onClick={() => { setPrefs(defaultPrefs); setRequest(null); }}>{t.reset}</button>
              ) : null}
            </div>
            <Results results={results} onOpen={(id, el) => openPreview("venue", el, id)} />
            <p className="meta" style={{ marginTop: 12 }}>{t.saveNote}</p>
            <button className="btn btn-ghost" style={{ marginTop: 24 }} onClick={(e) => openPreview("feed", e.currentTarget)}>
              {t.openPreview}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
