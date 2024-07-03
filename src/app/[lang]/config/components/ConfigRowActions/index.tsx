"use client";

import TableRowActions, { ITableRowActions } from "@/components/tables/TableRowActions";
import useDictionaries from "@/hooks/useDictionaries";
import ModalDeleteConfig from "./ModalDeleteConfig";
import { ConfigData } from "../ConfigList";

const ConfigRowActions = (props: ConfigData) => {
  const { name } = props;
  const dict = useDictionaries();
  const modalDeleteId = `modal-delete-config-${name}`;
  const actions: ITableRowActions[] = [
    {
      label: dict.global.delete,
      modalId: modalDeleteId,
    },
    {
      label: dict.global.editYaml,
      link: `/config/yaml/edit/${name}`,
    },
  ];

  return (
    <TableRowActions actions={actions}>
      <ModalDeleteConfig configName={name} modalId={modalDeleteId} />
    </TableRowActions>
  );
};

export default ConfigRowActions;
