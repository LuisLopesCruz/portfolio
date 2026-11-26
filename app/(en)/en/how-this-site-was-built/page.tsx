import CasePage from "@/components/CasePage";
import { CONTENT } from "@/content";
import { buildCaseMetadata } from "@/lib/case";

export const metadata = buildCaseMetadata("en");

export default function Page() {
  return <CasePage content={CONTENT.en} />;
}
