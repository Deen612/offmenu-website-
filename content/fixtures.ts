// Demo data: real, well-known New York cafés and restaurants, used to show how
// ranking works. Off Menu has NOT visited or vetted these places and has no
// relationship with them. The page says so wherever they appear.
//
// Only low-risk public facts are stated (name, area, what the place is known
// for). Mood, occasion fit and price bands are rough demo tags for the ranking
// logic, not reviews. Facts we don't know are left null and shown as unknown.

export type Kind = "cafe" | "restaurant";
export type Mood = "quiet" | "lively";
export type Occasion = "work" | "friends" | "date";
export type Area = "westvillage" | "eastvillage" | "les" | "williamsburg";

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
  price: "$" | "$$" | "$$$";
  facts: { label: string; value: string | null }[];
};

export const areas: { id: Area; label: string }[] = [
  { id: "westvillage", label: "West Village" },
  { id: "eastvillage", label: "East Village" },
  { id: "les", label: "Lower East Side" },
  { id: "williamsburg", label: "Williamsburg" },
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
  // West Village
  v({ id: "joe", kind: "cafe", name: "Joe Coffee", neighbourhood: "Waverly Place", area: "westvillage", knownFor: "Neighbourhood espresso bar", mood: "quiet", fit: { work: 2, friends: 2, date: 1 }, price: "$" }),
  v({ id: "stumptown", kind: "cafe", name: "Stumptown Coffee", neighbourhood: "West 8th Street", area: "westvillage", knownFor: "Roaster’s coffee bar", mood: "lively", fit: { work: 2, friends: 2, date: 1 }, price: "$" }),
  v({ id: "viacarota", kind: "restaurant", name: "Via Carota", neighbourhood: "Grove Street", area: "westvillage", knownFor: "Italian, no reservations", mood: "lively", fit: { work: 0, friends: 3, date: 3 }, price: "$$" }),
  v({ id: "lartusi", kind: "restaurant", name: "L’Artusi", neighbourhood: "West 10th Street", area: "westvillage", knownFor: "Italian, long counter", mood: "lively", fit: { work: 0, friends: 2, date: 3 }, price: "$$$" }),

  // East Village
  v({ id: "abraco", kind: "cafe", name: "Abraço", neighbourhood: "East 7th Street", area: "eastvillage", knownFor: "Tiny espresso bar", mood: "lively", fit: { work: 0, friends: 2, date: 2 }, price: "$" }),
  v({ id: "hicollar", kind: "cafe", name: "Hi-Collar", neighbourhood: "East 10th Street", area: "eastvillage", knownFor: "Japanese kissaten coffee", mood: "quiet", fit: { work: 1, friends: 1, date: 3 }, price: "$$" }),
  v({ id: "veselka", kind: "restaurant", name: "Veselka", neighbourhood: "Second Avenue", area: "eastvillage", knownFor: "Ukrainian diner", mood: "lively", fit: { work: 1, friends: 3, date: 1 }, price: "$" }),
  v({ id: "superiority", kind: "restaurant", name: "Superiority Burger", neighbourhood: "Avenue A", area: "eastvillage", knownFor: "Vegetarian diner", mood: "lively", fit: { work: 0, friends: 3, date: 2 }, price: "$$" }),

  // Lower East Side
  v({ id: "russ", kind: "restaurant", name: "Russ & Daughters Cafe", neighbourhood: "Orchard Street", area: "les", knownFor: "Smoked fish and bagels", mood: "lively", fit: { work: 0, friends: 3, date: 2 }, price: "$$" }),
  v({ id: "kikis", kind: "restaurant", name: "Kiki’s", neighbourhood: "Division Street", area: "les", knownFor: "Greek taverna", mood: "lively", fit: { work: 0, friends: 3, date: 2 }, price: "$$" }),
  v({ id: "dudleys", kind: "restaurant", name: "Dudleys", neighbourhood: "Orchard Street", area: "les", knownFor: "Corner bistro", mood: "lively", fit: { work: 1, friends: 3, date: 2 }, price: "$$" }),
  v({ id: "cafegrumpy", kind: "cafe", name: "Café Grumpy", neighbourhood: "Essex Street", area: "les", knownFor: "Coffee roaster", mood: "quiet", fit: { work: 2, friends: 1, date: 1 }, price: "$" }),

  // Williamsburg
  v({ id: "devocion", kind: "cafe", name: "Devoción", neighbourhood: "Grand Street", area: "williamsburg", knownFor: "Colombian coffee, skylit room", mood: "quiet", fit: { work: 3, friends: 2, date: 2 }, price: "$$" }),
  v({ id: "partners", kind: "cafe", name: "Partners Coffee", neighbourhood: "North 6th Street", area: "williamsburg", knownFor: "Roaster café", mood: "lively", fit: { work: 2, friends: 2, date: 1 }, price: "$" }),
  v({ id: "lilia", kind: "restaurant", name: "Lilia", neighbourhood: "Union Avenue", area: "williamsburg", knownFor: "Italian, wood fire", mood: "lively", fit: { work: 0, friends: 2, date: 3 }, price: "$$$" }),
  v({ id: "sundayinbk", kind: "restaurant", name: "Sunday in Brooklyn", neighbourhood: "Wythe Avenue", area: "williamsburg", knownFor: "All-day American", mood: "lively", fit: { work: 1, friends: 3, date: 2 }, price: "$$" }),
];

export type Prefs = { area: Area; kind: Kind; mood: Mood; occasion: Occasion };

export const defaultPrefs: Prefs = { area: "westvillage", kind: "cafe", mood: "quiet", occasion: "work" };

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
  "Demo. Real New York places used to show how matching works. Off Menu hasn’t reviewed them and has no link with them.";
