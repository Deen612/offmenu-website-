// Demo data: real, well-known London cafés and restaurants, used to show how
// ranking works. Off Menu has NOT visited or vetted these places and has no
// relationship with them. The page says so wherever they appear.
//
// Only low-risk public facts are stated (name, area, what the place is known
// for). Mood, occasion fit and price bands are rough demo tags for the ranking
// logic, not reviews. Facts we don't know are left null and shown as unknown.

export type Kind = "cafe" | "restaurant";
export type Mood = "quiet" | "lively";
export type Occasion = "work" | "friends" | "date";
export type Area = "shoreditch" | "clerkenwell" | "soho" | "borough";

export type Venue = {
  id: string;
  kind: Kind;
  name: string;
  neighbourhood: string;
  area: Area;
  knownFor: string;
  mood: Mood;
  /** How well the place suits each occasion, 0–3 (demo tag). */
  fit: Record<Occasion, number>;
  price: "£" | "££" | "£££";
  facts: { label: string; value: string | null }[];
};

export const areas: { id: Area; label: string }[] = [
  { id: "shoreditch", label: "Shoreditch" },
  { id: "clerkenwell", label: "Clerkenwell" },
  { id: "soho", label: "Soho" },
  { id: "borough", label: "Borough" },
];

const unknownFacts = (kind: Kind) =>
  kind === "cafe"
    ? [
        { label: "Laptop-friendly", value: null },
        { label: "Plugs", value: null },
        { label: "Noise at 1 pm", value: null },
      ]
    : [
        { label: "Bookings", value: null },
        { label: "Good for groups", value: null },
        { label: "Noise at 8 pm", value: null },
      ];

const v = (x: Omit<Venue, "facts">): Venue => ({ ...x, facts: unknownFacts(x.kind) });

export const venues: Venue[] = [
  // Shoreditch
  v({ id: "ozone", kind: "cafe", name: "Ozone Coffee", neighbourhood: "Shoreditch", area: "shoreditch", knownFor: "Roastery and all-day café", mood: "lively", fit: { work: 2, friends: 3, date: 1 }, price: "££" }),
  v({ id: "allpress", kind: "cafe", name: "Allpress Espresso", neighbourhood: "Shoreditch", area: "shoreditch", knownFor: "Espresso bar and roastery", mood: "quiet", fit: { work: 3, friends: 1, date: 1 }, price: "£" }),
  v({ id: "brat", kind: "restaurant", name: "Brat", neighbourhood: "Shoreditch", area: "shoreditch", knownFor: "Wood-fired grill", mood: "lively", fit: { work: 0, friends: 3, date: 3 }, price: "£££" }),
  v({ id: "clove", kind: "restaurant", name: "The Clove Club", neighbourhood: "Shoreditch", area: "shoreditch", knownFor: "Tasting menu", mood: "quiet", fit: { work: 0, friends: 1, date: 3 }, price: "£££" }),
  v({ id: "rochelle", kind: "restaurant", name: "Rochelle Canteen", neighbourhood: "Shoreditch", area: "shoreditch", knownFor: "Seasonal British lunches", mood: "quiet", fit: { work: 1, friends: 2, date: 2 }, price: "££" }),

  // Clerkenwell
  v({ id: "prufrock", kind: "cafe", name: "Prufrock Coffee", neighbourhood: "Leather Lane", area: "clerkenwell", knownFor: "Specialty coffee bar", mood: "quiet", fit: { work: 3, friends: 2, date: 1 }, price: "£" }),
  v({ id: "dept", kind: "cafe", name: "Department of Coffee and Social Affairs", neighbourhood: "Leather Lane", area: "clerkenwell", knownFor: "Coffee bar", mood: "lively", fit: { work: 2, friends: 2, date: 1 }, price: "£" }),
  v({ id: "stjohn", kind: "restaurant", name: "St. JOHN", neighbourhood: "Smithfield", area: "clerkenwell", knownFor: "Nose-to-tail British cooking", mood: "lively", fit: { work: 0, friends: 3, date: 2 }, price: "£££" }),
  v({ id: "qch", kind: "restaurant", name: "Quality Chop House", neighbourhood: "Farringdon Road", area: "clerkenwell", knownFor: "British dining room", mood: "quiet", fit: { work: 1, friends: 2, date: 3 }, price: "£££" }),
  v({ id: "sessions", kind: "restaurant", name: "Sessions Arts Club", neighbourhood: "Clerkenwell Green", area: "clerkenwell", knownFor: "Dining room in an old courthouse", mood: "quiet", fit: { work: 0, friends: 1, date: 3 }, price: "£££" }),

  // Soho
  v({ id: "baritalia", kind: "cafe", name: "Bar Italia", neighbourhood: "Frith Street", area: "soho", knownFor: "Late-night Italian espresso bar", mood: "lively", fit: { work: 0, friends: 3, date: 2 }, price: "£" }),
  v({ id: "kaffeine", kind: "cafe", name: "Kaffeine", neighbourhood: "Fitzrovia", area: "soho", knownFor: "Espresso bar", mood: "quiet", fit: { work: 2, friends: 2, date: 1 }, price: "£" }),
  v({ id: "bao", kind: "restaurant", name: "Bao", neighbourhood: "Lexington Street", area: "soho", knownFor: "Taiwanese bao", mood: "lively", fit: { work: 0, friends: 3, date: 2 }, price: "££" }),
  v({ id: "kiln", kind: "restaurant", name: "Kiln", neighbourhood: "Brewer Street", area: "soho", knownFor: "Thai cooking over fire, counter seats", mood: "lively", fit: { work: 0, friends: 2, date: 3 }, price: "££" }),
  v({ id: "barrafina", kind: "restaurant", name: "Barrafina", neighbourhood: "Dean Street", area: "soho", knownFor: "Spanish tapas at the counter", mood: "lively", fit: { work: 0, friends: 2, date: 3 }, price: "£££" }),

  // Borough
  v({ id: "monmouth", kind: "cafe", name: "Monmouth Coffee", neighbourhood: "Borough Market", area: "borough", knownFor: "Coffee roaster", mood: "lively", fit: { work: 1, friends: 2, date: 1 }, price: "£" }),
  v({ id: "watchhouse", kind: "cafe", name: "WatchHouse", neighbourhood: "Bermondsey Street", area: "borough", knownFor: "Coffee in a 19th-century watch house", mood: "quiet", fit: { work: 2, friends: 2, date: 2 }, price: "££" }),
  v({ id: "padella", kind: "restaurant", name: "Padella", neighbourhood: "Borough Market", area: "borough", knownFor: "Fresh pasta, no bookings", mood: "lively", fit: { work: 0, friends: 3, date: 2 }, price: "£" }),
  v({ id: "arabica", kind: "restaurant", name: "Arabica", neighbourhood: "Borough Market", area: "borough", knownFor: "Levantine sharing plates", mood: "lively", fit: { work: 0, friends: 3, date: 1 }, price: "££" }),
];

export type Prefs = { area: Area; kind: Kind; mood: Mood; occasion: Occasion };

export const defaultPrefs: Prefs = { area: "clerkenwell", kind: "cafe", mood: "quiet", occasion: "work" };

/** Sample requests and the controls each one sets. Fixed rules, not AI. */
export const sampleRequests: { label: string; prefs: Omit<Prefs, "area"> }[] = [
  { label: "Coffee and somewhere to work", prefs: { kind: "cafe", mood: "quiet", occasion: "work" } },
  { label: "Dinner for two", prefs: { kind: "restaurant", mood: "quiet", occasion: "date" } },
  { label: "Somewhere lively with friends", prefs: { kind: "restaurant", mood: "lively", occasion: "friends" } },
];

const REASONS: Record<Occasion, string> = {
  work: "Good for a long sit with a laptop.",
  friends: "Easy to bring a group.",
  date: "Right for an evening for two.",
};
const MOOD_REASON: Record<Mood, string> = { quiet: "Calm, like you wanted.", lively: "Plenty of energy." };

export type Result = { venue: Venue; reason: string; top: boolean; nearby: boolean };

/** Deterministic: the same controls always show the same three places. */
export function rank(prefs: Prefs, list: Venue[] = venues): Result[] {
  return list
    .filter((x) => x.kind === prefs.kind)
    .map((x) => ({
      x,
      score: (x.area === prefs.area ? 6 : 0) + x.fit[prefs.occasion] * 2 + (x.mood === prefs.mood ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.x.name.localeCompare(b.x.name))
    .slice(0, 3)
    .map(({ x }, i) => ({
      venue: x,
      reason: x.fit[prefs.occasion] >= 2 ? REASONS[prefs.occasion] : x.mood === prefs.mood ? MOOD_REASON[prefs.mood] : "Close by, worth a look.",
      top: i === 0,
      nearby: x.area !== prefs.area,
    }));
}

export const DEMO_DISCLAIMER =
  "Demo data. Real London places used to show how matching works. Off Menu hasn’t reviewed them and has no link with them.";
