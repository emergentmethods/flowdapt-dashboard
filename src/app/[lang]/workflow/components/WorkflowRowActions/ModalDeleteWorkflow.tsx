"use client";

import Modal from "@/components/common/Modal";
import useDictionaries from "@/hooks/useDictionaries";
import { useRouter } from "next/navigation";
import { deleteWorkflow } from "../../server-actions";

interface IModalDeleteWorkflows {
  workflowName: string;
  modalId: string;
}
const ModalDeleteWorkflow = (props: IModalDeleteWorkflows) => {
  const { workflowName, modalId } = props;
  const router = useRouter();
  const dict = useDictionaries();

  const deleteWorkflowWithId = async () => {
    await deleteWorkflow(workflowName);
    router.refresh();
  };

  return (
    <Modal
      actionCallback={deleteWorkflowWithId}
      action={dict.global.delete}
      cancel={dict.global.cancel}
      description={dict.workflow.modalConfirmDeleteRow}
      modalId={modalId}
      title={dict.workflow.modalDeleteRowTitle}
    />
  );
};

export default ModalDeleteWorkflow;
