import React from "react";
import { getLanguage } from "@/lib/util";
import TriggerList, { TriggerData } from "./components/TriggerList";
import { filterOrderDataTable, getTableOptions, ITableOptions } from "@/components/tables/utils";
import Container from "@/components/Container";
import { getTriggersFlatData } from "./components/utils";

export const revalidate = 0;

const getTriggersPageData = async (tableOptions: ITableOptions<TriggerData>) => {
  const configList: TriggerData[] = await getTriggersFlatData();
  const filteredConfigs: TriggerData[] = await filterOrderDataTable(tableOptions, configList);
  return filteredConfigs;
};

export default async function Page(props: Flowdapt.IPageParams) {
  const lang = getLanguage(props);
  const tableOptions = getTableOptions<TriggerData>(props, ["name", "uid", "group"]);
  const data = getTriggersPageData(tableOptions);

  return (
    <Container>
      <TriggerList configPromise={data} tableOptions={tableOptions} lang={lang} />
    </Container>
  );
}
