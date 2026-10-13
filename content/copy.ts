// Every public sentence on the site lives here, so copy changes never touch
// layout code. Wording follows the brief (docs/brief.md, section 6) except
// where CHANGES.md records a deliberate edit.

export const CONSENT_VERSION = "2026-10-13.v1";

export const copy = {
  meta: {
    title: "Off Menu | Cafés and Restaurants for Your Taste",
    description:
      "Every café and restaurant on Off Menu is visited and vetted by our team, then matched to your taste. From the people behind Cafes Globally. Join the waitlist.",
    socialTitle: "Off Menu | Find your next café or restaurant",
    socialDescription:
      "Nearby recommendations around your taste. From the team behind Cafes Globally. Join the Off Menu waitlist.",
  },

  nav: {
    discover: "Discover",
    offers: "Offers",
    passport: "Passport",
    venues: "For venues",
    waitlist: "Join the waitlist",
    menu: "Menu",
    close: "Close menu",
  },

  hero: {
    label: "From the team behind Cafes Globally · In development",
    h1: "Every place visited first. Then matched to",
    h1Em: "your taste.",
    body: "Off Menu lists only cafés and restaurants our team has been to and vetted. What we note on each visit, from noise to seating to what to order, is what the app matches against what you like.",
    primary: "Join the waitlist",
    secondary: "See the preview",
    panelLabel: "Product preview",
    panelArea: "Example area",
  },

  vetted: {
    eyebrow: "01 · How a place gets on Off Menu",
    h2: "No listing without a visit.",
    lede: "Most apps list every place with a postcode and let reviews sort it out. We go the other way: someone from our team visits first, and a place only appears if it’s worth the trip.",
    steps: [
      {
        title: "We visit",
        body: "An editor goes in person, orders, sits down and stays a while. Paid placement can’t buy a listing.",
      },
      {
        title: "We record what matters",
        body: "How loud it gets, where the plugs are, whether the tables suit two or eight, what’s worth ordering. Anything we couldn’t check is marked unknown, never guessed.",
      },
      {
        title: "Those notes drive your matches",
        body: "Recommendations are built from our visit notes and your preferences, not star averages. Tell us how a visit went and your next matches change.",
      },
    ],
  },

  discover: {
    eyebrow: "02 · Recommendations",
    h2: "Find somewhere for today.",
    body: "Choose a quiet café to work in or find dinner for two within your budget. We’re building Off Menu to recommend places around those preferences, with AI helping choose which cafés and restaurants to show.",
    previewLabel: "Product preview. Example places and results.",
    illustrative: "Illustrative results",
    searchLabel: "Describe what you want",
    searchPlaceholder: "Try “a quiet café where I can work”",
    searchNote:
      "Live search isn’t available in this preview. Pick one of the sample requests to see how results would change.",
    samples: ["Coffee and somewhere to work", "Dinner for two", "Somewhere lively with friends"],
    reset: "Reset",
    area: "Example area",
    save: "Save",
    saved: "Saved",
    saveNote: "Saves stay in this browser. No account is created.",
    openPreview: "Open the full preview",
  },

  collections: {
    eyebrow: "03 · Collections",
    h2: "Plan your next coffee or dinner.",
    items: [
      { key: "work", title: "Coffee and somewhere to work", body: "Cafés for coffee and time with your laptop." },
      { key: "dinner", title: "Dinner for two", body: "Restaurants for an evening together." },
      {
        key: "neighbourhood",
        title: "A new neighbourhood this weekend",
        body: "Save a few places and spend the afternoon exploring.",
      },
    ],
    open: "Preview this collection",
  },

  offers: {
    eyebrow: "Planned",
    h2: "Try somewhere new with a local offer.",
    body: "We’re planning offers with participating cafés and restaurants. Check what’s included, when it applies and how to use it before you visit.",
    status: "Partner offers are planned. Availability will depend on your city.",
    example: {
      label: "Example offer",
      title: "Two coffees for the price of one",
      meta: "Selected drinks · Weekdays, 2–5 pm",
      terms: "Example terms. This offer cannot be redeemed.",
    },
    cta: "View example terms",
  },

  passport: {
    eyebrow: "Planned",
    h2: "Keep a record of the places you’ve tried.",
    body: "We’re building a café and restaurant passport with your visits, saved places and discovery badges. Follow a neighbourhood challenge or return to somewhere you loved.",
    challenge: "Try three different cafés",
    progress: "1 of 3 visited",
    badge: "Discovery badge",
    preview: "Preview only",
    cta: "Open the passport preview",
  },

  story: {
    h2: "From the team behind Cafes Globally.",
    body: "Our work with Cafes Globally is about finding cafés and telling their stories. Off Menu brings that experience into a product that helps you choose where to go for coffee or dinner.",
  },

  faq: {
    h2: "Questions",
    items: [
      {
        q: "What is Off Menu?",
        a: "Off Menu is a café and restaurant discovery app in development. We’re building recommendations around your preferences and chosen area, with planned partner offers and a record of the places you’ve visited.",
      },
      {
        q: "How will recommendations work?",
        a: "Every place on Off Menu is visited and vetted by our team first, and each visit is written up in the same detail: noise, seating, plugs, price, what to order. The app combines those notes with your preferences, search requests and feedback. AI helps interpret what you’re after and rank the vetted places; it can’t add a place we haven’t visited.",
      },
      {
        q: "What does “vetted” mean?",
        a: "Someone from our team has been there in person, and the place met our bar for the coffee or food and the room. A venue can’t pay to be listed, and an offer never changes where a place appears in your matches.",
      },
      {
        q: "Will I have to search every time?",
        a: "The planned app will show a feed for your chosen area using your saved preferences. You’ll also be able to describe what you want for a particular visit.",
      },
      {
        q: "How will offers work?",
        a: "Participating cafés and restaurants will set their own offer terms. You’ll be able to check eligible items, times and restrictions before claiming an offer. Partnerships and offers are still being developed.",
      },
      {
        q: "What is the passport?",
        a: "The planned passport will keep your café and restaurant visits together. Discovery challenges and badges will give you a way to record the neighbourhoods and places you’ve explored.",
      },
      {
        q: "Where can I use Off Menu?",
        a: "We haven’t announced the first city yet. Add your city when you join the waitlist.",
      },
    ],
  },

  waitlist: {
    h2: "Tell us where you’d like to use Off Menu.",
    body: "Add your city and we’ll email you when Off Menu opens there. That’s the email. No weekly newsletter in between.",
    email: "Email address",
    city: "Your city",
    optional: "(optional)",
    consent: "Send me Off Menu launch updates by email. I can unsubscribe at any time.",
    submit: "Join the waitlist",
    submitting: "Saving…",
    success: "You’re on the Off Menu waitlist. We’ll email you with launch updates.",
    duplicate: "This email address is already on the Off Menu waitlist.",
    emailError: "Enter a valid email address.",
    consentError: "Select the checkbox to receive Off Menu launch updates.",
    failure: "We couldn’t save your signup. Please try again.",
    unconfigured: "Waitlist signup isn’t available yet. Please check back soon.",
  },

  partner: {
    h2: "For cafés and restaurants.",
    body: "We’re looking for cafés and restaurants interested in joining our first city and offering something for Off Menu members to try.",
    button: "Register your interest",
    formTitle: "Register your venue’s interest",
    formNote: "This tells us you’d like to hear more. It isn’t an application, and nothing is agreed yet.",
    venue: "Venue name",
    city: "City",
    email: "Contact email",
    type: "Type of venue",
    cafe: "Café",
    restaurant: "Restaurant",
    website: "Website",
    submit: "Send details",
    success: "Thanks for your interest in Off Menu. We’ve received your venue details.",
    required: "Fill in this field.",
    urlError: "Enter a full web address, starting with https://",
  },

  footer: {
    wordmark: "OFF MENU",
    line: "Café and restaurant discovery.",
    attribution: "From the team behind Cafes Globally.",
    photos: "Photographs are placeholders for this preview. Pictured places are not Off Menu partners.",
  },

  modal: {
    title: "Off Menu product preview",
    caption:
      "Screens designed for the planned app, built for this page with example places. This is not a launched app, and nothing here is live AI output.",
    close: "Close",
    tabs: {
      feed: "Nearby feed",
      search: "Search",
      venue: "Venue detail",
      offer: "Offer",
      passport: "Passport",
    },
  },
} as const;
