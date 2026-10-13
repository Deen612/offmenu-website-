Prepared 13 October 2026. Use this file as the primary instruction for Claude Code. Build a responsive prelaunch website for Off Menu, with an editorial visual design, a working waitlist and an interactive product preview. The primary audience is people choosing cafés and restaurants; startup reviewers are a secondary audience. The primary conversion is a saved waitlist signup.

This is a website specification for the revised product direction. It does not silently rewrite the attached V1 Build Specification 1.1. The proposed product adds AI ranking, feedback-driven personalization, nearby discovery, restaurants, partner offers and a visit passport, which the earlier V1 excluded. Follow this brief for the website. Update the app specification separately before implementing those app features.

# 1 Product and delivery scope

Off Menu will recommend cafés and restaurants around a chosen area using personal preferences, current intent, editorial venue information and feedback. Users can browse an automatic feed without typing every time, search in ordinary language, save places, record visits and see offers from participating businesses. The planned passport records exploration and discovery badges. Cafes Globally supplies the media brand connection, editorial experience and a potential distribution channel. Off Menu is the product name.

Build now: one public homepage, a product-preview modal, working waitlist and partner-interest forms if persistence is configured, responsive navigation, FAQ, and clean submission states. Add approved privacy and terms content only when supplied. Do not turn this task into the complete mobile app, merchant dashboard, payment system or booking platform.

Default mode is a labelled interactive preview with fixture data. A real Claude integration is a separate optional implementation slice. Never describe fixture results as live AI output. There are no confirmed launch-city, launch-date, price, partner-offer or audience-number claims in this brief. Do not manufacture them.

Delivery modes: PREVIEW uses local, clearly illustrative results. LIVE_CLAUDE uses a server endpoint and approved venue records, and can be enabled only after the checks in section 9 pass. Both modes keep the website visibly prelaunch. A configured and tested form may collect real signups in either mode.

# 2 References and screenshot instructions

Primary visual reference: https://www.opulist.co/. Borrow the photographic scale, editorial typography, white space and image-first collection layout. Off Menu keeps its own identity, copy, assets and page structure. Opulist takes priority whenever a secondary reference conflicts with it.

Copy reference: https://roasters.app/. Borrow its direct naming of the product and concrete café use cases. Do not reproduce its wording or its claims about coverage, community size or ranking.

Secondary references: https://beliapp.com/ for map, saved places and visit-history presentation; https://neotaste.com/gb for explaining venue offers and redemption; https://joe.coffee/ for tying discovery to visits and rewards. These are functional references, not five visual themes to mix together.

Included captures are desktop reference screenshots taken on 13 October 2026. They are not licensed website assets. The browser viewport observed on Opulist was 1363 × 936 CSS pixels; screenshot output dimensions may differ. The exact Off Menu values below are new design targets, not purported measurements of the competitors.

| **File in references**             | **Use it for**                                             | **Do not carry over**                            |
|------------------------------------|------------------------------------------------------------|--------------------------------------------------|
| 01-opulist-desktop-hero.jpg        | Two large image panels, serif scale, restrained navigation | Logo, competitor text, carousel content          |
| 02-opulist-desktop-collections.jpg | Large collection images, titles below, open card treatment | City coverage, collection counts                 |
| 03-roasters-desktop-hero.jpg       | Short product explanation beside a legible app preview     | Typography system, store badges, coverage claims |
| 04-neotaste-desktop-offers.jpg     | Discovery and offers explained with app screens            | Brand green, ratings, confirmed discounts        |
| 05-beli-desktop-map.jpg            | Map preview and a clear product use case                   | Social network, scores, download claims          |
| 06-joe-desktop-rewards.jpg         | Café photography and a tangible member benefit             | Ordering, wallet, universal rewards claims       |

Some captures retain cookie notices. Ignore them when designing; they are incidental reference-page UI. For additional screenshots, capture Opulist's mobile homepage at 390 × 844, a full collection row at 1440 × 900, and one venue detail page. Capture NeoTaste's choose/book/redeem section if deal flow needs more detail. These additional views are requested references, not included or verified captures. Do not delay the first implementation if they are unavailable.

# 3 Visual system and exact layout targets

Use a white editorial page, large warm photographs of cafés and dining rooms, black text and a restrained burnt-copper accent. Use original Off Menu photographs where supplied. Avoid gradients, glass panels, AI illustrations, floating geometric decorations, oversized feature-icon grids and repeated rounded white boxes.

| **Token**                    | **Desktop target**                               | **Mobile target**  |
|------------------------------|--------------------------------------------------|--------------------|
| Page background              | \#FFFFFF                                         | Same               |
| Alternate section background | \#F7F3ED                                         | Same               |
| Main text                    | \#181714                                         | Same               |
| Secondary text               | \#6B625A                                         | Same               |
| Accent and primary button    | \#8F412D with white text                         | Same               |
| Dividers                     | \#DED7CE, 1 px                                   | Same               |
| Heading type                 | Cormorant Garamond, weight 500; Georgia fallback | Same               |
| Body and UI type             | Inter, weights 400 / 500 / 600; system fallback  | Same               |
| H1                           | 80 px / 76 px, tracking -0.02em                  | 44 px / 44 px      |
| H2                           | 48 px / 50 px                                    | 32 px / 34 px      |
| Card title                   | 28 px / 30 px                                    | 24 px / 27 px      |
| Body                         | 18 px / 28 px                                    | 16 px / 24 px      |
| UI and navigation            | 14 px / 20 px                                    | 14 px / 20 px      |
| Metadata                     | 12 px / 18 px                                    | 12 px / 18 px      |
| Button height and radius     | 48 px; 4 px radius                               | 48 px; 4 px radius |
| Photo radius                 | 0 px                                             | 0 px               |
| Form input height            | 52 px                                            | 52 px              |
| Spacing scale                | 4, 8, 12, 16, 24, 32, 48, 64, 80, 96 px          | Use same scale     |

Load the chosen fonts legally, preferably as local WOFF2 files. Do not copy Apple Garamond files from Opulist. The observed Opulist heading stack included Apple Garamond with Playfair Display and Georgia fallbacks; one large carousel title was 100 px with a 90 px line height. Cormorant is an original Off Menu implementation choice, not an exact font match.

Container formula: width = min(1312 px, viewport width minus twice the horizontal gutter). Gutters are 64 px at widths ≥1280, 40 px at 1024–1279, 32 px at 768–1023, and 20 px below 768. At 1440 px the container is 1312 px. At 390 px it is 350 px. At 1920 px it remains centred at 1312 px. Account for scrollbar width.

Use 24 px desktop grid gaps, 20 px tablet gaps and 16 px mobile gaps. Standard section padding is 80 px top/bottom desktop, 64 px tablet and 48 px mobile. Use content-driven heights except for the hero photo. Pixel tolerances are ±4 px for spacing at the target viewport; typography may wrap differently with actual font rendering. Never shrink text to force a fixed page height.

Breakpoints: desktop ≥1024 px, tablet 768–1023 px, mobile \<768 px. At 1024–1279 use H1 60/60 px and H2 40/42 px; at 768–1023 use the same type sizes but stack the hero, recommendation controls, offers and passport into single columns. The tablet hero photo is 480 px high. At ≥1280 use the desktop typography table. Below 768 use the mobile typography table. At tablet and mobile widths, navigation collapses to the menu button. Collection grids alone keep two columns on tablet. Card photo ratios remain 4:3 at every width.

# 4 Homepage composition

At 1440 × 900: header y=0–88, hero starts y=112, hero ends y=752, next section begins after 80 px. Header: 88 px high, centred wordmark in a three-column grid; left links Discover / Offers / Passport; right For venues and Join the waitlist. Use a real text wordmark until an approved logo is supplied. On mobile: 64 px header, wordmark left, menu button right, no stacked desktop links.

Hero: two equal columns, 644 px each at 1440, with a 24 px gap. Height 640 px. Left is cream with 40 px inner padding; right is one warm café or restaurant photograph with a small product-preview panel. Left content order: prelaunch label, H1, paragraph, two buttons, Cafes Globally attribution. Use 24 px between major elements, 12 px between buttons. Keep the heading to roughly three lines with a 564 px text width. Let content increase the hero height if text zoom requires it.

Hero image: full-height object-fit cover. Preserve a dining-room or café interior, table and natural lighting. Product panel is 280 × 400 px on desktop, bottom/right inset 32 px, with a 12 px radius and a subtle shadow. It shows the nearby feed with two compact example cards, an area label and a visible Product preview label. Do not make the whole hero a phone mockup. Small UI text in this decorative preview may be scaled, but all controls needed to operate the demo must appear at readable sizes in the modal.

Mobile hero: one column. Text padding 24 px inside the cream panel; photograph 350 × 420 px at 390 width. The preview panel scales to 220 × 300 px and is decorative. Put the primary CTA before the photograph so it is visible in the initial 844 px viewport. Keep secondary CTA as a text link if two buttons crowd the row.

Section order after the hero: (1) recommendation preview, (2) editorial collections, (3) partner offers, (4) passport, (5) Cafes Globally story, (6) FAQ, (7) waitlist, (8) compact partner-interest strip, (9) footer. Every navigation item anchors to a real section. There is no startup-program section in the consumer page.

Recommendation preview: title and two-sentence copy above a cream panel; desktop panel uses a 40% preference controls / 60% results grid, 32 px padding and 24 px gap. Controls include Café / Restaurant, example area, Quiet / Lively, Work / Friends / Date and sample search requests. Results contain exactly three cards in a vertical list. Mobile controls precede the list; no tiny desktop panel scaled down.

# 5 Components and responsive behaviour

Collections: three cards per row on desktop, two on tablet and one below 768. At 1440, each is (1312 minus 48) / 3 = 421.33 px wide. Photo aspect ratio 4:3 gives 316 px height. Titles and descriptions sit below photographs on the page background, with 16 px image-to-title spacing. Use three illustrative collections: Coffee and somewhere to work; Dinner for two; A new neighbourhood this weekend. Do not show invented venue counts. Click opens a labelled collection preview.

Offers: 50/50 section with a dining photograph and one example offer panel. Use one specimen offer to explain the mechanics. Label it Example offer. Display eligible item, available times, restrictions and redemption method; the preview button opens terms, never a redeemable coupon. No real partner logos without confirmation.

Passport: cream section with text on the left and a passport screen on the right. Show visited places and one exploration challenge with a progress indicator. Proposed example: Try three different cafés, 1 of 3 visited. Show a discovery badge, not a monetary balance. Mark all values as demonstration data. Mobile stacks explanation above the passport.

Cafes Globally: one photograph of café editorial work or a café, followed by short attribution copy. Do not insert follower counts or client logos. This is a supporting section, smaller than the discovery and offers sections.

FAQ: max-width 840 px, left-aligned questions, 1 px dividers, minimum 64 px question rows. Answers wrap with readable line height; opening an answer increases the row naturally. Use accessible disclosure buttons.

Waitlist: cream panel with heading left and form right at desktop. Form max-width 480 px. Email and city fields have visible labels; optional city must be marked optional. Consent checkbox starts unchecked and is required for launch-update signup. Error text appears under its field. On mobile both inputs and button are full-width.

Partner strip: one short paragraph and Register your interest button, which opens a separate form. Fields: venue name, city, contact email, café/restaurant selector, optional website. Confirmation must reflect an actually saved request. Do not promise listing, approval, discount terms or immediate partnership.

Footer: wordmark, description, contact link and approved legal links. Do not create empty \# links or a fictional contact address. If contact/legal content is missing, keep those links out of the public build and record the missing material in the implementation notes.

Motion: 160 ms colour transitions; 200 ms menu/modal transitions; optional 400 ms one-time reveal with maximum 12 px movement. Respect reduced motion. Keep content visible when JavaScript is absent. No autoplay carousel, parallax, scroll hijacking, looping count-up numbers or text typewriter effect.

# 6 Exact page copy

Navigation: Discover / Offers / Passport / For venues / Join the waitlist.

Hero label: In development.

H1: Find cafés and restaurants that fit your taste.

Hero paragraph: Off Menu is being built to recommend places nearby based on what you like, what you want to spend and what you’re in the mood for.

Primary button: Join the waitlist. Secondary button: See the preview.

Attribution: From the team behind Cafes Globally.

Recommendation heading: Find somewhere for today.

Recommendation paragraph: Choose a quiet café to work in or find dinner for two within your budget. We’re building Off Menu to recommend places around those preferences, with AI helping choose which cafés and restaurants to show.

Preview label: Product preview. Example places and results.

Search placeholder: Try “a quiet café where I can work”.

Sample search buttons: Coffee and somewhere to work / Dinner for two / Somewhere lively with friends.

Collections heading: Plan your next coffee or dinner.

Collection descriptions: Cafés for coffee and time with your laptop. / Restaurants for an evening together. / Save a few places and spend the afternoon exploring.

Offer heading: Try somewhere new with a local offer.

Offer paragraph: We’re planning offers with participating cafés and restaurants. Check what’s included, when it applies and how to use it before you visit.

Offer status: Partner offers are planned. Availability will depend on your city.

Example offer copy: Example offer / Two coffees for the price of one / Selected drinks · Weekdays, 2–5 pm / Example terms. This offer cannot be redeemed.

Passport heading: Keep a record of the places you’ve tried.

Passport paragraph: We’re building a café and restaurant passport with your visits, saved places and discovery badges. Follow a neighbourhood challenge or return to somewhere you loved.

Passport example: Try three different cafés / 1 of 3 visited / Discovery badge / Preview only.

Cafes Globally heading: From the team behind Cafes Globally.

Cafes Globally paragraph: Our work with Cafes Globally is about finding cafés and telling their stories. Off Menu brings that experience into a product that helps you choose where to go for coffee or dinner.

Waitlist heading: Tell us where you’d like to use Off Menu.

Waitlist paragraph: Join the waitlist for news about the first city and when you can try the app.

Form labels: Email address / Your city (optional).

Consent: Send me Off Menu launch updates by email. I can unsubscribe at any time.

Success: You’re on the Off Menu waitlist. We’ll email you with launch updates.

Duplicate: This email address is already on the Off Menu waitlist.

Email error: Enter a valid email address.

Consent error: Select the checkbox to receive Off Menu launch updates.

Failure: We couldn’t save your signup. Please try again.

Unconfigured form: Waitlist signup isn’t available yet. Please check back soon.

Partner heading: For cafés and restaurants.

Partner paragraph: We’re looking for cafés and restaurants interested in joining our first city and offering something for Off Menu members to try.

Partner button: Register your interest.

Partner success: Thanks for your interest in Off Menu. We’ve received your venue details.

Footer: OFF MENU / Café and restaurant discovery. / From the team behind Cafes Globally.

Page title: Off Menu \| Cafés and Restaurants for Your Taste.

Meta description: Off Menu is building personalized café and restaurant discovery, with nearby recommendations, planned partner offers and a visit passport. Join the waitlist.

Social title: Off Menu \| Find your next café or restaurant.

Social description: Nearby recommendations around your taste. From the team behind Cafes Globally. Join the Off Menu waitlist.

Keep the approved copy short. Do not introduce slogans about experiences, journeys, possibilities or transformation. Do not add em dashes, fake testimonials, invented ratings, partner names, launch dates or savings claims.

# 7 Exact FAQ and product screens

What is Off Menu?

Off Menu is a café and restaurant discovery app in development. We’re building recommendations around your preferences and chosen area, with planned partner offers and a record of the places you’ve visited.

How will recommendations work?

We plan to combine your preferences, search requests and feedback with information about nearby cafés and restaurants. AI will help interpret what you’re looking for and rank eligible places from our selected database.

Will I have to search every time?

The planned app will show a feed for your chosen area using your saved preferences. You’ll also be able to describe what you want for a particular visit.

How will offers work?

Participating cafés and restaurants will set their own offer terms. You’ll be able to check eligible items, times and restrictions before claiming an offer. Partnerships and offers are still being developed.

What is the passport?

The planned passport will keep your café and restaurant visits together. Discovery challenges and badges will give you a way to record the neighbourhoods and places you’ve explored.

Where can I use Off Menu?

We haven’t announced the first city yet. Add your city when you join the waitlist.

Include five Off Menu screens as product previews, not screenshots from a launched app. If actual implemented screens exist, use them and state the correct status. Otherwise construct original HTML/CSS screens using these specifications; never copy another app's screen and replace its logo.

| **Screen**        | **Contents**                                                                                     | **Purpose**                   |
|-------------------|--------------------------------------------------------------------------------------------------|-------------------------------|
| Nearby feed       | Example area, café/restaurant filter, three photo cards, Top match label, short supported reason | Automatic personal discovery  |
| Search and result | One request, interpreted controls, three changed results, clear reset action                     | AI search role                |
| Venue detail      | Photograph, category, neighbourhood, review excerpt, what to order, facts with unknown states    | Grounded venue information    |
| Offer detail      | Example offer, eligibility, times, restrictions, preview terms                                   | Explain partner redemption    |
| Passport          | Saved/visited tabs, 1-of-3 challenge, badge, explicit preview state                              | Exploration and return visits |

For exported portrait app screens use a 390 × 844 CSS-pixel artboard; export at 2× as 780 × 1688 PNG. Preserve the screen's ratio in a device frame. No numeric match percentage, public star-rating imitation, fabricated reviews or live offer barcode. On the website, these screens must be available at readable size in a modal with a descriptive caption.

# 8 Interactive preview and forms

Homepage preview runs without an account and without location permission. Default area reads Example area. Selecting Café or Restaurant changes the specimen cards; selecting an occasion changes the sample ordering and reasons. The selected control must show its state. Save buttons toggle and persist preview saves locally; they never imply a server account was created.

PREVIEW search offers three clickable sample requests. They update fixture results and visibly say Illustrative results. If free text is enabled, either apply supported local rules and label that behaviour or explain that live search is not available. Do not put a loading animation in front of a canned result and call it Claude.

The preview modal is at most 960 px wide and 90dvh high on desktop, with internal scrolling. On mobile it is a full-height sheet using 100dvh. Close button is 44 × 44 px minimum. Trap focus, support Escape, return focus to the opening button and lock background scroll. Clicking a collection or offer opens the relevant preview tab. Offer CTA reads View example terms; passport actions modify demonstration state only.

Waitlist CTA scrolls to the form and focuses the email field. Submit validates email and consent on client and server. Disable duplicate in-flight submission. Show success only after the persistence service confirms the record. Trim and normalize email for deduplication; preserve submitted display values as appropriate. Record source, city, consent timestamp and consent-copy version. Do not place raw email or precise location in analytics events or console logs.

If no database, email platform or endpoint is configured, the form must show the unconfigured message and never fake success. Reuse an existing approved backend when available; otherwise provide a documented server adapter. Local storage alone is not a functioning mailing-list signup. Partner-interest capture follows the same persistence requirement. These public forms do not send outreach messages.

The planned app can offer Use my location only after a user taps it, with manual area entry as an alternative. This landing-page preview does not request geolocation on page load. No city is presented as launched merely because a user selects it. Dietary preferences and allergy information must preserve unknown states. Where dietary information is displayed, render: Allergen information is provided by the venue. Confirm preparation and cross-contamination directly.

# 9 Proposed AI behaviour and website implementation

This section describes the revised product architecture, not work already completed. The optional live demo should demonstrate a real Claude role in ranking, beyond interpreting a query. The complete recommendation service remains separate from the marketing-site build.

1\. Obtain chosen area and preferences, plus any request and explicit feedback. Do not require a conversational message to produce the first feed.

2\. Use approved venue records and geographic retrieval to produce nearby candidates. Code enforces editorial eligibility, distance, category and known constraints. Check current offer availability only when displaying or filtering offers; a venue without a deal can still be recommended. Partner payments must not change organic fit order; any sponsored placement must be separately labelled.

3\. Give Claude a bounded candidate set, supported venue attributes and a taste summary. Ask for structured venue IDs in preference order, brief grounded reasons and missing-information flags. Claude may change preference order among eligible candidates; it cannot admit a rejected venue.

4\. Validate returned IDs, remove duplicates and reject reasons unsupported by the supplied records. Recheck hard constraints before rendering. Never fabricate menu items, open status, allergy suitability, distance or available deals.

5\. If Claude fails or times out, use a documented baseline ordering and identify the fallback in demo diagnostics. Do not claim the fallback was generated by Claude.

6\. Store explicit feedback separately and update a preference summary for subsequent requests. Behavioural learning is a later implementation task unless actually built and tested. A saved place is not equivalent to a positive visit rating.

Keep Claude credentials and vendor calls server-side. Use bounded inputs, output validation, rate limits and request budgets. Treat venue text as data, not instructions. Avoid sending exact user coordinates if neighbourhood or distance values are enough for ranking. Hard filters remain testable in code; AI contributes preference interpretation, venue reranking and explanations.

Use the project's existing framework and conventions. For an empty repository, a suitable default is Next.js with TypeScript and responsive CSS; this is an implementation recommendation, not an existing dependency claim. Check current official documentation before selecting versions. Keep text and specimen data in editable configuration files; component boundaries should follow Header, Hero, DiscoveryPreview, Collections, Offers, Passport, BrandStory, FAQ, Signup and Footer.

Separate fixture mode from live mode in configuration. Images use explicit dimensions, responsive sources, loading placeholders and appropriate alt text. Load the hero image eagerly and lower images lazily. No third-party photo hotlinks or copied competitor images in the published site. Asset placeholders must be identified in the development notes.

Do not invent a legal company name in the footer. If ownership is confirmed as Mise Global LLC, use that name in the approved policies and application company fields. A corporate ownership assumption is not supplied legal-policy content.

# 10 Asset list and quality acceptance

Required original assets: hero-interior.jpg, work-cafe.jpg, dinner-table.jpg, neighbourhood.jpg, offer-venue.jpg, editorial-story.jpg, off-menu-logo.svg if available, and a 1200 × 630 social-share image. Preferred source widths: 1800 px hero, 1200 px collection photos, 1600 px split-section images. Photograph requirements: real hospitality spaces, useful seating detail and natural colours. Do not imply that a photographed business is a partner without permission and confirmation. If an approved stock image is used, document its source and licence and avoid attaching a real venue's name to it.

The reference JPEGs are instructions, not production assets. Keep them in references/. Store Off Menu-owned assets separately in public/images/. Ensure the site still renders legibly when assets are missing, while documenting which assets must be replaced before publication.

Review at 1440 × 900, 1280 × 800, 1024 × 768, 768 × 1024, 390 × 844 and 360 × 800. At 1440 the content width is 1312, hero columns are 644, and collection cards are 421.33 px. At 390 the content width is 350, header height 64 and hero photograph height 420. At 360 content width is 320. Tolerance: ±4 px for specified layout spacing. Use content-driven page length, not a fixed full-page height.

Acceptance: no horizontal page scroll; readable text at 200% zoom; visible focus states; keyboard-operable menu, modal and FAQ; meaningful headings with one H1; 44 × 44 px minimum interactive targets; text contrast at least 4.5:1 for normal text and 3:1 for large text. Decorative hero UI cannot be the only way to access a feature. Mobile CTA is visible before the photo; desktop hero is visible within the first 900 px.

Forms: verify valid signup, invalid email, unchecked consent, duplicate, network failure, unconfigured backend and repeated submission. Confirm saved records before success. Product preview: verify each filter changes a visible result; fixture labels remain visible; real search never claims an invented offer; every link has a meaningful destination or is omitted. Test reduced motion and long text without clipping.

Performance targets under a documented mobile Lighthouse run: LCP ≤2.5 s, CLS ≤0.1 and accessibility score ≥95. These are targets, not guaranteed production results. Log the test profile and blockers; measure before claiming success. Aim for initial compressed hero media ≤350 KB, lower-card images ≤150 KB each, with visual quality reviewed rather than file size alone.

Capture implemented Off Menu screenshots at 1440 × 900 and 390 × 844, plus full-page desktop/mobile and modal/form success states. Write a short verification report stating what passed, what remains a preview and which credentials, assets or policies are missing. Review the layout diagrams as composition guides, not pixel-perfect finished designs.

# 11 Prompt to give Claude Code

Build the Off Menu prelaunch website from this brief and the reference screenshots. Read the complete brief first and inspect the existing repository before changing files. Use Opulist as the primary visual direction and Roasters as the copy-tone reference; Beli, NeoTaste and JOE inform specific product sections. Keep the approved copy intact.

Implement the measured desktop and mobile layouts, then the labelled discovery preview, collection previews, offer terms, passport preview, FAQ and forms. Default to PREVIEW mode. Keep fixture data visibly illustrative. Enable LIVE_CLAUDE only with a genuine server integration, approved venue records, validated results and tested fallback behaviour. Do not pretend a mocked recommendation is live AI.

Continue until the website is usable and verified. Reuse the repository's stack; avoid introducing unrelated features. If form persistence or approved legal content is missing, implement the correct unavailable state and document the integration requirement. Do not claim signup success without saving the record. Do not add invented venues, partnerships, audience counts, prices or launch dates.

Test the stated viewports and interactive states, take desktop and mobile screenshots, compare the rendered design with the references, and fix clipping, weak typography, broken actions and generic card layouts. Return the completed site, a validation summary and a precise list of remaining launch dependencies. Deployment is a separate action unless explicitly requested.

# 12 Source and reference record

Product source: supplied Off Menu V1 Build Specification 1.1 Final, plus the founder's subsequent instructions expanding the product to AI recommendations, cafés and restaurants, nearby discovery, offers and gamification. The source DOCX remains unmodified.

Design references reviewed on 13 October 2026: Opulist https://www.opulist.co/; Roasters https://roasters.app/; Beli https://beliapp.com/; NeoTaste https://neotaste.com/gb; JOE https://joe.coffee/. Website content was inspected in the preceding research, and the desktop screenshots in this package were captured for visual reference. Reference sites may change.

All Off Menu colours, dimensions, type choices, layout diagrams, challenge mechanics and specimen offers in this brief are proposed design or product decisions. They are not measurements of a launched Off Menu app, signed partner commitments or claims that the product qualifies for a startup program.

Composition guides in this package: diagrams/desktop-1440.png and diagrams/mobile-390.png. Inspect both before implementation. The DOCX appends the diagrams and six reference images; the Markdown is the complete machine-readable build instruction.

# Composition diagrams

These original diagrams show the agreed geometry and hierarchy. Photographs are represented by colour fields. They are layout guides, not finished website designs.

<img src="media/image1.png" style="width:7in;height:4.375in" />

Desktop 1440 × 900. Content width 1312 px. Two hero columns of 644 px with a 24 px gap.

# Mobile composition

At a 390 px viewport, the page uses 20 px horizontal gutters and a 350 px content width. The primary signup action appears before the photograph. The copper line marks the bottom of an 844 px viewport; the page continues below it.

<img src="media/image2.png" style="width:2.55273in;height:7.2in" />

Mobile 390 px wide. The line marks the 844 px viewport. The page continues below it.

# Reference screenshots 1

## 01 opulist desktop hero

<img src="media/image3.jpg" style="width:5.8in;height:3.98427in" />

## 02 opulist desktop collections

<img src="media/image4.jpg" style="width:5.8in;height:3.98427in" />

# Reference screenshots 2

## 03 roasters desktop hero

<img src="media/image5.jpg" style="width:5.8in;height:3.98427in" />

## 04 neotaste desktop offers

<img src="media/image6.jpg" style="width:5.8in;height:3.98298in" />

# Reference screenshots 3

## 05 beli desktop map

<img src="media/image7.jpg" style="width:5.8in;height:3.98427in" />

## 06 joe desktop rewards

<img src="media/image8.jpg" style="width:5.8in;height:3.98427in" />
