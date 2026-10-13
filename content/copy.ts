// Every public sentence on the site. Headings are lower case to match the
// wordmark. NOTES.md lists the promises this copy makes, so nobody ships a
// line the business can't keep.

export const CONSENT_VERSION = "2026-10-13.v2";

export const copy = {
  meta: {
    title: "Off Menu | Hand-picked cafés and restaurants",
    description: "Hand-picked cafés and restaurants, scored by editors and matched to your taste. No star ratings, no reviews from strangers. Request access.",
    socialTitle: "Off Menu | Hand-picked cafés and restaurants",
    socialDescription: "Scored by editors, matched to you. From the team behind Cafes Globally.",
  },

  app: {
    eyebrow: "What members get",
    h2: "The app, in a minute",
    perks: [
      { id: "list", title: "Your list", body: "Four questions, then New York ranked for you. Change the mood and the list changes." },
      { id: "place", title: "Know before you go", body: "Laptop rules, noise, bookings. If we haven’t checked, it says so." },
      { id: "offer", title: "Member offers", body: "Perks at places on the list, like a second coffee on your first visit. Terms up front." },
      { id: "passport", title: "Passport", body: "Log visits, finish challenges, keep the badges." },
    ],
    tryIt: "Tap around. It works.",
  },

  nav: {
    how: "How we pick",
    app: "The app",
    passport: "Passport",
    venues: "For venues",
    apply: "Request access",
    menu: "Menu",
    close: "Close menu",
  },

  hero: {
    label: "New York first",
    h1: "Hand-picked cafés and restaurants, matched to you.",
    body: "Scored by our editors, ranked by your taste. Launching in New York.",
    primary: "Request access",
    secondary: "See the app",
    caption: "Placeholder photo",
  },

  vetted: {
    eyebrow: "How we pick",
    h2: "No stars. No reviews from strangers.",
    lede: "",
    steps: [
      { title: "Scored on five things.", body: "The coffee or food, the room, value, how well known it is, and whether you can stay an hour." },
      { title: "It passes or it’s gone.", body: "A place that fails isn’t ranked lower. It isn’t on the app." },
      { title: "Famous counts against it.", body: "Five branches and national press means a low discovery score. The place nobody’s written about yet scores high." },
    ],
  },

  apply: {
    eyebrow: "Request access",
    h2: "Request access",
    lede: "Four questions. Your answers decide what you see first. We open one city at a time.",
    cityQ: "Which city?",
    cityLabel: "City",
    cityPlaceholder: "New York",
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
    doneH: "You’re on the list.",
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
    body: "Log a visit, get a stamp. Finish a challenge, like four coffees before 9 am, and the badge stays on your profile.",
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
      { id: "ev-coffee", title: "East Village coffee crawl", badge: "Avenue A", stamps: ["Abraço", "Hi-Collar", "Veselka"] },
      { id: "wv-dinner", title: "Two West Village dinners", badge: "Grove Street", stamps: ["Via Carota", "L’Artusi"] },
      { id: "early", title: "Four coffees before 9 am", badge: "Early riser", stamps: ["Mon", "Tue", "Thu", "Sat"] },
    ],
    earned: "Badge earned",
  },

  collections: {
    eyebrow: "New York lists",
    h2: "Start from a list",
    items: [
      { key: "work", title: "Laptop hours", body: "work" },
      { key: "dinner", title: "Dinner for two", body: "date" },
      { key: "neighbourhood", title: "Bring everyone", body: "friends" },
    ],
    open: "Open in the app",
  },

  offers: {
    eyebrow: "Offers",
    h2: "a second coffee on your first visit.",
    body: "Some places on Off Menu will give members something the first time they go. The terms are on the screen before you leave the house, and an offer never moves a place up your list.",
    status: "Coming after launch. Depends on the place and the city.",
    example: {
      label: "Example offer",
      title: "Second coffee on us",
      meta: "Filter or espresso · Weekdays, 2–5 pm",
      terms: "Example only. This can’t be redeemed.",
    },
    cta: "See the terms screen",
  },

  story: {
    eyebrow: "Cafes Globally",
    h2: "from the people behind cafes globally.",
    body: "Cafes Globally finds cafés worth crossing a city for and tells their stories. Off Menu puts the same eye into an app that also knows what you like.",
  },

  faq: {
    h2: "Questions",
    items: [
      { q: "Who picks the places?", a: "Our editors, with the team behind Cafes Globally. Each place is scored on five things and has to pass to be listed. Venues can’t pay to get in." },
      { q: "What are offers?", a: "Perks from some listed places, like a second coffee on your first visit. You see the terms before you go." },
      { q: "What’s the passport?", a: "Stamps for places you’ve been, challenges to finish, badges you keep. Nothing to spend." },
      { q: "When can I use it?", a: "We open one city at a time. Request access and tell us yours." },
    ],
  },

  partner: {
    h2: "Own a café or restaurant?",
    body: "Tell us about your place. If it passes, we’ll be in touch.",
    button: "Tell us about your place",
    formTitle: "Tell us about your place",
    formNote: "Every place is scored by our editors. Sending this doesn’t guarantee a listing.",
    venue: "Venue name",
    city: "City",
    email: "Contact email",
    type: "Type",
    cafe: "Café",
    restaurant: "Restaurant",
    website: "Website or Instagram",
    submit: "Send",
    success: "Thanks. We’ll be in touch.",
    required: "Fill this in.",
    urlError: "Paste the full link, starting with https://",
    unconfigured: "Demo only. Nothing is saved here.",
  },

  footer: {
    line: "Hand-picked cafés and restaurants.",
    attribution: "By the team behind Cafes Globally.",
    photos: "Placeholder photos. Pictured places aren’t Off Menu partners.",
  },

  modal: {
    title: "The app",
    caption: "Demo screens. Real New York places, not reviewed by Off Menu.",
    close: "Close",
    tabs: { feed: "Nearby", search: "Ask", venue: "A place", offer: "Offer", passport: "Passport" },
  },
} as const;
