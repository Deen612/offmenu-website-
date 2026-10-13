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

  nav: {
    how: "How it works",
    passport: "Passport",
    venues: "For venues",
    apply: "Request access",
    menu: "Menu",
    close: "Close menu",
  },

  hero: {
    label: "From the team behind Cafes Globally",
    h1: "hand-picked places, matched to you.",
    body: "Every café and restaurant on Off Menu is scored by our editors before it’s listed. Four questions about how you like to eat and drink decide which ones you see first.",
    primary: "Request access",
    secondary: "How we pick",
    caption: "Placeholder photo",
  },

  vetted: {
    eyebrow: "How we pick",
    h2: "no stars. no reviews from strangers.",
    lede: "",
    steps: [
      { title: "scored on five things.", body: "The coffee or food, the room, value, how well known it is, and whether you can stay an hour." },
      { title: "it passes or it’s gone.", body: "A place that fails isn’t ranked lower. It isn’t on the app." },
      { title: "famous counts against it.", body: "Five branches and national press means a low discovery score. The place nobody’s written about yet scores high." },
    ],
  },

  apply: {
    eyebrow: "Request access",
    h2: "request access.",
    lede: "Four questions. Your answers decide what you see first. We open one city at a time.",
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
      { id: "leather-lane", title: "coffee crawl, clerkenwell", badge: "Leather Lane", stamps: ["Prufrock Coffee", "Department of Coffee", "Kaffeine"] },
      { id: "soho-counter", title: "eat at the counter", badge: "Counter seat", stamps: ["Kiln", "Barrafina"] },
      { id: "early", title: "four coffees before 9 am", badge: "Early riser", stamps: ["Mon", "Tue", "Thu", "Sat"] },
    ],
    earned: "Badge earned",
  },

  collections: {
    eyebrow: "Lists",
    h2: "start from a list.",
    items: [
      { key: "work", title: "work from here", body: "work" },
      { key: "dinner", title: "dinner for two", body: "date" },
      { key: "neighbourhood", title: "bring everyone", body: "friends" },
    ],
    open: "Open list",
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
    h2: "questions",
    items: [
      { q: "Who picks the places?", a: "Our editors, with the team behind Cafes Globally. Each place is scored on five things and has to pass to be listed. Venues can’t pay to get in." },
      { q: "What are offers?", a: "Perks from some listed places, like a second coffee on your first visit. You see the terms before you go." },
      { q: "What’s the passport?", a: "Stamps for places you’ve been, challenges to finish, badges you keep. Nothing to spend." },
      { q: "When can I use it?", a: "We open one city at a time. Request access and tell us yours." },
    ],
  },

  partner: {
    h2: "own a café or restaurant?",
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
    title: "the app",
    caption: "Demo screens. Real London places, not reviewed by Off Menu.",
    close: "Close",
    tabs: { feed: "Nearby", search: "Ask", venue: "A place", offer: "Offer", passport: "Passport" },
  },
} as const;
