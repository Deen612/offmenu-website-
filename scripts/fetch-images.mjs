// Copies the photographs listed in content/images.ts into public/images/.
// Runs before `next build`. A photo that can't be fetched is skipped: the
// page then loads it from Unsplash's CDN, or shows a colour block, so a
// failed download never breaks the build. --force replaces existing files.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/images");
const force = process.argv.includes("--force");

const source = await readFile(path.join(root, "content/images.ts"), "utf8");
const entries = [...source.matchAll(/file: "([^"]+)",\s*photo: "([^"]+)",\s*width: (\d+)/g)].map(
  ([, file, photo, width]) => ({ file, photo, width: Number(width) }),
);

await mkdir(outDir, { recursive: true });

let failed = 0;
for (const { file, photo, width } of entries) {
  const target = path.join(outDir, file);
  if (!force) {
    try {
      await access(target);
      continue;
    } catch {}
  }
  const url = `https://images.unsplash.com/${photo}?auto=format&fm=jpg&fit=crop&w=${width}&q=72`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) throw new Error(`HTTP ${res.status} ${type}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(target, buf);
    console.log(`images: ${file} ${(buf.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    failed++;
    console.warn(`images: could not copy ${file}: ${err.message}. The page will load it from Unsplash.`);
  }
}
if (failed) console.warn(`images: ${failed} of ${entries.length} photos not copied locally.`);
