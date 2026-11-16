import HomePage from "@/components/HomePage";
import { CONTENT } from "@/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en");

export default function Page() {
  return <HomePage content={CONTENT.en} />;
}
