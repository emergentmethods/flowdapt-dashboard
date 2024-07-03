"use client";

import useDictionaries from "@/hooks/useDictionaries";

import { Grid, Card, Flex, Metric, Text } from "@tremor/react";
import { use } from "react";
import {
  PluginReadResponseDTOType,
  WorkflowResourceReadResponseDTOType,
  WorkflowRunReadResponseDTOType,
} from "@emergentmethods/flowdapt-ts-sdk";
import { FLOWDAPT_API_VERSION } from "@/lib/util";

interface IMainIndicatorClientPropsPromise {
  allWorkflows: WorkflowResourceReadResponseDTOType[FLOWDAPT_API_VERSION]["data"][];
  allWorkflowRuns: WorkflowRunReadResponseDTOType[FLOWDAPT_API_VERSION]["data"][];
  allPlugins: PluginReadResponseDTOType[FLOWDAPT_API_VERSION][];
}

interface IMainIndicatorClientProps {
  mainIndicatorPromise: Promise<IMainIndicatorClientPropsPromise>;
}

const MainIndicatorClient = (props: IMainIndicatorClientProps) => {
  const { mainIndicatorPromise } = props;
  const { allWorkflows, allWorkflowRuns, allPlugins } = use(mainIndicatorPromise);
  const dict = useDictionaries();

  const indicatorData = [
    {
      title: dict.home.numberOfWorkflows,
      metric: allWorkflows.length,
    },
    {
      title: dict.home.numberOfWorkflowRuns,
      metric: allWorkflowRuns.length,
    },
    {
      title: dict.home.numberOfPlugins,
      metric: allPlugins.length,
    },
  ];
  return (
    <Grid numItemsLg={3} className="mt-6 gap-6">
      {indicatorData.map(item => (
        <Card key={item.title} decoration="top">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>{item.title}</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
};

export default MainIndicatorClient;
