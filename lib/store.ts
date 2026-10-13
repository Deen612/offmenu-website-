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
