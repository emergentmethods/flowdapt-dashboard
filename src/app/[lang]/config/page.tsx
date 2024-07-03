import React from "react";
import { getLanguage } from "@/lib/util";
import ConfigList, { ConfigData } from "./components/ConfigList";
import { filterOrderDataTable, getTableOptions, ITableOptions } from "@/components/tables/utils";
import Container from "@/components/Container";
import { getConfigFlatData } from "./components/utils";

export const revalidate = 0;

const getConfigPageData = async (tableOptions: ITableOptions<ConfigData>) => {
  const configList: ConfigData[] = await getConfigFlatData();
  const filteredConfigs: ConfigData[] = await filterOrderDataTable(tableOptions, configList);
  return filteredConfigs;
};

export default async function Configs(props: Flowdapt.IPageParams) {
  const lang = getLanguage(props);
  const tableOptions = getTableOptions<ConfigData>(props, ["name", "uid", "group"]);
  const data = getConfigPageData(tableOptions);

  return (
    <Container>
      <ConfigList configPromise={data} tableOptions={tableOptions} lang={lang} />
    </Container>
  );
}
