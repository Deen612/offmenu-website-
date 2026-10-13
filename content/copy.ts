// Every public sentence on the site. Headings are lower case to match the
// wordmark. NOTES.md lists the promises this copy makes, so nobody ships a
// line the business can't keep.

export const CONSENT_VERSION = "2026-10-13.v2";

export const copy = {
  meta: {
    title: "Off Menu | Every table, visited first",
    description:
      "A guide to cafés and restaurants where every listing starts with a visit from our team. Answer four questions and request access.",
    socialTitle: "Off Menu | Every table, visited first",
    socialDescription:
      "Cafés and restaurants our team has sat in, ranked for how you like to eat, drink and sit. From the people behind Cafes Globally.",
  },

  nav: {
    how: "How it works",
    passport: "Passport",
    venues: "For venues",
    apply: "Request access",
    menu: "Menu",
    close: "Close menu",
  },

  hero: {
    label: "By the team behind Cafes Globally",
    h1: "every table on here, we’ve sat at.",
    body: "A café and restaurant guide where nothing gets listed until we’ve been.",
    primary: "Request access",
    secondary: "How it works",
    caption: "Placeholder photo",
  },

  vetted: {
    eyebrow: "How it works",
    h2: "no visit, no listing.",
    lede: "",
    steps: [
      { title: "we go in person.", body: "Order, sit, stay." },
      { title: "we note what reviews miss.", body: "Noise, plugs, light, what to order." },
      { title: "you get matched on those notes.", body: "Not star averages." },
    ],
  },

  apply: {
    eyebrow: "Request access",
    h2: "request access.",
    lede: "Four questions. We open city by city.",
    cityQ: "Which city?",
    cityLabel: "City",
    cityPlaceholder: "London",
    next: "Next",
    back: "Back",
    start: "Start",
    pickTwo: "Pick two",
    personaEyebrow: "You’re",
    personaNote: "Your first list is built around this.",
    emailQ: "Where do we send your invite?",
    email: "Email",
    consent: "Email me when Off Menu opens in my city. Unsubscribe any time.",
    submit: "Request access",
    submitting: "Sending…",
    doneH: "you’re on the list.",
    doneBody: "We’ll email you when we open in",
    doneBodyNoCity: "We’ll email you when we open in your city.",
    referH: "Skip ahead",
    referBody: "Friends who join with your link move you up.",
    copy: "Copy link",
    copied: "Copied",
    duplicate: "You’re already on the list.",
    emailError: "That email doesn’t look right.",
    consentError: "Tick the box so we can send your invite.",
    failure: "Didn’t send. Try again.",
    unconfigured: "Demo only. Nothing is saved here.",
    step: "",
    of: "/",
  },

  discover: {
    eyebrow: "Try it",
    h2: "try it on london.",
    body: "",
    previewLabel: "Demo",
    illustrative: "Your matches",
    searchLabel: "Or ask",
    searchPlaceholder: "",
    searchNote: "",
    samples: ["Coffee and somewhere to work", "Dinner for two", "Somewhere lively with friends"],
    reset: "Reset",
    area: "Area",
    save: "Save",
    saved: "Saved",
    saveNote: "",
    openPreview: "See it in the app",
  },

  passport: {
    eyebrow: "Passport",
    h2: "collect the city.",
    body: "Check in, get a stamp. Finish a challenge, keep the badge.",
    demo: "Demo. Tap a stamp.",
    levelLabel: "Level",
    stampsLabel: "stamps",
    nextLevel: "to",
    reset: "Start over",
    levels: [
      { at: 0, name: "new in town" },
      { at: 3, name: "regular" },
      { at: 6, name: "local" },
      { at: 9, name: "off menu" },
    ],
    challenges: [
      { id: "leather-lane", title: "coffee crawl, clerkenwell", badge: "Leather Lane", stamps: ["Prufrock Coffee", "Department of Coffee", "Kaffeine"] },
      { id: "soho-counter", title: "eat at the counter", badge: "Counter seat", stamps: ["Kiln", "Barrafina"] },
      { id: "early", title: "four coffees before 9 am", badge: "Early riser", stamps: ["Mon", "Tue", "Thu", "Sat"] },
    ],
    earned: "Badge earned",
  },

  collections: {
    eyebrow: "Lists",
    h2: "lists, not search results.",
    items: [
      { key: "work", title: "work from here", body: "work" },
      { key: "dinner", title: "dinner for two", body: "date" },
      { key: "neighbourhood", title: "bring everyone", body: "friends" },
    ],
    open: "Open list",
  },

  offers: {
    eyebrow: "First-visit offers",
    h2: "a reason to try the place you saved.",
    body: "Some listed places will offer something on your first visit. An offer never decides whether a place is listed or where it ranks.",
    status: "Planned. Offers depend on the venue and the city.",
    example: {
      label: "Example offer",
      title: "Second coffee on us",
      meta: "Filter or espresso · Weekdays, 2–5 pm",
      terms: "Example only. This can’t be redeemed.",
    },
    cta: "See the example terms",
  },

  story: {
    eyebrow: "Cafes Globally",
    h2: "from the people behind cafes globally.",
    body: "Cafes Globally finds cafés worth crossing a city for and tells their stories. Off Menu puts the same eye into an app that also knows what you like.",
  },

  faq: {
    h2: "questions",
    items: [
      { q: "What does “visited” mean?", a: "Someone from our team went, ordered and stayed. Venues can’t pay to be listed." },
      { q: "When can I use it?", a: "We open one city at a time. Request access and tell us yours." },
      { q: "What’s the passport?", a: "Stamps for places you’ve been and badges for finished challenges. Nothing to spend." },
    ],
  },

  partner: {
    h2: "own a café or restaurant?",
    body: "Tell us where you are. We might visit.",
    button: "Tell us about your place",
    formTitle: "Tell us about your place",
    formNote: "No promises. We list places we’ve been to and liked.",
    venue: "Venue name",
    city: "City",
    email: "Contact email",
    type: "Type",
    cafe: "Café",
    restaurant: "Restaurant",
    website: "Website or Instagram",
    submit: "Send",
    success: "Thanks. We’ll be in touch if we’re visiting.",
    required: "Fill this in.",
    urlError: "Paste the full link, starting with https://",
    unconfigured: "Demo only. Nothing is saved here.",
  },

  footer: {
    line: "Every table, visited first.",
    attribution: "By the team behind Cafes Globally.",
    photos: "Placeholder photos. Pictured places aren’t Off Menu partners.",
  },

  modal: {
    title: "the app",
    caption: "Demo screens. Real London places, not reviewed by Off Menu.",
    close: "Close",
    tabs: { feed: "Nearby", search: "Ask", venue: "A place", offer: "Offer", passport: "Passport" },
  },
} as const;
