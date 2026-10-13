import { test } from "node:test";
import assert from "node:assert/strict";
import { isEmail, normalizeEmail, validatePartner, validateWaitlist } from "../lib/validate.ts";
import { rank, sampleRequests, venues } from "../content/fixtures.ts";

test("emails are trimmed and lower-cased for de-duplication", () => {
  assert.equal(normalizeEmail("  Ada@Example.COM "), "ada@example.com");
});

test("email validation", () => {
  for (const ok of ["a@b.co", "first.last+tag@sub.example.org"]) assert.ok(isEmail(ok), ok);
  for (const bad of ["", "a@b", "a b@c.com", "@c.com", "a@.c", `${"x".repeat(250)}@b.co`]) assert.ok(!isEmail(bad), bad);
});

test("waitlist requires email and consent; city optional", () => {
  assert.deepEqual(validateWaitlist({ email: "a@b.co", consent: true }).errors, {});
  assert.deepEqual(validateWaitlist({ email: "nope", consent: false }).errors, { email: true, consent: true });
  assert.deepEqual(validateWaitlist({ email: "a@b.co", consent: "true" }).errors, { consent: true });
  assert.equal(validateWaitlist({ email: "a@b.co", consent: true, city: "  Leeds   city " }).input.city, "Leeds city");
});

test("partner form needs venue, city, email and type; website optional but checked", () => {
  const base = { venue: "V", city: "C", email: "a@b.co", kind: "cafe" };
  assert.deepEqual(validatePartner(base).errors, {});
  assert.deepEqual(validatePartner({ ...base, kind: "bar" }).errors, { kind: true });
  assert.deepEqual(validatePartner({ ...base, website: "javascript:alert(1)" }).errors, { website: true });
  assert.deepEqual(validatePartner({ ...base, website: "https://example.com" }).errors, {});
});

test("ranking returns three cards of the chosen kind with one top match", () => {
  for (const s of sampleRequests) {
    const r = rank({ area: "les", ...s.prefs });
    assert.equal(r.length, 3);
    assert.ok(r.every((x) => x.venue.kind === s.prefs.kind));
    assert.equal(r.filter((x) => x.top).length, 1);
    assert.ok(r.every((x) => x.reason.length > 0));
  }
});

test("each control changes something visible", () => {
  const key = (p: Parameters<typeof rank>[0]) => rank(p).map((r) => r.venue.id + r.reason).join("|");
  const base = { area: "westvillage", kind: "cafe", mood: "quiet", occasion: "work" } as const;
  assert.notEqual(key(base), key({ ...base, area: "williamsburg" }));
  assert.notEqual(key(base), key({ ...base, kind: "restaurant" }));
  assert.notEqual(key(base), key({ ...base, occasion: "friends" }));
  assert.notEqual(key({ ...base, kind: "restaurant", occasion: "date" }), key({ ...base, kind: "restaurant", occasion: "friends" }));
});

test("demo places state no facts we haven't checked", () => {
  assert.ok(venues.every((v) => v.facts.every((f) => f.value === null)));
});

import { isQuizAnswers, personaFor } from "../content/quiz.ts";

test("quiz answers are validated like the app", () => {
  const ok = { q1_energy: "quiet", q2_priorities: ["discovery", "atmosphere"], q3_novelty: "unexpected", q4_dealbreaker: "generic" };
  assert.ok(isQuizAnswers(ok));
  assert.ok(!isQuizAnswers({ ...ok, q2_priorities: ["discovery", "discovery"] }));
  assert.ok(!isQuizAnswers({ ...ok, q2_priorities: ["discovery"] }));
  assert.ok(!isQuizAnswers({ ...ok, q1_energy: "loud" }));
  assert.equal(personaFor(ok as never), "cartographer");
  assert.equal(personaFor({ ...ok, q1_energy: "buzzing", q2_priorities: ["value", "product"], q3_novelty: "familiar" } as never), "regular");
});
