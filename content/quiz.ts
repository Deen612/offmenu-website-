// The four onboarding questions and five personas from the Off Menu app
// (Deen612/off-menu, packages/engine). Kept word-for-word so a profile made
// on the website means the same thing in the app.

export type QuizAnswers = {
  q1_energy: "quiet" | "relaxed" | "lively" | "buzzing" | "depends";
  q2_priorities: [Priority, Priority];
  q3_novelty: "familiar" | "better" | "sometimes" | "unexpected";
  q4_dealbreaker: "loud" | "overpriced" | "mediocre" | "generic" | "rushed" | "none";
};
export type Priority = "product" | "atmosphere" | "discovery" | "value" | "dwell";

export const questions = [
  {
    id: "q1_energy",
    prompt: "What kind of energy feels right?",
    multi: false,
    options: [
      { id: "quiet", label: "Quiet and calm" },
      { id: "relaxed", label: "Easy and relaxed" },
      { id: "lively", label: "Lively" },
      { id: "buzzing", label: "Full of energy" },
      { id: "depends", label: "Depends on the day" },
    ],
  },
  {
    id: "q2_priorities",
    prompt: "What matters most once you’re there?",
    multi: true,
    options: [
      { id: "product", label: "Exceptional food or drinks" },
      { id: "atmosphere", label: "The atmosphere" },
      { id: "discovery", label: "Somewhere different" },
      { id: "value", label: "Great value" },
      { id: "dwell", label: "Somewhere I can settle in" },
    ],
  },
  {
    id: "q3_novelty",
    prompt: "How much should we surprise you?",
    multi: false,
    options: [
      { id: "familiar", label: "Stick to what I know" },
      { id: "better", label: "Familiar, but better" },
      { id: "sometimes", label: "Surprise me sometimes" },
      { id: "unexpected", label: "Take me somewhere unexpected" },
    ],
  },
  {
    id: "q4_dealbreaker",
    prompt: "What ruins a place fastest for you?",
    multi: false,
    options: [
      { id: "loud", label: "Too loud or crowded" },
      { id: "overpriced", label: "Overpriced" },
      { id: "mediocre", label: "Mediocre food or drinks" },
      { id: "generic", label: "Too generic" },
      { id: "rushed", label: "Feeling rushed" },
      { id: "none", label: "Nothing really" },
    ],
  },
] as const;

export const PERSONAS = {
  golden_hour: { name: "The Golden Hour", tagline: "You don’t just drink coffee. You experience it." },
  cartographer: { name: "The Cartographer", tagline: "You’d rather find the hidden gem than follow the crowd." },
  regular: { name: "The Regular", tagline: "You found your thing and you’re not apologising for it." },
  deep_end: { name: "The Deep End", tagline: "You’re here to get things done. Coffee is the tool." },
  connector: { name: "The Connector", tagline: "For you, coffee is something you do with people." },
} as const;
export type PersonaKey = keyof typeof PERSONAS;

const ENERGY: Record<QuizAnswers["q1_energy"], number | null> = { quiet: 15, relaxed: 35, lively: 70, buzzing: 90, depends: null };
const NOVELTY: Record<QuizAnswers["q3_novelty"], number> = { familiar: 0.15, better: 0.4, sometimes: 0.7, unexpected: 1 };
const TIE_ORDER: PersonaKey[] = ["cartographer", "golden_hour", "regular", "deep_end", "connector"];
const LINKED: Record<Priority, PersonaKey> = {
  atmosphere: "golden_hour",
  discovery: "cartographer",
  product: "regular",
  value: "regular",
  dwell: "deep_end",
};

/** Same scoring as the app's engine/persona.ts. */
export function personaFor(a: QuizAnswers): PersonaKey {
  const has = (d: Priority) => a.q2_priorities.includes(d);
  const e = ENERGY[a.q1_energy];
  const n = NOVELTY[a.q3_novelty];
  const points: Record<PersonaKey, number> = {
    golden_hour: (has("atmosphere") ? 2 : 0) + (e === 15 || e === 35 ? 1 : 0),
    cartographer: (has("discovery") ? 2 : 0) + (n >= 0.7 ? 1 : 0),
    regular: (has("product") ? 2 : 0) + (has("value") ? 1 : 0) + (n <= 0.4 ? 1 : 0),
    deep_end: (has("dwell") ? 2 : 0) + (a.q4_dealbreaker === "rushed" ? 1 : 0),
    connector: (e === 70 ? 2 : 0) + (e === 90 ? 3 : 0),
  };
  const best = Math.max(...Object.values(points));
  const tied = TIE_ORDER.filter((k) => points[k] === best);
  const linked = LINKED[a.q2_priorities[0]];
  return tied.includes(linked) ? linked : tied[0];
}

export function isQuizAnswers(v: unknown): v is QuizAnswers {
  const a = v as Record<string, unknown>;
  if (!a || typeof a !== "object") return false;
  const ok = (qid: string, val: unknown) =>
    questions.find((q) => q.id === qid)!.options.some((o) => o.id === val);
  const p = a.q2_priorities;
  return (
    ok("q1_energy", a.q1_energy) &&
    Array.isArray(p) && p.length === 2 && p[0] !== p[1] && p.every((x) => ok("q2_priorities", x)) &&
    ok("q3_novelty", a.q3_novelty) &&
    ok("q4_dealbreaker", a.q4_dealbreaker)
  );
}
