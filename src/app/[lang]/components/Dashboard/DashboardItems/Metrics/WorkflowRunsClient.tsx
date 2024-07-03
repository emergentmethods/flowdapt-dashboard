import { Flex, Bold, BarList, Text } from "@tremor/react";
import { IWorkflowRunsData } from "./Metrics";
import useDictionaries from "@/hooks/useDictionaries";

interface IWorkflowRunsClientProps {
  workflowRuns: IWorkflowRunsData[];
}
const WorkflowRunsClient = (props: IWorkflowRunsClientProps) => {
  const { workflowRuns } = props;
  const dict = useDictionaries();

  const data = workflowRuns.map(item => ({
    name: `${item.workflowName} (${item.totalItems})`,
    value: item.averageTime,
  }));
  return (
    <div>
      <Flex className="mt-4">
        <Text>
          <Bold>{dict.workflow.singular}</Bold>
        </Text>
        <Text>
          <Bold>{dict.home.executionAvg}</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </div>
  );
};

export default WorkflowRunsClient;
