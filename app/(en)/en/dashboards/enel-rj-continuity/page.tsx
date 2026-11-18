import DashboardPage from "@/components/DashboardPage";
import { CONTENT } from "@/content";
import { buildDashboardMetadata } from "@/lib/dashboard";

export const metadata = buildDashboardMetadata("en");

export default function Page() {
  return <DashboardPage content={CONTENT.en} />;
}
