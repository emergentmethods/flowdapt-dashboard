import React from "react";
import { getLanguage } from "@/lib/util";
import TriggerList, { TriggerData } from "./components/TriggerList";
import { filterOrderDataTable, getTableOptions, ITableOptions } from "@/components/tables/utils";
import Container from "@/components/Container";
import { getTriggersFlatData } from "./components/utils";

export const revalidate = 0;

const getTriggersPageData = async (tableOptions: ITableOptions<TriggerData>) => {
  const dataList: TriggerData[] = await getTriggersFlatData();
  const filteredTriggers: TriggerData[] = await filterOrderDataTable(tableOptions, dataList);
  return filteredTriggers;
};

export default async function Page(props: Flowdapt.IPageParams) {
  const lang = getLanguage(props);
  const tableOptions = getTableOptions<TriggerData>(props, ["name", "type", "uid", "group"]);
  const data = getTriggersPageData(tableOptions);

  return (
    <Container>
      <TriggerList triggerPromise={data} tableOptions={tableOptions} lang={lang} />
    </Container>
  );
}
