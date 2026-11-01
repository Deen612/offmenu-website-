// Where form submissions are saved. Chosen by SIGNUP_STORE:
//   supabase  inserts through Supabase's REST API with the service-role key
//   file      appends to .data/*.json for local development (refused on Vercel)
//   unset     nothing is configured; the forms say signup isn't available
// Success is only ever reported after the store confirms the write.
import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SaveResult = "saved" | "duplicate" | "unconfigured" | "failed";

export type WaitlistRecord = {
  email: string;
  email_normalized: string;
  city: string | null;
  source: string;
  consent_at: string;
  consent_version: string;
  taste: unknown;
  persona: string | null;
  referral_code: string;
  referred_by: string | null;
  /** Secret, returned only to the person who signed up, so they can add quiz answers later. */
  edit_token: string;
};

export type PartnerRecord = {
  venue_name: string;
  city: string;
  contact_email: string;
  venue_type: "cafe" | "restaurant";
  website: string | null;
};

type Table = "waitlist_signups" | "partner_interest";

function mode(): "supabase" | "file" | null {
  const m = process.env.SIGNUP_STORE;
  if (m === "supabase" && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return "supabase";
  if (m === "file" && !process.env.VERCEL) return "file";
  return null;
}

export function storeConfigured(): boolean {
  return mode() !== null;
}

async function supabaseInsert(table: Table, row: object): Promise<SaveResult> {
  const url = `${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/${table}`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (res.status === 201 || res.status === 204) return "saved";
    if (res.status === 409) return "duplicate";
    // Logged without the request body, so no email address reaches the logs.
    console.error(`store: ${table} insert returned ${res.status}`);
    return "failed";
  } catch (err) {
    console.error(`store: ${table} insert failed: ${(err as Error).name}`);
    return "failed";
  }
}

const dataDir = path.join(process.cwd(), ".data");
let fileQueue: Promise<unknown> = Promise.resolve();

async function fileInsert(table: Table, row: Record<string, unknown>, uniqueKey?: string): Promise<SaveResult> {
  // Serialize writes so two quick submissions can't both pass the duplicate check.
  const run = fileQueue.then(async (): Promise<SaveResult> => {
    const file = path.join(dataDir, `${table}.json`);
    await mkdir(dataDir, { recursive: true });
    let rows: Record<string, unknown>[] = [];
    try {
      rows = JSON.parse(await readFile(file, "utf8"));
    } catch {}
    if (uniqueKey && rows.some((r) => r[uniqueKey] === row[uniqueKey])) return "duplicate";
    rows.push({ ...row, created_at: new Date().toISOString() });
    await writeFile(file, JSON.stringify(rows, null, 2));
    return "saved";
  });
  fileQueue = run.catch(() => {});
  try {
    return await run;
  } catch {
    return "failed";
  }
}

export async function saveWaitlist(record: WaitlistRecord): Promise<SaveResult> {
  const m = mode();
  if (m === "supabase") return supabaseInsert("waitlist_signups", record);
  if (m === "file") return fileInsert("waitlist_signups", record, "email_normalized");
  return "unconfigured";
}

export async function savePartner(record: PartnerRecord): Promise<SaveResult> {
  const m = mode();
  if (m === "supabase") return supabaseInsert("partner_interest", record);
  if (m === "file") return fileInsert("partner_interest", record);
  return "unconfigured";
}

// ---------- Updates and reads (admin, quiz answers) ----------

function sb(pathAndQuery: string, init: RequestInit = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return fetch(`${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
}

async function fileRows(table: Table): Promise<Record<string, unknown>[]> {
  try {
    return JSON.parse(await readFile(path.join(dataDir, `${table}.json`), "utf8"));
  } catch {
    return [];
  }
}

/** Adds quiz answers to a signup that already exists. Matched by its secret edit token. */
export async function updateTaste(editToken: string, taste: unknown, persona: string): Promise<"saved" | "missing" | "failed" | "unconfigured"> {
  const m = mode();
  if (m === "supabase") {
    try {
      const res = await sb(`waitlist_signups?edit_token=eq.${encodeURIComponent(editToken)}`, {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ taste, persona }),
      });
      if (!res.ok) return "failed";
      const rows = (await res.json()) as unknown[];
      return rows.length ? "saved" : "missing";
    } catch {
      return "failed";
    }
  }
  if (m === "file") {
    const run = fileQueue.then(async () => {
      const rows = await fileRows("waitlist_signups");
      const row = rows.find((r) => r.edit_token === editToken);
      if (!row) return "missing" as const;
      Object.assign(row, { taste, persona });
      await writeFile(path.join(dataDir, "waitlist_signups.json"), JSON.stringify(rows, null, 2));
      return "saved" as const;
    });
    fileQueue = run.catch(() => {});
    try {
      return await run;
    } catch {
      return "failed";
    }
  }
  return "unconfigured";
}

export async function listRows(table: Table): Promise<Record<string, unknown>[] | null> {
  const m = mode();
  if (m === "supabase") {
    try {
      const res = await sb(`${table}?select=*&order=created_at.desc&limit=50000`);
      return res.ok ? ((await res.json()) as Record<string, unknown>[]) : null;
    } catch {
      return null;
    }
  }
  if (m === "file") return (await fileRows(table)).reverse();
  return null;
}
