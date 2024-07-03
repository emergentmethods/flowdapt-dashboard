"use server";

import { Locale, getDictionary } from "@/i18n/dictionaries";
import WorkflowRowActions from "./WorkflowRowActions";
import { ITable, ITableOptions } from "@/components/tables/utils";
import Table from "@/components/tables";
import WorkflowPageActions from "./WorkflowPageActions";

export type ResourceMetadata = {
  name: string;
  uid?: string | undefined;
  created_at?: Date | undefined;
  updated_at?: Date | undefined;
  annotations?: Record<string, string> | undefined;
  group?: string;
};

interface IWorkflowListProps {
  workflowMetadataPromise: Promise<ResourceMetadata[]>;
  lang: Locale;
  tableOptions: ITableOptions<ResourceMetadata>;
}

const WorkflowList = async (props: IWorkflowListProps) => {
  const { lang, tableOptions, workflowMetadataPromise } = props;
  const dict = getDictionary(lang);
  const workflowsMetadata = await workflowMetadataPromise;
  const localDict = dict["workflow"];
  const globalDict = dict["global"];

  const tableProps: ITable<ResourceMetadata> = {
    tableOptions,
    data: workflowsMetadata,
    tableHeaders: [
      {
        fieldName: "name",
        label: localDict.name,
      },
      {
        fieldName: "uid",
        label: globalDict.uid,
      },
      {
        fieldName: "group",
        label: globalDict.group,
      },
      {
        fieldName: "created_at",
        label: globalDict.createdAt,
        fieldType: "date",
      },
    ],
    RowActions: WorkflowRowActions,
    actionsLabel: globalDict.actions,
    pathname: "workflow",
    selectRowOptions: {
      enabled: true,
      fieldKey: "name",
    },
    pageHeaderOptions: {
      title: localDict.title,
      rightElement: <WorkflowPageActions />,
    },
  };
  return <Table {...tableProps} />;
};

export default WorkflowList;
