import CasePage from "@/components/CasePage";
import { CONTENT } from "@/content";
import { buildCaseMetadata } from "@/lib/case";

export const metadata = buildCaseMetadata("es");

export default function Page() {
  return <CasePage content={CONTENT.es} />;
}
