import { Shell } from "@/components/Shell";
import { storeConfigured } from "@/lib/store";

// Re-evaluated on each request so the forms reflect the store configuration
// of the running deployment, not of the machine that built it.
export const dynamic = "force-dynamic";

export default function Page() {
  return <Shell configured={storeConfigured()} />;
}
