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
    label: "Applications open for the first city",
    h1: "every table on here, we’ve sat at.",
    body: "Off Menu is a guide to cafés and restaurants where every listing starts with a visit from our team. Answer four questions and it ranks what’s near you by how you like to eat, drink and sit.",
    primary: "Request access",
    secondary: "How it works",
    caption: "A counter worth crossing town for. Placeholder photo.",
  },

  vetted: {
    eyebrow: "How a place gets listed",
    h2: "no visit, no listing.",
    lede: "Most apps list anything with a postcode and leave the reviews to sort it out. We send someone in first. They order, sit down, stay an hour and write down what they find.",
    steps: [
      {
        title: "we go in person",
        body: "Order, sit, stay. A venue can’t pay its way onto the list.",
      },
      {
        title: "we write down the boring stuff",
        body: "How loud it gets at 1 pm. Which tables have plugs. Whether the window seats get the sun. Anything we couldn’t check is marked unknown, never guessed.",
      },
      {
        title: "your matches come from those notes",
        body: "Not star averages. Tell us how a visit went and the next list shifts.",
      },
    ],
  },

  apply: {
    eyebrow: "Request access",
    h2: "four questions, then you’re in the queue.",
    lede: "Your answers become your taste profile on day one, so the app knows you before you open it. We let people in city by city.",
    cityQ: "Where do you want to use Off Menu?",
    cityLabel: "City",
    cityPlaceholder: "e.g. Manchester",
    next: "Next",
    back: "Back",
    start: "Start",
    pickTwo: "Pick two",
    personaEyebrow: "Your taste profile",
    personaNote: "This shapes your first list. You can retake it in the app.",
    emailQ: "Where should we send your invite?",
    email: "Email address",
    consent: "Email me when Off Menu opens in my city. I can unsubscribe at any time.",
    submit: "Request access",
    submitting: "Saving…",
    doneH: "you’re in the queue.",
    doneBody: "We’ll email you when we open in",
    doneBodyNoCity: "We’ll email you when we open in your city.",
    referH: "Bring a friend",
    referBody: "Send this link to people you eat out with. We count every friend who joins through it, and the people who bring the most get their invite first.",
    copy: "Copy link",
    copied: "Copied",
    duplicate: "This email is already in the queue. We’ll be in touch.",
    emailError: "Enter an email address like name@example.com.",
    consentError: "Tick the box so we can email your invite.",
    failure: "That didn’t save. Check your connection and try again.",
    unconfigured: "Requests aren’t open on this preview. Nothing you enter here is saved.",
    step: "Step",
    of: "of",
  },

  discover: {
    eyebrow: "Try it",
    h2: "pick a mood. watch the list change.",
    body: "These are made-up places on an example street, ranked the way the app will rank real ones. Nothing here is live.",
    previewLabel: "Demo. Example places, fixed rules.",
    illustrative: "Example results",
    searchLabel: "Or start from a request",
    searchPlaceholder: "Try “a quiet café where I can work”",
    searchNote: "Typing is off in the demo. Tap one of these to see what a request does:",
    samples: ["Coffee and somewhere to work", "Dinner for two", "Somewhere lively with friends"],
    reset: "Reset",
    area: "Example street",
    save: "Save",
    saved: "Saved",
    saveNote: "Saves stay in this browser.",
    openPreview: "Open the app screens",
  },

  passport: {
    eyebrow: "The passport",
    h2: "a stamp for every place you actually go.",
    body: "Check in when you visit and the place goes in your passport. Finish a challenge and you keep its badge. It’s a record of where you’ve been, nothing to redeem and nothing to buy.",
    demo: "Demo. Tap a stamp to check in.",
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
      {
        id: "three-cafes",
        title: "three cafés, one neighbourhood",
        badge: "Corner to corner",
        stamps: ["Window-seat roastery", "Corner espresso bar", "Bakery with a back room"],
      },
      {
        id: "two-dinners",
        title: "two dinners somewhere new",
        badge: "Table for two",
        stamps: ["Candlelit wine bar", "Neighbourhood bistro"],
      },
      {
        id: "early",
        title: "four coffees before 9 am",
        badge: "Early riser",
        stamps: ["Mon", "Tue", "Thu", "Sat"],
      },
    ],
    earned: "Badge earned",
  },

  collections: {
    eyebrow: "Lists",
    h2: "lists we’d hand a friend.",
    items: [
      { key: "work", title: "coffee and a long afternoon", body: "Plugs, space and nobody hovering for your table." },
      { key: "dinner", title: "dinner for two", body: "Rooms quiet enough to hear each other." },
      { key: "neighbourhood", title: "a new neighbourhood", body: "Five places within a ten-minute walk, for a Saturday." },
    ],
    open: "See this list in the app",
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
      {
        q: "What does “visited” mean?",
        a: "Someone from our team has been in person, ordered, and stayed long enough to judge the room. If the place didn’t earn a spot, it isn’t listed. A venue can’t pay to be listed.",
      },
      {
        q: "How does it decide what to show me?",
        a: "It matches the notes from our visits against your four answers and anything you tell it after a visit. AI helps read what you’re asking for and order the list. It can’t add a place we haven’t been to.",
      },
      {
        q: "Do I have to search every time?",
        a: "No. The app opens on a list for the area you pick. You can still ask for something specific, like a quiet table for two tonight.",
      },
      {
        q: "What’s the passport?",
        a: "A record of where you’ve actually been. Check in on a visit to get a stamp, and finish a challenge to keep its badge. There are no points to spend.",
      },
      {
        q: "When can I use it?",
        a: "We open one city at a time and haven’t named the first one yet. Request access and tell us your city.",
      },
      {
        q: "How do offers work?",
        a: "Some places will offer something on your first visit, with the terms shown before you go. Offers never change rankings.",
      },
    ],
  },

  partner: {
    h2: "run a café or restaurant?",
    body: "We’re choosing places for the first city. Tell us where you are and we may come and visit. A visit isn’t a promise of a listing.",
    button: "Tell us about your place",
    formTitle: "Tell us about your place",
    formNote: "This just puts you on our list to visit. Nothing is agreed yet.",
    venue: "Venue name",
    city: "City",
    email: "Contact email",
    type: "Type of venue",
    cafe: "Café",
    restaurant: "Restaurant",
    website: "Website or Instagram link",
    submit: "Send",
    success: "Got it. We’ll be in touch if we’re visiting your area.",
    required: "Fill this in.",
    urlError: "Paste the full address, starting with https://",
    unconfigured: "Venue sign-up isn’t open on this preview. Nothing you enter here is saved.",
  },

  footer: {
    line: "Cafés and restaurants, visited first.",
    attribution: "From the people behind Cafes Globally.",
    photos: "Photos are placeholders for this preview. Pictured places aren’t Off Menu partners.",
  },

  modal: {
    title: "The app, in five screens",
    caption: "Screens from the planned app, filled with example places. It isn’t launched yet, and nothing here is live.",
    close: "Close",
    tabs: {
      feed: "Nearby",
      search: "Search",
      venue: "A place",
      offer: "Offer",
      passport: "Passport",
    },
  },
} as const;
