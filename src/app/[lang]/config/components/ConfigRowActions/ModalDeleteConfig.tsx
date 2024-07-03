"use client";

import Modal from "@/components/common/Modal";
import useDictionaries from "@/hooks/useDictionaries";
import { useRouter } from "next/navigation";
import { deleteConfig } from "../../server-actions";

interface IModalDeleteConfig {
  configName: string;
  modalId: string;
}
const ModalDeleteConfig = (props: IModalDeleteConfig) => {
  const { configName, modalId } = props;
  const router = useRouter();
  const dict = useDictionaries();

  const deleteConfigWithId = async () => {
    await deleteConfig(configName);
    router.refresh();
  };

  return (
    <Modal
      actionCallback={deleteConfigWithId}
      action={dict.global.delete}
      cancel={dict.global.cancel}
      description={dict.configs.modalConfirmDeleteRow}
      modalId={modalId}
      title={dict.configs.modalDeleteRowTitle}
    />
  );
};

export default ModalDeleteConfig;
