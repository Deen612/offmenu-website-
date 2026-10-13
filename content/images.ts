// Photographs used on the site. Each file is downloaded into public/images/
// by scripts/fetch-images.mjs (it runs before every build), so the published
// site serves its own copies and never hotlinks.
//
// All are free under the Unsplash License (https://unsplash.com/license).
// None of the pictured businesses is an Off Menu partner, so no photo is ever
// shown next to a venue name that could be read as the place in the picture.
// Replace these with original Off Menu / Cafes Globally photography before launch.

export type ImageKey =
  | "hero"
  | "work"
  | "dinner"
  | "neighbourhood"
  | "offer"
  | "story"
  | "candles";

export type SiteImage = {
  file: string;
  unsplashId: string;
  width: number;
  /** Requested height is derived from the source ratio; this is for layout only. */
  height: number;
  alt: string;
  credit: string;
  /** Colour shown while the photo loads, or instead of it if the file is missing. */
  tone: string;
};

export const images: Record<ImageKey, SiteImage> = {
  hero: {
    file: "hero-interior.jpg",
    unsplashId: "VszC1eymfdI",
    width: 1800,
    height: 1350,
    alt: "A small café with wooden chairs and tables in front of the bar",
    credit: "Vladimir Visotsky on Unsplash",
    tone: "#B89F86",
  },
  work: {
    file: "work-cafe.jpg",
    unsplashId: "XLwnQaB0sEg",
    width: 1200,
    height: 900,
    alt: "A man working on a laptop at a café table with a coffee",
    credit: "Unsplash",
    tone: "#A58E78",
  },
  dinner: {
    file: "dinner-table.jpg",
    unsplashId: "NWa1VZVPwjc",
    width: 1200,
    height: 900,
    alt: "Candles burning on a restaurant table in the evening",
    credit: "Benjamin Brunner on Unsplash",
    tone: "#4A3428",
  },
  neighbourhood: {
    file: "neighbourhood.jpg",
    unsplashId: "DemWXZBht5g",
    width: 1200,
    height: 900,
    alt: "People walking into a café with tables outside on a cobbled street",
    credit: "Alexis Presa on Unsplash",
    tone: "#C2AE97",
  },
  offer: {
    file: "offer-venue.jpg",
    unsplashId: "X4RJG4aNi8o",
    width: 1600,
    height: 1200,
    alt: "Coffee being poured into a white ceramic cup",
    credit: "Brooke Cagle on Unsplash",
    tone: "#8C6F58",
  },
  story: {
    file: "editorial-story.jpg",
    unsplashId: "IaTQuvA-_oM",
    width: 1600,
    height: 1200,
    alt: "A café table and chairs by a window in daylight",
    credit: "mahyar motebassem on Unsplash",
    tone: "#CDBBA5",
  },
  candles: {
    file: "candle-table.jpg",
    unsplashId: "GszQGurX3x0",
    width: 1200,
    height: 900,
    alt: "Lit candles on a dining table",
    credit: "Toa Heftiba on Unsplash",
    tone: "#5B4334",
  },
};
