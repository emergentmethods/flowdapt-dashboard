"use client";

import { Card, Title, BarChart, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";

import { MetricsData, MetricsOptions, metricsDefinition } from "./utils";
import useDictionaries from "@/hooks/useDictionaries";
import WorkflowRunsClient from "./WorkflowRunsClient";
import { IWorkflowRunsData } from "./Metrics";
import { use } from "react";

interface IMetricsClientProps {
  dataPromise: Promise<{
    metricsData: MetricsData;
    runs: IWorkflowRunsData[];
  }>;
}

const MetricsClient = (props: IMetricsClientProps) => {
  const { dataPromise } = props;
  const { metricsData, runs } = use(dataPromise);
  const tabs = Object.keys(metricsData) as MetricsOptions[];
  const dict = useDictionaries();

  return (
    <Card className="mt-6">
      <Title>{dict.home.metrics}</Title>
      <TabGroup>
        <TabList className="mt-8">
          {[
            ...tabs.map((item, index) => {
              return <Tab key={index}>{item}</Tab>;
            }),
            <Tab key="workflowExecution">{dict.home.metricsNumberOfWorkflowsExecutions}</Tab>,
          ]}
        </TabList>
        <TabPanels>
          {tabs.map(item => {
            const itemData = metricsData[item] || [];
            const categories =
              metricsDefinition[item]?.data.map(itemMetrics => itemMetrics.name) || [];
            const colors =
              metricsDefinition[item]?.data.map(itemMetrics => itemMetrics.color) || [];
            return (
              <TabPanel key={item}>
                <BarChart
                  className="mt-6"
                  data={itemData}
                  index="topic"
                  categories={categories}
                  colors={colors}
                  yAxisWidth={48}
                />
              </TabPanel>
            );
          })}
          <TabPanel>
            <WorkflowRunsClient workflowRuns={runs} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default MetricsClient;
