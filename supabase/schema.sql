-- Run once in the Supabase SQL editor (Project → SQL → New query).
-- Rows are written only by the website's server with the service-role key.
-- Row level security is on with no policies, so the public anon key can
-- neither read nor write these tables.

create table if not exists public.waitlist_signups (
  id               bigint generated always as identity primary key,
  email            text        not null,
  email_normalized text        not null unique,
  city             text,
  source           text        not null default 'homepage',
  consent_at       timestamptz not null,
  consent_version  text        not null,
  taste            jsonb,
  persona          text,
  referral_code    text        not null unique,
  referred_by      text,
  created_at       timestamptz not null default now()
);

create table if not exists public.partner_interest (
  id            bigint generated always as identity primary key,
  venue_name    text        not null,
  city          text        not null,
  contact_email text        not null,
  venue_type    text        not null check (venue_type in ('cafe', 'restaurant')),
  website       text,
  created_at    timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;
alter table public.partner_interest enable row level security;

-- Who brought the most friends, for deciding invite order:
--   select s.email, count(r.id) as friends
--   from waitlist_signups s left join waitlist_signups r on r.referred_by = s.referral_code
--   group by s.email order by friends desc;
