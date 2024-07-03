import { IHealthClientData } from "./HealthClient";
import { LanguageDictType } from "@/i18n/dictionaries";
import { SystemStatusResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";
import { FLOWDAPT_API_VERSION } from "@/lib/util";

export const handleHealthData = (
  healthData: SystemStatusResponseDTOType[FLOWDAPT_API_VERSION]["data"],
  dict: LanguageDictType
) => {
  const statusData: IHealthClientData[] = [];
  const servicesData: IHealthClientData[] = [];

  statusData.push({ label: dict.home.serverName, value: healthData.name });
  statusData.push({ label: dict.home.serverHostname, value: healthData.hostname });
  statusData.push({ label: dict.home.serverVersion, value: healthData.version });

  if (healthData?.services?.ComputeService?.environment?.dashboard_url) {
    const executor = (healthData?.services?.ComputeService?.executor || "").includes("ray")
      ? "Ray"
      : "Dask";

    const dashboardUrl = `http://${healthData?.services?.ComputeService?.environment?.dashboard_url}`;
    statusData.push({
      label: `${executor} ${dict.home.serverDashboardURL}`,
      value: dashboardUrl,
      type: "link",
    });
  }

  servicesData.push({
    label: dict.home.triggerStatus,
    value: healthData?.services?.TriggerService?.status,
  });
  servicesData.push({
    label: dict.home.computeServiceStatus,
    value: healthData?.services?.ComputeService?.status,
  });
  servicesData.push({
    label: dict.home.numberOfNodes,
    value: (healthData?.services?.ComputeService?.environment?.nodes || []).length,
  });

  return { statusData, servicesData };
};
