import { Suspense } from "react";
import MainIndicator from "./DashboardItems/MainIndicators/MainIndicators";
import Health from "./DashboardItems/Health/Health";
import Metrics from "./DashboardItems/Metrics/Metrics";
import LoadingDashboard from "./components/LoadingDashboard";
import { LanguageDictType } from "@/i18n/dictionaries";
interface IDashboardProps {
  dict: LanguageDictType;
}
const Dashboard = (props: IDashboardProps) => {
  const { dict } = props;

  return (
    <div>
      <Suspense fallback={<LoadingDashboard />}>
        <div className="mb-6">
          <MainIndicator />
        </div>
      </Suspense>
      <Suspense fallback={<LoadingDashboard />}>
        <Health dict={dict} />
      </Suspense>
      <Suspense fallback={<LoadingDashboard />}>
        <Metrics />
      </Suspense>
    </div>
  );
};

export default Dashboard;
