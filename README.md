# Off Menu website

Prelaunch homepage for Off Menu, built to `docs/brief.md` (the Claude Code brief of 13 October 2026). Next.js 16, TypeScript, plain CSS.

```bash
npm install
cp .env.example .env.local   # then pick a store, see below
npm run dev                  # http://localhost:3000
npm test                     # validation and preview-ranking tests
npm run build                # downloads photos first, then builds
```

## Collecting emails (how the backend works)

1. Someone types their email on the order slip. `POST /api/waitlist` saves it **straight away**, before any quiz, with city, consent time, a referral code and a private edit token.
2. The four taste questions follow. `PATCH /api/waitlist` adds the answers and persona to the same row, matched by the edit token. People who quit halfway are still on the list.
3. If Resend is set up, they get a confirmation email with their invite link.
4. `/admin` (password from `ADMIN_PASSWORD`) shows totals, signups by city and persona, top referrers and the latest 200 signups, with **Download all emails (CSV)**.

## Waitlist and venue forms

`/api/waitlist` and `/api/partner` save to whatever `SIGNUP_STORE` names:

| `SIGNUP_STORE` | What happens |
| --- | --- |
| `supabase` | Rows go into Supabase. Production setting. |
| `file` | Rows go into `.data/*.json`. Local testing only; ignored on Vercel. |
| unset | Forms say "Waitlist signup isn't available yet." Nothing is faked. |

Supabase setup, about five minutes:

1. Create a free project at supabase.com.
2. SQL editor → paste `supabase/schema.sql` → Run.
3. Project settings → API: copy the project URL and the `service_role` key.
4. In Vercel (or `.env.local`): `SIGNUP_STORE=supabase`, `SUPABASE_URL=…`, `SUPABASE_SERVICE_ROLE_KEY=…`, `ADMIN_PASSWORD=…`.
5. Optional: a free Resend account for confirmation emails: `RESEND_API_KEY`, `EMAIL_FROM` (verify your domain in Resend first).

Signups appear under Table editor → `waitlist_signups`, one row per normalized email, with city, source, consent time and consent-copy version. Export as CSV from there. The service key stays on the server; row level security blocks the public key.

## Photos

`scripts/fetch-images.mjs` downloads the Unsplash photos listed in `content/images.ts` into `public/images/` before every build, so the live site serves its own copies. Any that fail show as a plain colour block. Swap in your own photography by replacing the files (same names) and editing the alt text.

## Where things live

- `content/copy.ts`: every sentence on the page
- `content/fixtures.ts`: the example places and the preview's ranking rules
- `components/`: Header, Hero, DiscoveryPreview, Collections, Planned (offers + passport), BrandStory, FAQ, Signup, PartnerForm, PreviewModal
- `NOTES.md`: what was verified, what changed from the brief, what's still missing before launch
