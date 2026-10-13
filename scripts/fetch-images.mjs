// Downloads the site photographs listed in content/images.ts into public/images/.
// Runs before `next build`. A photo that can't be fetched is skipped, and the
// site shows a plain colour block in its place, so a failed download never
// breaks the build. Re-run with --force to replace files already on disk.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/images");
const force = process.argv.includes("--force");

const source = await readFile(path.join(root, "content/images.ts"), "utf8");
const entries = [...source.matchAll(/file: "([^"]+)",\s*unsplashId: "([^"]+)",\s*width: (\d+)/g)].map(
  ([, file, id, width]) => ({ file, id, width: Number(width) }),
);

await mkdir(outDir, { recursive: true });

let failed = 0;
for (const { file, id, width } of entries) {
  const target = path.join(outDir, file);
  if (!force) {
    try {
      await access(target);
      continue;
    } catch {}
  }
  const url = `https://unsplash.com/photos/${id}/download?force=true&w=${width}`;
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) throw new Error(`HTTP ${res.status} ${type}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(target, buf);
    console.log(`images: ${file} ${(buf.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    failed++;
    console.warn(`images: could not fetch ${file} (${id}): ${err.message}. A colour block will show instead.`);
  }
}
if (failed) console.warn(`images: ${failed} of ${entries.length} photos missing.`);
