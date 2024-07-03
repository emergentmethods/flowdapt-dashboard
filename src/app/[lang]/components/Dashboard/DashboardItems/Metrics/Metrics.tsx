"use server";

import { getMetrics, getWorkflowRunsWithWorkflowName } from "../../dashboardData";
import MetricsClient from "./MetricsClient";
import { handleMetricsData } from "./handleMetricsData";

export interface IWorkflowRunsData {
  workflowName: string;
  allTimes: number[];
  totalItems: number;
  averageTime: number;
}

function getDifferenceInSeconds(date1: string, date2: string): number {
  // Parse dates
  const parsedDate1 = new Date(date1);
  const parsedDate2 = new Date(date2);

  // Get timestamps in milliseconds
  const timestamp1 = parsedDate1.getTime();
  const timestamp2 = parsedDate2.getTime();

  // Calculate difference in milliseconds
  const diffInMilliseconds = Math.abs(timestamp2 - timestamp1);

  // Convert to seconds and return
  return diffInMilliseconds / 1000;
}

const getMetricsPageData = async () => {
  const metricsDataApi = await getMetrics({
    max_length: 2000,
  });

  const metricsData = await handleMetricsData(metricsDataApi);

  const workflowRuns = await getWorkflowRunsWithWorkflowName();
  const runs: IWorkflowRunsData[] = [];
  for (const workflow of workflowRuns) {
    const workflowName = workflow.workflowName;
    const allTimes: number[] = workflow.runs.map((run: any) => {
      if (!run.finished_at || !run.started_at) {
        return 0;
      }
      return getDifferenceInSeconds(run.started_at, run.finished_at);
    });
    const totalItems = allTimes.length;
    const averageTime = totalItems > 0 ? allTimes.reduce((a, b) => a + b, 0) / totalItems : 0;

    runs.push({
      workflowName,
      allTimes,
      totalItems,
      averageTime: parseFloat(averageTime.toFixed(3)),
    });
  }
  runs.sort((a, b) => b.averageTime - a.averageTime);
  return { metricsData, runs };
};

const Metrics = async () => {
  const dataPromise = getMetricsPageData();
  return <MetricsClient dataPromise={dataPromise} />;
};
export default Metrics;
