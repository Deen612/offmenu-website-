"use client";

import { useState } from "react";
import { copy } from "@/content/copy";
import { DEMO_DISCLAIMER, defaultPrefs, rank, sampleRequests, type Prefs } from "@/content/fixtures";
import { Controls } from "./Controls";
import { Results } from "./Results";
import { useUI } from "./ui";

export function DiscoveryPreview() {
  const t = copy.discover;
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [request, setRequest] = useState<string | null>(null);
  const { openPreview } = useUI();
  const results = rank(prefs);
  const changed = request !== null || JSON.stringify(prefs) !== JSON.stringify(defaultPrefs);

  return (
    <section className="section cream" id="discover" aria-labelledby="discover-h">
      <div className="container">
        <div className="section-head">
          <p className="label">{t.eyebrow}</p>
          <h2 className="h2" id="discover-h">{t.h2}</h2>
        </div>
        <div className="discover-panel">
          <div className="controls">
            <Controls prefs={prefs} onChange={(p) => { setPrefs(p); setRequest(null); }} />
            <fieldset className="control-group">
              <legend>{t.searchLabel}</legend>
              <div className="samples">
                {sampleRequests.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="link"
                    aria-pressed={request === s.label}
                    onClick={() => { setPrefs({ ...prefs, ...s.prefs }); setRequest(s.label); }}
                  >
                    “{s.label}”
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <div>
            <div className="results-head">
              <span className="label accent">{t.illustrative}</span>
              {changed && (
                <button className="link" onClick={() => { setPrefs(defaultPrefs); setRequest(null); }}>{t.reset}</button>
              )}
            </div>
            <Results results={results} onOpen={(id, el) => openPreview("venue", el, id)} />
            <div className="discover-foot">
              <button className="btn btn-primary" onClick={(e) => openPreview("feed", e.currentTarget)}>{t.openPreview}</button>
              <p className="label">{DEMO_DISCLAIMER}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
