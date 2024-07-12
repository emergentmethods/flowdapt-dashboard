"use client";

import Modal from "@/components/common/Modal";
import useDictionaries from "@/hooks/useDictionaries";
import { useRouter } from "next/navigation";
import { deleteTrigger } from "../../server-actions";

interface IModalDeleteTrigger {
  triggerName: string;
  modalId: string;
}
const ModalDeleteTrigger = (props: IModalDeleteTrigger) => {
  const { triggerName, modalId } = props;
  const router = useRouter();
  const dict = useDictionaries();

  const deleteWithId = async () => {
    await deleteTrigger(triggerName);
    router.refresh();
  };

  return (
    <Modal
      actionCallback={deleteWithId}
      action={dict.global.delete}
      cancel={dict.global.cancel}
      description={dict.trigger.modalConfirmDeleteRow}
      modalId={modalId}
      title={dict.trigger.modalDeleteRowTitle}
    />
  );
};

export default ModalDeleteTrigger;
