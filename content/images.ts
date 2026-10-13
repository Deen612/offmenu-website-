// Café and restaurant photographs from Unsplash, free under the Unsplash
// License (https://unsplash.com/license). scripts/fetch-images.mjs copies
// them into public/images/ before each build; if a copy is missing the page
// loads the photo straight from Unsplash's CDN, and if that fails too a
// plain colour block shows instead.
//
// None of the pictured places is an Off Menu partner, so no photo is shown
// next to a name that could be read as the place in the picture.
// Replace with original Off Menu / Cafes Globally photography before launch.

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
  file: string;
  /** Unsplash CDN photo id, used as https://images.unsplash.com/<id> */
  photo: string;
  width: number;
  height: number;
  alt: string;
  /** Colour shown while the photo loads, or instead of it if it can't load. */
  tone: string;
};

export const images: Record<ImageKey, SiteImage> = {
  hero: {
    file: "hero-interior.jpg",
    photo: "photo-1554118811-1e0d58224f24",
    width: 1800,
    height: 1350,
    alt: "Inside a café, with tables and chairs in daylight",
    tone: "#B89F86",
  },
  work: {
    file: "work-cafe.jpg",
    photo: "photo-1521017432531-fbd92d768814",
    width: 1200,
    height: 900,
    alt: "A coffee shop with people sitting at tables",
    tone: "#A58E78",
  },
  dinner: {
    file: "dinner-table.jpg",
    photo: "photo-1414235077428-338989a2e8c0",
    width: 1200,
    height: 900,
    alt: "A restaurant table laid for dinner",
    tone: "#4A3428",
  },
  neighbourhood: {
    file: "neighbourhood.jpg",
    photo: "photo-1445116572660-236099ec97a0",
    width: 1200,
    height: 900,
    alt: "The inside of a neighbourhood café",
    tone: "#C2AE97",
  },
  offer: {
    file: "offer-venue.jpg",
    photo: "photo-1495474472287-4d71bcdd2085",
    width: 1600,
    height: 1200,
    alt: "A cup of coffee on a café table",
    tone: "#8C6F58",
  },
  story: {
    file: "editorial-story.jpg",
    photo: "photo-1501339847302-ac426a4a7cbb",
    width: 2000,
    height: 1200,
    alt: "Seating inside a café",
    tone: "#CDBBA5",
  },
  candles: {
    file: "restaurant-room.jpg",
    photo: "photo-1517248135467-4c7edcad34c4",
    width: 1200,
    height: 900,
    alt: "A restaurant dining room with set tables",
    tone: "#5B4334",
  },
  counter: {
    file: "cafe-counter.jpg",
    photo: "photo-1559925393-8be0ec4767c8",
    width: 1200,
    height: 900,
    alt: "A café counter",
    tone: "#9C8670",
  },
};

export function remoteSrc(img: SiteImage, width = img.width): string {
  return `https://images.unsplash.com/${img.photo}?auto=format&fit=crop&w=${width}&q=72`;
}
