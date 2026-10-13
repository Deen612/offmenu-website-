// Specimen places for the PREVIEW mode. They are descriptions, not real
// businesses: no names, addresses, ratings or offers that could be mistaken
// for a listing. Every result built from them is labelled illustrative.

import type { ImageKey } from "./images.ts";

export type Kind = "cafe" | "restaurant";
export type Mood = "quiet" | "lively";
export type Occasion = "work" | "friends" | "date";

export type Venue = {
  id: string;
  kind: Kind;
  name: string;
  neighbourhood: string;
  image: ImageKey;
  mood: Mood;
  /** How well the place suits each occasion, 0–3. */
  fit: Record<Occasion, number>;
  price: "£" | "££" | "£££";
  order: string;
  excerpt: string;
  facts: { label: string; value: string | null }[];
  reasons: Partial<Record<Occasion | Mood, string>>;
};

export const venues: Venue[] = [
  {
    id: "c1",
    kind: "cafe",
    name: "Example café: the window-seat roastery",
    neighbourhood: "Example area",
    image: "story",
    mood: "quiet",
    fit: { work: 3, friends: 1, date: 1 },
    price: "£",
    order: "Filter coffee of the week",
    excerpt: "Long bench by the window, plugs under every second seat.",
    facts: [
      { label: "Wi‑Fi", value: "Yes" },
      { label: "Power sockets", value: "Some seats" },
      { label: "Laptop hours", value: null },
    ],
    reasons: {
      work: "Plugs along the window bench and a quiet room.",
      quiet: "Low music and spaced tables.",
    },
  },
  {
    id: "c2",
    kind: "cafe",
    name: "Example café: the corner espresso bar",
    neighbourhood: "Example area",
    image: "offer",
    mood: "lively",
    fit: { work: 1, friends: 3, date: 1 },
    price: "£",
    order: "Cortado and a cardamom bun",
    excerpt: "Standing counter at the front, a long shared table at the back.",
    facts: [
      { label: "Wi‑Fi", value: "No" },
      { label: "Outdoor seats", value: "Yes" },
      { label: "Laptop hours", value: "Not on weekends" },
    ],
    reasons: {
      friends: "A long shared table that seats six.",
      lively: "Busy counter and music you can hear.",
    },
  },
  {
    id: "c3",
    kind: "cafe",
    name: "Example café: the courtyard kitchen",
    neighbourhood: "Example area",
    image: "neighbourhood",
    mood: "quiet",
    fit: { work: 2, friends: 2, date: 2 },
    price: "££",
    order: "Eggs on toast, oat flat white",
    excerpt: "Tables outside on the cobbles; brunch until 3 pm.",
    facts: [
      { label: "Wi‑Fi", value: "Yes" },
      { label: "Outdoor seats", value: "Yes" },
      { label: "Dog friendly", value: null },
    ],
    reasons: {
      date: "Outdoor tables away from the street.",
      work: "Wi‑Fi, and quiet before noon.",
      quiet: "A courtyard set back from traffic.",
    },
  },
  {
    id: "c4",
    kind: "cafe",
    name: "Example café: the bakery with a back room",
    neighbourhood: "Example area",
    image: "work",
    mood: "lively",
    fit: { work: 2, friends: 2, date: 1 },
    price: "£",
    order: "Sourdough toast and a long black",
    excerpt: "Loud at the front, a calmer back room with big tables.",
    facts: [
      { label: "Wi‑Fi", value: "Yes" },
      { label: "Power sockets", value: null },
      { label: "Bookable tables", value: "No" },
    ],
    reasons: {
      work: "Big tables in the back room.",
      friends: "Room to spread out with a group.",
      lively: "A busy bakery counter.",
    },
  },
  {
    id: "r1",
    kind: "restaurant",
    name: "Example restaurant: the candlelit wine bar",
    neighbourhood: "Example area",
    image: "dinner",
    mood: "quiet",
    fit: { work: 0, friends: 1, date: 3 },
    price: "£££",
    order: "Small plates to share, a glass of orange wine",
    excerpt: "Twelve tables, candles on each, the kitchen visible from the bar.",
    facts: [
      { label: "Bookings", value: "Yes" },
      { label: "Vegetarian options", value: "Several" },
      { label: "Step-free access", value: null },
    ],
    reasons: {
      date: "Small room, candles and tables for two.",
      quiet: "Twelve tables and no loud music.",
    },
  },
  {
    id: "r2",
    kind: "restaurant",
    name: "Example restaurant: the long-table trattoria",
    neighbourhood: "Example area",
    image: "candles",
    mood: "lively",
    fit: { work: 0, friends: 3, date: 1 },
    price: "££",
    order: "Fresh pasta of the day",
    excerpt: "Shared tables, a busy open kitchen and late opening.",
    facts: [
      { label: "Bookings", value: "Groups of 6+" },
      { label: "Vegetarian options", value: "Yes" },
      { label: "Step-free access", value: "Yes" },
    ],
    reasons: {
      friends: "Shared tables that suit groups.",
      lively: "An open kitchen and a full room.",
    },
  },
  {
    id: "r3",
    kind: "restaurant",
    name: "Example restaurant: the neighbourhood bistro",
    neighbourhood: "Example area",
    image: "hero",
    mood: "quiet",
    fit: { work: 1, friends: 2, date: 2 },
    price: "££",
    order: "Set menu of the day",
    excerpt: "Short menu that changes daily, open for lunch and dinner.",
    facts: [
      { label: "Bookings", value: "Yes" },
      { label: "Vegetarian options", value: null },
      { label: "Step-free access", value: "Yes" },
    ],
    reasons: {
      date: "A short menu and a calm dining room.",
      friends: "Tables for four by the window.",
      quiet: "A calm room at lunch.",
    },
  },
];

export type Prefs = { kind: Kind; mood: Mood; occasion: Occasion };

export const defaultPrefs: Prefs = { kind: "cafe", mood: "quiet", occasion: "work" };

/** Sample requests and the controls each one sets. Fixed rules, not AI. */
export const sampleRequests: { label: string; prefs: Prefs }[] = [
  { label: "Coffee and somewhere to work", prefs: { kind: "cafe", mood: "quiet", occasion: "work" } },
  { label: "Dinner for two", prefs: { kind: "restaurant", mood: "quiet", occasion: "date" } },
  { label: "Somewhere lively with friends", prefs: { kind: "restaurant", mood: "lively", occasion: "friends" } },
];

export type Result = { venue: Venue; reason: string; top: boolean };

/**
 * Ranks the specimen places for the chosen controls. Deterministic so the
 * same controls always show the same three cards.
 */
export function rank(prefs: Prefs, list: Venue[] = venues): Result[] {
  return list
    .filter((v) => v.kind === prefs.kind)
    .map((v) => ({ v, score: v.fit[prefs.occasion] * 2 + (v.mood === prefs.mood ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || a.v.id.localeCompare(b.v.id))
    .slice(0, 3)
    .map(({ v }, i) => ({
      venue: v,
      reason: v.reasons[prefs.occasion] ?? v.reasons[prefs.mood] ?? v.excerpt,
      top: i === 0,
    }));
}
