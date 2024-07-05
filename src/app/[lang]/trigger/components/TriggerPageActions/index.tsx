"use client";

import DropdownPageActions from "../../../../../components/DropdownPageActions";
import ModalDeleteSelectedConfigs from "./ModalDeleteSelectedConfigs";
import useDictionaries from "@/hooks/useDictionaries";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { LanguageDictType } from "@/i18n/dictionaries";
import { useRouter } from "next/navigation";
import InputTableSearch from "@/components/tables/InputTableSearch";
import { TableContext } from "@/components/tables/TableContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getDropdownItems = (
  worklowsSelected: string[],
  dict: LanguageDictType,
  router: AppRouterInstance,
  modalDeleteAllId: string
) => {
  const dropdownItems: ReactNode[] = [];
  if (worklowsSelected.length > 0) {
    dropdownItems.push(
      <button
        type="button"
        key={"deleteAll"}
        onClick={() => window[modalDeleteAllId].showModal()}
        className="justify-between"
      >
        {dict.global.delete}
      </button>
    );
  }
  dropdownItems.push(
    <Link href={"/config/yaml/new"} key={"newyaml"} className="justify-between">
      {dict.configs.newFromYaml}
    </Link>
  );

  dropdownItems.push(
    <button className="justify-between" key={"refresh"} onClick={() => router.refresh()}>
      {dict.global.refresh}
    </button>
  );

  return dropdownItems;
};

const ConfigPageActions = () => {
  const dict = useDictionaries();
  const modalDeleteAllId = "delete-all-modal";
  const router = useRouter();

  const tableContext = useContext(TableContext);
  const { allSelectedItems = [] } = tableContext || {};

  const dropdownItems = getDropdownItems(allSelectedItems, dict, router, modalDeleteAllId);

  return (
    <div>
      <InputTableSearch />
      <DropdownPageActions title={dict.global.actions} dropdownItems={dropdownItems}>
        <ModalDeleteSelectedConfigs
          modalDeleteAllId={modalDeleteAllId}
          configNames={allSelectedItems}
        />
      </DropdownPageActions>
    </div>
  );
};

export default ConfigPageActions;
