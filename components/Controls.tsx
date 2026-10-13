"use client";

import { areas, type Area, type Kind, type Mood, type Occasion, type Prefs } from "@/content/fixtures";

const kinds: [Kind, string][] = [["cafe", "Café"], ["restaurant", "Restaurant"]];
const moods: [Mood, string][] = [["quiet", "Quiet"], ["lively", "Lively"]];
const occasions: [Occasion, string][] = [["work", "Work"], ["friends", "Friends"], ["date", "Date"]];
const areaOpts: [Area, string][] = areas.map((a) => [a.id, a.label]);

function Group<T extends string>({ legend, options, value, onChange }: { legend: string; options: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset className="control-group">
      <legend>{legend}</legend>
      <div className="segmented">
        {options.map(([v, label]) => (
          <button key={v} type="button" className="chip" aria-pressed={value === v} onClick={() => onChange(v)}>
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Controls({ prefs, onChange, showArea = true }: { prefs: Prefs; onChange: (p: Prefs) => void; showArea?: boolean }) {
  return (
    <>
      {showArea && <Group legend="Area" options={areaOpts} value={prefs.area} onChange={(area) => onChange({ ...prefs, area })} />}
      <Group legend="Looking for" options={kinds} value={prefs.kind} onChange={(kind) => onChange({ ...prefs, kind })} />
      <Group legend="Mood" options={moods} value={prefs.mood} onChange={(mood) => onChange({ ...prefs, mood })} />
      <Group legend="Occasion" options={occasions} value={prefs.occasion} onChange={(occasion) => onChange({ ...prefs, occasion })} />
    </>
  );
}
