import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { PhotoProvider } from "@/components/Photo";
import { Shell } from "@/components/Shell";
import { storeConfigured } from "@/lib/store";

// Re-evaluated on each request so the forms reflect the store configuration
// of the running deployment, not of the machine that built it.
export const dynamic = "force-dynamic";

function photoFiles(): string[] {
  const dir = path.join(process.cwd(), "public/images");
  return existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".jpg")) : [];
}

export default function Page() {
  return (
    <PhotoProvider files={photoFiles()}>
      <Shell configured={storeConfigured()} />
    </PhotoProvider>
  );
}
