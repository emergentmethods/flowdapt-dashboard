"use server";

import { Locale, getDictionary } from "@/i18n/dictionaries";
import ConfigRowActions from "./ConfigRowActions";
import { ITable, ITableOptions } from "@/components/tables/utils";
import Table from "@/components/tables";
import ConfigPageActions from "./ConfigPageActions";

export type ConfigData = {
  name: string;
  uid?: string | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  annotations?: Record<string, string> | undefined;
  group?: string;
};

interface IConfigListProps {
  configPromise: Promise<ConfigData[]>;
  lang: Locale;
  tableOptions: ITableOptions<ConfigData>;
}

const ConfigList = async (props: IConfigListProps) => {
  const { lang, tableOptions, configPromise } = props;
  const dict = getDictionary(lang);
  const configData = await configPromise;
  const localDict = dict["configs"];
  const globalDict = dict["global"];

  const tableProps: ITable<ConfigData> = {
    tableOptions,
    data: configData,
    tableHeaders: [
      {
        fieldName: "name",
        label: localDict.name,
      },
      {
        fieldName: "uid",
        label: globalDict.uid,
      },
      {
        fieldName: "group",
        label: globalDict.group,
      },
      {
        fieldName: "created_at",
        label: globalDict.createdAt,
        fieldType: "date",
      },
    ],
    RowActions: ConfigRowActions,
    actionsLabel: globalDict.actions,
    pathname: "config",
    selectRowOptions: {
      enabled: true,
      fieldKey: "name",
    },
    pageHeaderOptions: {
      title: localDict.title,
      rightElement: <ConfigPageActions />,
    },
  };
  return <Table {...tableProps} />;
};

export default ConfigList;
