import { FLOWDAPT_API_VERSION, getClient } from "@/lib/util";
import { GetMetricsOptions } from "@emergentmethods/flowdapt-ts-sdk";
import "server-only";
import { WorkflowRunReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

export const getHealth = async () => {
  const flowdaptSDK = getClient();
  const mainData = await flowdaptSDK.system.status();
  return mainData.data;
};

export const getMetrics = async (requestParameters?: GetMetricsOptions) => {
  const flowdaptSDK = getClient();
  const data = await flowdaptSDK.metrics.getMetrics(requestParameters);

  return data;
};

export const getAllWorkflows = async () => {
  const flowdaptSDK = getClient();
  const data = await flowdaptSDK.workflows.listWorkflows();
  return data.map(d => d.data);
};

export const getWorkflowRuns = async () => {
  const flowdaptSDK = getClient();
  const data = await getAllWorkflows();
  let runs: WorkflowRunReadResponseDTOType[FLOWDAPT_API_VERSION][] = [];
  for (const workflow of data) {
    const lastRuns = await flowdaptSDK.workflows.listWorkflowRuns({
      identifier: workflow.metadata.name,
    });
    runs = runs.concat(lastRuns);
  }
  return runs.map(r => r.data);
};

export const getWorkflowRunsWithWorkflowName = async () => {
  const flowdaptSDK = getClient();
  const data = await getAllWorkflows();
  const runs: {
    workflowName: string;
    runs: WorkflowRunReadResponseDTOType[FLOWDAPT_API_VERSION]["data"][];
  }[] = [];
  for (const workflow of data) {
    const lastRuns = await flowdaptSDK.workflows.listWorkflowRuns({
      identifier: workflow.metadata.name,
    });

    runs.push({ workflowName: workflow.metadata.name, runs: lastRuns.map(i => i.data) });
  }
  return runs;
};

export const getAllPlugins = async () => {
  const flowdaptSDK = getClient();
  const data = await flowdaptSDK.plugins.listPlugins();
  const finalData = data.map(d => d.data);
  return finalData;
};
