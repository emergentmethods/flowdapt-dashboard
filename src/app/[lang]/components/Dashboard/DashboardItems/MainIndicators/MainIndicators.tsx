"use server";

import { getAllPlugins, getAllWorkflows, getWorkflowRuns } from "../../dashboardData";
import MainIndicatorClient from "./MainIndicatorsClient";

const getPageData = async () => {
  const allWorkflows = await getAllWorkflows();
  const allWorkflowRuns = await getWorkflowRuns();
  const allPlugins = await getAllPlugins();
  return { allWorkflows, allWorkflowRuns, allPlugins };
};

const MainIndicator = async () => {
  const mainIndicatorPromise = getPageData();
  return <MainIndicatorClient mainIndicatorPromise={mainIndicatorPromise} />;
};

export default MainIndicator;
