"use client";

import { useState } from "react";
import { copy } from "@/content/copy";
import { DEMO_DISCLAIMER, defaultPrefs, type Prefs } from "@/content/fixtures";
import { FeedScreen, OfferScreen, PassportScreen, VenueScreen } from "./PreviewModal";

type Perk = "list" | "place" | "offer" | "passport";

export function AppDemo() {
  const t = copy.app;
  const [perk, setPerk] = useState<Perk>("list");
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [venue, setVenue] = useState("joe");

  return (
    <section className="section appdemo" id="app" aria-labelledby="app-h">
      <div className="container appdemo-grid">
        <div className="appdemo-copy">
          <h2 className="h2" id="app-h">{t.h2}</h2>
          <ol className="perks" role="tablist" aria-label="App features">
            {t.perks.map((p, i) => (
              <li key={p.id}>
                <button
                  role="tab"
                  id={`perk-${p.id}`}
                  aria-selected={perk === p.id}
                  aria-controls="phone-screen"
                  className="perk"
                  onClick={() => setPerk(p.id as Perk)}
                >
                  <span className="perk-text">
                    <span className="perk-title">{p.title}</span>
                    <span className="perk-body">{p.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="small muted">{DEMO_DISCLAIMER}</p>
        </div>
        <div className="phone-wrap">
          <div className="phone">
            <div className="phone-notch" aria-hidden="true" />
            <div className="screen" id="phone-screen" role="tabpanel" aria-labelledby={`perk-${perk}`}>
              {perk === "list" && (
                <FeedScreen prefs={prefs} setPrefs={setPrefs} onOpen={(id) => { setVenue(id); setPerk("place"); }} />
              )}
              {perk === "place" && <VenueScreen id={venue} />}
              {perk === "offer" && <OfferScreen />}
              {perk === "passport" && <PassportScreen />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
