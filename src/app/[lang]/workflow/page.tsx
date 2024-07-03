import React from "react";
import WorkflowList, { ResourceMetadata } from "./components/WorkflowList";
import { getLanguage } from "@/lib/util";
import Container from "@/components/Container";
import { getMetadataWorkflows } from "./components/utils";
import { filterOrderDataTable, getTableOptions, ITableOptions } from "@/components/tables/utils";

export const revalidate = 0;

const getWorkflowPageData = async (tableOptions: ITableOptions<ResourceMetadata>) => {
  const metadataList: ResourceMetadata[] = await getMetadataWorkflows();
  const filteredWorkflows: ResourceMetadata[] = await filterOrderDataTable(
    tableOptions,
    metadataList
  );
  return filteredWorkflows;
};

export default async function WorkFlows(props: Flowdapt.IPageParams) {
  const lang = getLanguage(props);
  const tableOptions = getTableOptions<ResourceMetadata>(props, ["name", "uid", "group"]);

  const workflowMetadataPromise = getWorkflowPageData(tableOptions);
  return (
    <Container>
      <WorkflowList
        workflowMetadataPromise={workflowMetadataPromise}
        lang={lang}
        tableOptions={tableOptions}
      />
    </Container>
  );
}
