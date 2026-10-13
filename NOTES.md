# Implementation notes, 13 October 2026

## Changes from the brief (agreed with the founder)

1. **Headline.** Brief: "Find cafés and restaurants that fit your taste." Now: "The places Cafes Globally would send you, sorted for your taste." The old line works for any venue category; the Cafes Globally connection is the one thing a competitor can't claim. The label above it carries "From the team behind Cafes Globally · In development".
2. **Offers and passport share one section**, each with one specimen and a link into the preview, instead of two full sections. Both are unbuilt; the page now spends its space on recommendations and collections. Nav anchors `#offers` and `#passport` still land on their halves.
3. **Waitlist promise.** Paragraph now reads "Add your city and we'll email you when Off Menu opens there. That's the email. No weekly newsletter in between." This is a commitment: don't send newsletters to this list without new consent.
4. **Photos** come from Unsplash (free licence) rather than original shoots. See below.

## Verified (production build, `SIGNUP_STORE=file`, Chromium)

- Layout at 1440×900: container 1312, hero columns 644, hero 640 high starting at y=113 (header 88 + 1 px border + 24), collection cards 421.33. At 390: container 350, photo 420 high, primary CTA ends at y=533 so it's visible before the photo. At 360: container 320. No horizontal scroll at any of the six viewports. One H1.
- Preview: Café/Restaurant, mood and occasion each change the visible cards or reasons (unit-tested and clicked in the browser). Sample requests set the controls by fixed rules and the results stay labelled "Illustrative results". Free-text search is disabled with an explanation, as the brief allows.
- Modal: opens from hero, preview, collections, offer and passport; Escape closes it and focus returns to the opener; Tab is trapped; background scroll locked. Full-height on mobile.
- Waitlist: empty submit shows both field errors; valid submit saves and only then shows success; the same email in different case and spacing returns the duplicate message; an unconfigured store shows the unavailable message; double-clicks are ignored while a request is in flight; requests over 5 per minute per IP get the failure message.
- Venue form: saves and confirms; requires venue, city, email and type; rejects non-http websites.
- No email address is logged by the server.

## Not verified

- Supabase writes. The adapter follows Supabase's REST API (201 on insert, 409 on unique violation) but there were no credentials in this session. Test one signup after adding the keys.
- Real photos. This build machine couldn't reach Unsplash, so every screenshot here shows colour blocks. Vercel's build can reach it. Check the live site, and check that `XLwnQaB0sEg` (work café) downloaded: it may turn out to be an Unsplash+ photo, in which case pick another.
- Lighthouse. Not run here. Run it on the deployed URL; targets are LCP ≤ 2.5 s, CLS ≤ 0.1, accessibility ≥ 95.
- Screen reader pass. Semantics are in place (labelled dialog, tabs, disclosure buttons, field errors tied with aria-describedby) but untested with VoiceOver or NVDA.

## Missing before public launch

- **Privacy policy.** The form collects emails with consent; under UK GDPR it needs a linked policy naming who holds the data. Not drafted, so no legal links are shown.
- **Contact address** for the footer. None supplied, so none is shown.
- **Company name.** If it's Mise Global LLC, confirm and it goes in the policy, not the footer.
- **Original photography**, ideally from Cafes Globally, plus a 1200×630 social share image and a logo (the wordmark is set in type for now).
- **LIVE_CLAUDE mode** isn't built. The preview is fixture-only and says so.
- **Domain** and Vercel project.
