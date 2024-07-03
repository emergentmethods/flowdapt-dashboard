import { WorkflowResourceReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";
import { use } from "react";

interface DashboardClientExampleProps {
  workflowsPromise: Promise<WorkflowResourceReadResponseDTOType["latest"]["data"][]>; // This works
  // workflowsPromise: Promise<WorkflowResourceReadResponseDTOType["latest"]["toJSON"][]>; // This doesn't work
}

export function DashboardClientExample(props: DashboardClientExampleProps) {
  const { workflowsPromise } = props;
  const workflows = use(workflowsPromise);

  return (
    <div>
      {workflows.map((workflow, index) => (
        <div key={index}>{workflow.metadata.name}</div>
      ))}
    </div>
  );
}
