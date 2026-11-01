// Copy for the menu-card homepage. Every line is short on purpose.
export const menu = {
  masthead: {
    line: "Hand-picked cafés and restaurants, matched to you.",
    preview: "The app is coming soon. This page is a preview of what’s in it.",
    perk: "Members-only deals and rewards, only in the app.",
    notes: ["Scored by editors", "No star ratings", "No paid listings"],
    cta: "Get early access",
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
    note: "In the app, your list is ranked for you. Try it: pick a neighbourhood and a mood.",
    demo: "Demo. Real New York places used to show how matching works. Off Menu hasn’t reviewed them and has no link with them.",
  },
  specials: {
    course: "Specials",
    title: "Members-only deals",
    note: "Deals you only get through the Off Menu app. Not on the website, not at the counter. Terms shown before you go, and a deal never moves a place up your list.",
    items: [
      { name: "Second coffee on us", price: "first visit", terms: "Filter or espresso. Weekdays, 2–5 pm." },
      { name: "Glass of house wine", price: "with dinner", terms: "One per table. Sunday to Wednesday." },
      { name: "Pastry on your third visit", price: "reward", terms: "From your stamp card. One per row." },
    ],
    example: "Examples. Deals vary by place and city.",
  },
  digestif: {
    course: "Digestif",
    title: "Rewards",
    note: "Log visits in the app to collect stamps. Fill a row and unlock a reward at a place on the list.",
    rows: [
      { badge: "Free pastry, East Village", stamps: ["Abraço", "Hi-Collar", "Veselka"] },
      { badge: "Free morning coffee", stamps: ["Mon", "Tue", "Thu", "Sat"] },
    ],
    demo: "Demo. Tap a stamp. Rewards shown in the app vary by place.",
  },
  bill: {
    course: "The bill",
    title: "Get early access",
    note: "Sign up now and we’ll email you the day the app launches, so you’re first in for the members-only deals and rewards.",
  },
  smallPrint: {
    title: "Small print",
    items: [
      { q: "Who picks the places?", a: "Our editors, with the team behind Cafes Globally. Each place is scored on five things and has to pass. Venues can’t pay to get in." },
      { q: "Why sign up now?", a: "The deals and rewards are only in the app. Signing up gets you the download link on launch day, so you’re in before everyone else." },
      { q: "Where do I use the deals?", a: "In the Off Menu app, at places on the list. You see the terms before you go. They aren’t available on the website." },
      { q: "How do rewards work?", a: "Log visits in the app to collect stamps. Fill a row and you unlock a reward at a place on the list." },
      { q: "When can I use it?", a: "When the app launches. Tell us your city when you sign up." },
      { q: "What do you do with my email?", a: "We email you when the app launches, with the download link. Nothing before that. You can unsubscribe from any email." },
    ],
  },
  venues: {
    line: "Own a café or restaurant?",
    cta: "Tell us about your place",
  },
} as const;
