"use client";

import Modal from "@/components/common/Modal";
import useDictionaries from "@/hooks/useDictionaries";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteAllWorkflow } from "../../server-actions";

interface IModalDeleteAllWorkflows {
  workflowsNames: string[];
  modalDeleteAllId: string;
}
const ModalDeleteAllWorkflows = (props: IModalDeleteAllWorkflows) => {
  const { modalDeleteAllId, workflowsNames } = props;
  const router = useRouter();
  const dict = useDictionaries();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const deleteAll = async () => {
    setIsFetching(true);

    await deleteAllWorkflow(workflowsNames);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();

      // Note: If fetch requests are cached, the updated data will
      // produce the same result.
    });
  };

  return (
    <Modal
      actionCallback={deleteAll}
      action={dict.global.delete}
      cancel={dict.global.cancel}
      description={dict.workflow.modalConfirmDeleteSelected}
      modalId={modalDeleteAllId}
      title={dict.workflow.modalDeleteSelectedTitle}
      isMutating={isMutating}
    />
  );
};

export default ModalDeleteAllWorkflows;
