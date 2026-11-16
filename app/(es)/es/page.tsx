import HomePage from "@/components/HomePage";
import { CONTENT } from "@/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("es");

export default function Page() {
  return <HomePage content={CONTENT.es} />;
}
