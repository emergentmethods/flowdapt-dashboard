"use client";

import TableRowActions, { ITableRowActions } from "@/components/tables/TableRowActions";
import useDictionaries from "@/hooks/useDictionaries";
import ModalDeleteTrigger from "./ModalDeleteTrigger";
import { TriggerData } from "../TriggerList";

const ConfigRowActions = (props: TriggerData) => {
  const { name } = props;
  const dict = useDictionaries();
  const modalDeleteId = `modal-delete-trigger-${name}`;
  const actions: ITableRowActions[] = [
    {
      label: dict.global.delete,
      modalId: modalDeleteId,
    },
    {
      label: dict.global.editYaml,
      link: `/trigger/yaml/edit/${name}`,
    },
  ];

  return (
    <TableRowActions actions={actions}>
      <ModalDeleteTrigger triggerName={name} modalId={modalDeleteId} />
    </TableRowActions>
  );
};

export default ConfigRowActions;
