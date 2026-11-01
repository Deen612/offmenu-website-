import { Shell } from "@/components/Shell";
import { storeConfigured } from "@/lib/store";

// Re-evaluated on each request so the form reflects the live store configuration.
export const dynamic = "force-dynamic";

export default function Page() {
  return <Shell configured={storeConfigured()} />;
}
