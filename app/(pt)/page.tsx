import HomePage from "@/components/HomePage";
import { CONTENT } from "@/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("pt");

export default function Page() {
  return <HomePage content={CONTENT.pt} />;
}
