import DashboardPage from "@/components/DashboardPage";
import { CONTENT } from "@/content";
import { buildDashboardMetadata } from "@/lib/dashboard";

export const metadata = buildDashboardMetadata("pt");

export default function Page() {
  return <DashboardPage content={CONTENT.pt} />;
}
