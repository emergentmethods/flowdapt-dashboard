"use client";

import TableRowActions, { ITableRowActions } from "@/components/tables/TableRowActions";
import useDictionaries from "@/hooks/useDictionaries";
import ModalDeleteWorkflow from "./ModalDeleteWorkflow";
import { ResourceMetadata } from "../WorkflowList";

const WorkflowRowActions = (props: ResourceMetadata) => {
  const { name } = props;
  const dict = useDictionaries();
  const modalDeleteId = `modal-delete-workflow-${name}`;
  const actions: ITableRowActions[] = [
    {
      label: dict.global.delete,
      modalId: modalDeleteId,
    },
    {
      label: dict.global.edit,
      link: `/workflow/flow/edit/${name}`,
    },
    {
      label: dict.global.editYaml,
      link: `/workflow/yaml/edit/${name}`,
    },
    {
      label: dict.global.run,
      link: `/workflow/run/${name}`,
    },
  ];

  return (
    <TableRowActions actions={actions}>
      <ModalDeleteWorkflow workflowName={name} modalId={modalDeleteId} />
    </TableRowActions>
  );
};

export default WorkflowRowActions;
