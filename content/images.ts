// Placeholder photographs supplied by the founder for the prelaunch build.
// Source and licence not yet recorded: confirm both, or replace with original
// Off Menu / Cafes Globally photography, before the site goes public.
// None of the pictured places is an Off Menu partner, so no photo is shown
// next to a name that could be read as the place in the picture.

export type ImageKey =
  | "hero"
  | "work"
  | "dinner"
  | "neighbourhood"
  | "offer"
  | "story"
  | "candles"
  | "counter";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Colour shown while the photo loads, or instead of it if it can't load. */
  tone: string;
};

const counter: SiteImage = {
  src: "/photos/cafe-counter.jpg",
  width: 1125,
  height: 1280,
  alt: "Two baristas behind a curved, tiled café counter with pastries in the glass case",
  tone: "#8A4A3A",
};
const lounge: SiteImage = {
  src: "/photos/bar-lounge.jpg",
  width: 1063,
  height: 1417,
  alt: "A warm restaurant bar with lit shelves, leather chairs and round wooden tables",
  tone: "#B07A4E",
};
const windowTable: SiteImage = {
  src: "/photos/window-table.jpg",
  width: 1070,
  height: 1427,
  alt: "A table for four by a tall window looking out over forested hills",
  tone: "#5E5236",
};
const fireplace: SiteImage = {
  src: "/photos/fireplace-lounge.jpg",
  width: 1196,
  height: 1595,
  alt: "A high-ceilinged lounge with sofas facing a stone fireplace under a ring chandelier",
  tone: "#6B5A49",
};
const cabin: SiteImage = {
  src: "/photos/cabin-dining.jpg",
  width: 1113,
  height: 1484,
  alt: "A log-walled dining room with plaid curtains, patterned chairs and set tables",
  tone: "#8C6B4A",
};

export const images: Record<ImageKey, SiteImage> = {
  hero: counter,
  work: fireplace,
  dinner: windowTable,
  neighbourhood: cabin,
  offer: counter,
  story: lounge,
  candles: lounge,
  counter: cabin,
};
