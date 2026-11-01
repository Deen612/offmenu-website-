// Copy for the menu-card homepage. Every line is short on purpose.
export const menu = {
  masthead: {
    line: "Hand-picked cafés and restaurants, matched to you.",
    notes: ["Scored by editors", "No star ratings", "No paid listings"],
    cta: "Request access",
    from: "From the team behind Cafes Globally",
  },
  starters: {
    course: "To start",
    title: "How we pick",
    items: [
      { name: "Scored on five things", note: "The coffee or food, the room, value, how well known it is, and whether you can stay an hour." },
      { name: "Pass or it’s gone", note: "A place that fails isn’t ranked lower. It isn’t on the app." },
      { name: "Famous counts against it", note: "Five branches and national press means a low discovery score." },
    ],
  },
  mains: {
    course: "Mains",
    title: "Your list",
    note: "Pick a neighbourhood and a mood. The menu reprints.",
    demo: "Demo. Real New York places used to show how matching works. Off Menu hasn’t reviewed them and has no link with them.",
  },
  specials: {
    course: "Specials",
    title: "Member offers",
    note: "Perks at places on the list. Terms printed before you go. An offer never moves a place up your list.",
    items: [
      { name: "Second coffee on us", price: "first visit", terms: "Filter or espresso. Weekdays, 2–5 pm." },
      { name: "Glass of house wine", price: "with dinner", terms: "One per table. Sunday to Wednesday." },
    ],
    example: "Examples. Offers depend on the place.",
  },
  digestif: {
    course: "Digestif",
    title: "The passport",
    note: "Log a visit, get a stamp. Fill a row, keep the badge.",
    rows: [
      { badge: "East Village crawl", stamps: ["Abraço", "Hi-Collar", "Veselka"] },
      { badge: "Early riser", stamps: ["Mon", "Tue", "Thu", "Sat"] },
    ],
    demo: "Demo. Tap a stamp.",
  },
  bill: {
    course: "The bill",
    title: "Request access",
    note: "Leave your email. Four quick questions after that tune your first list.",
  },
  smallPrint: {
    title: "Small print",
    items: [
      { q: "Who picks the places?", a: "Our editors, with the team behind Cafes Globally. Each place is scored on five things and has to pass. Venues can’t pay to get in." },
      { q: "What are member offers?", a: "Perks from some listed places, like a second coffee on your first visit. The terms are shown before you go." },
      { q: "What’s the passport?", a: "Stamps for places you’ve been and badges for finished rows. Nothing to spend." },
      { q: "When can I use it?", a: "We open one city at a time. Request access and tell us yours." },
      { q: "What do you do with my email?", a: "We use it to send your invite and launch news. You can unsubscribe from any email." },
    ],
  },
  venues: {
    line: "Own a café or restaurant?",
    cta: "Tell us about your place",
  },
} as const;
