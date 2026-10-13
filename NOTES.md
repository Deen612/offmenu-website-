# Implementation notes, 13 October 2026

## Changes from the brief (agreed with the founder)

1. **Headline.** Brief: "Find cafés and restaurants that fit your taste." Now: "The places Cafes Globally would send you, sorted for your taste." The old line works for any venue category; the Cafes Globally connection is the one thing a competitor can't claim. The label above it carries "From the team behind Cafes Globally · In development".
2. **Offers and passport share one section**, each with one specimen and a link into the preview, instead of two full sections. Both are unbuilt; the page now spends its space on recommendations and collections. Nav anchors `#offers` and `#passport` still land on their halves.
3. **Waitlist promise.** Paragraph now reads "Add your city and we'll email you when Off Menu opens there. That's the email. No weekly newsletter in between." This is a commitment: don't send newsletters to this list without new consent.
4. **Photos** come from Unsplash (free licence) rather than original shoots. See below.
5. **Revision 2 (founder feedback).** Fonts changed to Instrument Serif (headings) and Geist (body). Hero photo now takes 7/12 of the width; collections use one tall lead image beside two stacked; the Cafes Globally story is a full-width photo with the text laid over its lower edge and now sits before offers/passport; offers and passport each lead with a photo. The brief's 50/50 hero and three-equal-card measurements no longer apply.

6. **Revision 3.** Positioning moved to vetting: every place is visited by the team before it's listed, and the visit notes feed the matching. New section "No listing without a visit" after the hero, plus a FAQ entry defining "vetted". Photos are the founder's five supplied images in `public/photos/` (source and licence to confirm before launch). The Unsplash download step is removed.

7. **Revision 4.** Supplied logo traced to SVG (`components/Logo.tsx`). Type is Archivo (heavy, lower-case headings to match the wordmark) with IBM Plex Mono labels. All copy rewritten. The waitlist is now a Dorsia-style apply flow: city, the app's four taste questions (word-for-word from `off-menu`), persona reveal, email, then a referral link. Saves `taste`, `persona`, `referral_code`, `referred_by` (run the updated `supabase/schema.sql`). New interactive passport demo: three challenges, stamps, badges and four levels.

### Promises this copy makes (keep them or change the words)
- A venue can't pay to be listed; offers never change rankings.
- Every listing starts with an in-person visit.
- Friends brought via referral link are counted and the top referrers get invites first (query in `supabase/schema.sql`).
- The email list is used for the city-launch invite.

8. **Revision 5.** Copy cut to a line or two per section. Page trimmed to: hero, how it works, lists, London demo, passport, request access, FAQ, venues. Demo uses real, well-known London places (founder's call). Safeguards: no photo is ever shown next to a real venue name, no facts are stated beyond name, area and what the place is known for, every unchecked fact shows "Not visited yet", and a disclaimer says Off Menu hasn't reviewed them and has no link with them. Remove the real names before public launch unless each venue agrees.

## Verified (production build, `SIGNUP_STORE=file`, Chromium)

- Layout at 1440×900: container 1312, hero columns 644, hero 640 high starting at y=113 (header 88 + 1 px border + 24), collection cards 421.33. At 390: container 350, photo 420 high, primary CTA ends at y=533 so it's visible before the photo. At 360: container 320. No horizontal scroll at any of the six viewports. One H1.
- Preview: Café/Restaurant, mood and occasion each change the visible cards or reasons (unit-tested and clicked in the browser). Sample requests set the controls by fixed rules and the results stay labelled "Illustrative results". Free-text search is disabled with an explanation, as the brief allows.
- Modal: opens from hero, preview, collections, offer and passport; Escape closes it and focus returns to the opener; Tab is trapped; background scroll locked. Full-height on mobile.
- Waitlist: empty submit shows both field errors; valid submit saves and only then shows success; the same email in different case and spacing returns the duplicate message; an unconfigured store shows the unavailable message; double-clicks are ignored while a request is in flight; requests over 5 per minute per IP get the failure message.
- Venue form: saves and confirms; requires venue, city, email and type; rejects non-http websites.
- No email address is logged by the server.

## Not verified

- Supabase writes. The adapter follows Supabase's REST API (201 on insert, 409 on unique violation) but there were no credentials in this session. Test one signup after adding the keys.
- Real photos. Photos load from images.unsplash.com (or local copies made at build time). This build machine can't reach Unsplash, so every screenshot here shows colour blocks, and the photo IDs in `content/images.ts` were not visually checked. Any ID that fails shows a colour block; look at the live page and swap any picture that doesn't fit its alt text.
- Lighthouse. Not run here. Run it on the deployed URL; targets are LCP ≤ 2.5 s, CLS ≤ 0.1, accessibility ≥ 95.
- Screen reader pass. Semantics are in place (labelled dialog, tabs, disclosure buttons, field errors tied with aria-describedby) but untested with VoiceOver or NVDA.

## Missing before public launch

- **Privacy policy.** The form collects emails with consent; under UK GDPR it needs a linked policy naming who holds the data. Not drafted, so no legal links are shown.
- **Contact address** for the footer. None supplied, so none is shown.
- **Company name.** If it's Mise Global LLC, confirm and it goes in the policy, not the footer.
- **Original photography**, ideally from Cafes Globally, plus a 1200×630 social share image and a logo (the wordmark is set in type for now).
- **LIVE_CLAUDE mode** isn't built. The preview is fixture-only and says so.
- **Domain** and Vercel project.
