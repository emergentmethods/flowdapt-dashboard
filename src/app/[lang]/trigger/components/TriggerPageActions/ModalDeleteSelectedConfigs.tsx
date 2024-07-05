"use client";

import Modal from "@/components/common/Modal";
import useDictionaries from "@/hooks/useDictionaries";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteAllConfigs } from "../../server-actions";

interface IModalDeleteSelectedConfigs {
  configNames: string[];
  modalDeleteAllId: string;
}
const ModalDeleteSelectedConfigs = (props: IModalDeleteSelectedConfigs) => {
  const { modalDeleteAllId, configNames } = props;
  const router = useRouter();
  const dict = useDictionaries();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;
  const deleteAll = async () => {
    setIsFetching(true);

    await deleteAllConfigs(configNames);
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
      description={dict.configs.modalConfirmDeleteSelected}
      modalId={modalDeleteAllId}
      title={dict.configs.modalDeleteSelectedTitle}
      isMutating={isMutating}
    />
  );
};

export default ModalDeleteSelectedConfigs;
