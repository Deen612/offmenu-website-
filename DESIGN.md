# Off Menu design system

The site is a preview of the app. In five seconds a visitor should know three
things: it's an app, it picks cafés and restaurants for your taste, and members
get deals and rewards. Layout follows the previous Opulist-style version (photo
hero, phone demo); copy and signup come from the menu-card version.

Direction: magazine calm. White page, big real photographs, a serif for
headings, a plain grotesk for everything you act on. One copper accent.
Based on the Opulist reference screenshots in the brief and the founder's
feedback, not a library comparison (UXKIN was unavailable).

## Colour

| Token | Value | Role |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--cream` | `#F3EEE7` | Alternate bands (app demo, deals) |
| `--ink` | `#141311` | Text, primary buttons, dark bands |
| `--ink-2` | `#2A2724` | Secondary text on white |
| `--muted` | `#6B625A` | Captions, fine print (4.9:1 on white) |
| `--line` | `#DED7CE` | Dividers, input borders |
| `--accent` | `#8F412D` | Copper. Links on hover, selected states, one highlight per screen. Never a large fill. |
| `--on-dark` | `#F3EEE7` | Text on ink bands |
| `--on-dark-muted` | `#B9AFA4` | Secondary text on ink (7.4:1) |
| `--error` | `#A12A1A` | Form errors |

No gradients except the photo scrim behind hero text. No dark mode: the dark
bands (how we pick, signup) are fixed design moments, not a theme.

## Typography

- **Headings:** EB Garamond 400, sentence case, letter-spacing -0.015em.
- **Everything else:** Schibsted Grotesk (variable), 400 / 500 / 600.
- No third family. No monospace, no all-caps eyebrow labels above headings.

| Name | Size / line height | Use |
|---|---|---|
| Display | 88 / 0.98 (44 on phones) | Hero only |
| H2 | 64 / 1.0 (40 on phones) | Section titles |
| H3 | 30 / 1.1 | Card and feature titles |
| Lead | 20 / 1.5 | One line under a section title |
| Body | 17 / 1.55 | Paragraphs, max 62 characters wide |
| Small | 14 / 1.45 | Captions, fine print |

## Spacing and layout

- 8px scale: 8, 16, 24, 32, 48, 64, 96, 128.
- Content width: `min(1312px, 100% - 2 × gutter)`. Gutter 20 / 32 / 40 / 64 px at phone / tablet / laptop / desktop.
- Section padding: 64px phone, 96px tablet, 128px desktop.
- Left-aligned by default. Centre only the signup card.

## Shape and depth

- Radius: 2px photos, 999px buttons and chips, 16px cards and the signup panel, 44px phone frame.
- One shadow, only on the phone mockup: `0 30px 60px -20px rgb(20 19 17 / .45)`.

## Components

- **Primary button:** ink fill, cream text, 48px tall, pill. Hover: copper. Focus: 2px copper outline, 3px offset. Disabled: 60% opacity.
- **Light button** (on photos and dark bands): cream fill, ink text.
- **Text link:** underlined, 1px, 5px offset. Hover: copper.
- **Chip** (demo filters): outline pill, 44px tall; selected = ink fill.
- **Input:** 52px, 1px `--line` border, 10px radius; error border `--error` with the message underneath.
- **Phone mockup:** ink frame, the only shadowed object on the page.
- **Navigation:** links left, logo centred, Request access right. Phones: logo plus menu button.
- **Footer:** ink band, full-width logo, one line of text.

## Imagery

- Real interior photographs only, cropped wide, never with a real venue name beside them.
- No stock illustration, no icons as decoration, no emoji.
- The logo is the only graphic mark.

## Never

Purple or blue gradients, glassmorphism, three identical feature cards,
numbered 01 / 02 / 03 markers, small-caps eyebrow labels, pills like
"Top match", em dashes in copy, invented numbers or testimonials, launch-city
claims.
