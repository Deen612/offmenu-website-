"use client";

import { useState } from "react";
import { copy } from "@/content/copy";
import { DEMO_DISCLAIMER, areas, defaultPrefs, rank, sampleRequests, venues, type Prefs } from "@/content/fixtures";
import { Controls } from "./Controls";
import { Modal } from "./Modal";
import { Photo } from "./Photo";
import { Results } from "./Results";
import type { PreviewTab } from "./ui";
import { useSaved } from "./useSaved";

const TABS: PreviewTab[] = ["feed", "search", "venue", "offer", "passport"];

const NOTES: Record<PreviewTab, { h: string; p: string }> = {
  feed: { h: "opens on your area.", p: "No typing. Your list, ranked." },
  search: { h: "or just ask.", p: "Say what you want. The list follows." },
  venue: { h: "what we know. what we don’t.", p: "Unchecked facts say so." },
  offer: { h: "terms first.", p: "Every offer shows the small print up front." },
  passport: { h: "every visit counts.", p: "Stamps, challenges, badges." },
};

export function PreviewModal({
  tab: initialTab,
  venueId,
  opener,
  onClose,
}: {
  tab: PreviewTab;
  venueId?: string;
  opener: HTMLElement | null;
  onClose: () => void;
}) {
  const t = copy.modal;
  const [tab, setTab] = useState<PreviewTab>(initialTab);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [request, setRequest] = useState<string | null>(null);
  const [venue, setVenue] = useState(venueId ?? venues[0].id);

  const onTabKey = (e: React.KeyboardEvent) => {
    const i = TABS.indexOf(tab);
    const next = e.key === "ArrowRight" ? TABS[(i + 1) % TABS.length] : e.key === "ArrowLeft" ? TABS[(i + TABS.length - 1) % TABS.length] : null;
    if (next) {
      e.preventDefault();
      setTab(next);
      document.getElementById(`tab-${next}`)?.focus();
    }
  };

  return (
    <Modal title={t.title} onClose={onClose} opener={opener}>
      <p className="meta" style={{ marginBottom: 16, maxWidth: 640 }}>{t.caption}</p>
      <div className="tabs" role="tablist" aria-label="Preview screens" onKeyDown={onTabKey}>
        {TABS.map((k) => (
          <button
            key={k}
            id={`tab-${k}`}
            role="tab"
            className="tab"
            aria-selected={tab === k}
            aria-controls="tab-panel"
            tabIndex={tab === k ? 0 : -1}
            onClick={() => setTab(k)}
          >
            {t.tabs[k]}
          </button>
        ))}
      </div>
      <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="screen-wrap">
        <div className="device">
          <div className="screen">
            {tab === "feed" && <FeedScreen prefs={prefs} setPrefs={setPrefs} onOpen={(id) => { setVenue(id); setTab("venue"); }} />}
            {tab === "search" && (
              <SearchScreen
                request={request}
                setRequest={(r, p) => { setRequest(r); if (p) setPrefs(p); }}
                prefs={prefs}
                onOpen={(id) => { setVenue(id); setTab("venue"); }}
              />
            )}
            {tab === "venue" && <VenueScreen id={venue} />}
            {tab === "offer" && <OfferScreen />}
            {tab === "passport" && <PassportScreen />}
          </div>
        </div>
        <div className="screen-note">
          <span className="eyebrow accent">Preview · example data</span>
          <h3 className="h3">{NOTES[tab].h}</h3>
          <p className="muted">{NOTES[tab].p}</p>
        </div>
      </div>
    </Modal>
  );
}

function ScreenTop({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="screen-top">
      <span className="meta">{sub}</span>
      <span className="h3" style={{ fontSize: 24 }}>{title}</span>
    </div>
  );
}

function FeedScreen({ prefs, setPrefs, onOpen }: { prefs: Prefs; setPrefs: (p: Prefs) => void; onOpen: (id: string) => void }) {
  return (
    <>
      <ScreenTop title={areas.find((a) => a.id === prefs.area)?.label ?? "London"} sub="Nearby · demo" />
      <div className="screen-pad">
        <Controls prefs={prefs} onChange={setPrefs} />
        <Results results={rank(prefs)} onOpen={(id) => onOpen(id)} />
      </div>
    </>
  );
}

function SearchScreen({
  request,
  setRequest,
  prefs,
  onOpen,
}: {
  request: string | null;
  setRequest: (r: string | null, p?: Prefs) => void;
  prefs: Prefs;
  onOpen: (id: string) => void;
}) {
  const label = (p: Prefs) =>
    [p.kind === "cafe" ? "Café" : "Restaurant", p.mood === "quiet" ? "Quiet" : "Lively", { work: "Work", friends: "Friends", date: "Date" }[p.occasion]].join(" · ");
  return (
    <>
      <ScreenTop title={request ? `“${request}”` : "What are you in the mood for?"} sub="Search · illustrative results" />
      <div className="screen-pad">
        <div className="samples">
          {sampleRequests.map((s) => (
            <button key={s.label} className="link" aria-pressed={request === s.label} onClick={() => setRequest(s.label, { ...prefs, ...s.prefs })}>
              “{s.label}”
            </button>
          ))}
        </div>
        {request ? (
          <>
            <p className="meta">Read as: {label(prefs)}</p>
            <Results results={rank(prefs)} onOpen={(id) => onOpen(id)} />
            <button className="link" onClick={() => setRequest(null, defaultPrefs)}>Clear request</button>
          </>
        ) : (
          <p className="muted">Pick a sample request to see how the results change.</p>
        )}
      </div>
    </>
  );
}

function VenueScreen({ id }: { id: string }) {
  const v = venues.find((x) => x.id === id) ?? venues[0];
  const { saved, toggle } = useSaved();
  const area = areas.find((a) => a.id === v.area)?.label;
  return (
    <>
      <div className="venue-head">
        <span className="label">{v.kind === "cafe" ? "Café" : "Restaurant"} · {area} · {v.price}</span>
        <span className="venue-name">{v.name}</span>
        <span>{v.knownFor} · {v.neighbourhood}</span>
      </div>
      <div className="screen-pad">
        <dl className="facts">
          {v.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd className={f.value ? "" : "unknown"}>{f.value ?? "Not visited yet"}</dd>
            </div>
          ))}
        </dl>
        <p className="meta">{DEMO_DISCLAIMER}</p>
        <button className="btn btn-ghost" aria-pressed={saved.includes(v.id)} onClick={() => toggle(v.id)}>
          {saved.includes(v.id) ? "Saved" : "Save"}
        </button>
      </div>
    </>
  );
}

function OfferScreen() {
  const o = copy.offers.example;
  return (
    <>
      <Photo name="offer" sizes="390px" />
      <div className="screen-pad">
        <span className="eyebrow accent">{o.label}</span>
        <span className="h3" style={{ fontSize: 26 }}>{o.title}</span>
        <dl className="facts">
          <div><dt>Eligible items</dt><dd>Selected drinks</dd></div>
          <div><dt>When</dt><dd>Weekdays, 2–5 pm</dd></div>
          <div><dt>Restrictions</dt><dd>One per visit</dd></div>
          <div><dt>How to use</dt><dd>Show the offer before ordering</dd></div>
        </dl>
        <p className="status">{o.terms}</p>
        <p className="meta">{copy.offers.status}</p>
      </div>
    </>
  );
}

function PassportScreen() {
  const [visited, setVisited] = useState(1);
  const [view, setView] = useState<"visited" | "saved">("visited");
  const { saved } = useSaved();
  const p = copy.passport;
  return (
    <>
      <ScreenTop title="Your passport" sub="Demo" />
      <div className="screen-pad">
        <div className="segmented" role="group" aria-label="Passport list">
          <button className="chip" aria-pressed={view === "visited"} onClick={() => setView("visited")}>Visited</button>
          <button className="chip" aria-pressed={view === "saved"} onClick={() => setView("saved")}>Saved ({saved.length})</button>
        </div>
        {view === "visited" ? (
          <div className="specimen">
            <span className="h3" style={{ fontSize: 22 }}>{p.challenges[0].title}</span>
            <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={3} aria-valuenow={visited} aria-label={`${visited} of 3 visited`}>
              <span style={{ width: `${(visited / 3) * 100}%` }} />
            </div>
            <span className="meta" aria-live="polite">
              {visited} of 3 visited · {p.challenges[0].badge} {visited === 3 ? "earned (demo)" : "locked"}
            </span>
            <div className="stamp-row">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`stamp ${n <= visited ? "done" : ""}`}
                  style={{ cursor: "pointer", width: 48, height: 48 }}
                  aria-label={`Set demonstration progress to ${n} of 3`}
                  onClick={() => setVisited(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : saved.length ? (
          <ul style={{ display: "grid", gap: 8 }}>
            {saved.map((id) => {
              const v = venues.find((x) => x.id === id);
              return v ? <li key={id}>{v.name}</li> : null;
            })}
          </ul>
        ) : (
          <p className="muted">Nothing saved yet. Use Save on any example place.</p>
        )}
        <p className="meta">Demonstration data. Changes here stay on this screen.</p>
      </div>
    </>
  );
}
