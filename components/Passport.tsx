"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy";

const KEY = "offmenu.passport.demo";

/** Demo passport: stamps live in this browser only and mean nothing outside it. */
export function Passport() {
  const t = copy.passport;
  const [stamped, setStamped] = useState<Record<string, number[]>>({});
  const [justEarned, setJustEarned] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setStamped(JSON.parse(raw));
    } catch {}
  }, []);

  function save(next: Record<string, number[]>) {
    setStamped(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function toggle(cid: string, i: number, total: number) {
    const cur = stamped[cid] ?? [];
    const on = cur.includes(i);
    const next = on ? cur.filter((x) => x !== i) : [...cur, i];
    save({ ...stamped, [cid]: next });
    if (!on && next.length === total) {
      setJustEarned(cid);
      setTimeout(() => setJustEarned((c) => (c === cid ? null : c)), 2400);
    }
  }

  const count = Object.values(stamped).reduce((n, a) => n + a.length, 0);
  const level = [...t.levels].reverse().find((l) => count >= l.at)!;
  const nextLevel = t.levels.find((l) => l.at > count);
  const max = t.levels[t.levels.length - 1].at;

  return (
    <section className="section passport" id="passport" aria-labelledby="passport-h">
      <div className="container passport-grid">
        <div className="passport-intro">
          <p className="label">{t.eyebrow}</p>
          <h2 className="h2" id="passport-h">{t.h2}</h2>
          <p className="lede">{t.body}</p>

          <div className="level-card" aria-live="polite">
            <div className="level-top">
              <span className="label">{t.levelLabel}</span>
              <span className="label tabular">
                {count} {t.stampsLabel}
              </span>
            </div>
            <p className="level-name">{level.name}</p>
            <div className="level-track" aria-hidden="true">
              <span style={{ width: `${Math.min(count / max, 1) * 100}%` }} />
              {t.levels.slice(1).map((l) => (
                <i key={l.at} style={{ left: `${(l.at / max) * 100}%` }} className={count >= l.at ? "hit" : ""} />
              ))}
            </div>
            <p className="label">
              {nextLevel ? `${nextLevel.at - count} more ${t.nextLevel} “${nextLevel.name}”` : "Every level reached"}
            </p>
          </div>
          <p className="label muted-label">{t.demo}</p>
          {count > 0 && (
            <button className="link" onClick={() => save({})}>{t.reset}</button>
          )}
        </div>

        <ol className="challenges">
          {t.challenges.map((c) => {
            const got = stamped[c.id] ?? [];
            const done = got.length === c.stamps.length;
            return (
              <li key={c.id} className={`challenge ${done ? "is-done" : ""} ${justEarned === c.id ? "just" : ""}`}>
                <div className="challenge-head">
                  <h3 className="h3">{c.title}</h3>
                  <span className="label tabular">
                    {got.length}/{c.stamps.length}
                  </span>
                </div>
                <div className="stamps">
                  {c.stamps.map((s, i) => {
                    const on = got.includes(i);
                    return (
                      <button
                        key={s}
                        className={`stamp-btn ${on ? "on" : ""}`}
                        aria-pressed={on}
                        onClick={() => toggle(c.id, i, c.stamps.length)}
                      >
                        <span className="stamp-ring" aria-hidden="true">
                          {on ? "✓" : String(i + 1)}
                        </span>
                        <span className="stamp-label">{s}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="badge-row">
                  <span className={`badge ${done ? "earned" : ""}`} aria-hidden="true">
                    {c.badge
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                  <span>
                    <span className="label">{done ? t.earned : "Badge"}</span>
                    <span className="badge-name">{c.badge}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
