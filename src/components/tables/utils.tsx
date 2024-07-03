import React from "react";
import { sortByProperty } from "@/lib/util";
import Fuse from "fuse.js";
import { IPageHeaderProps } from "../PageHeader";

export interface ITableOptions<T> {
  orderBy: keyof T;
  orderByDirection?: "asc" | "desc";
  search?: string;
  keysToSearch: (keyof T)[];
}

export type ITableFieldType = "string" | "number" | "date";

export interface ITableHeader<T> {
  fieldName: keyof T;
  label: string;
  fieldType?: ITableFieldType;
}

export interface ITable<T> {
  tableOptions: ITableOptions<T>;
  tableHeaders: ITableHeader<T>[];
  data: T[];
  RowActions?: (props: T) => React.JSX.Element;
  actionsLabel?: string;
  pathname?: string | null | undefined;
  selectRowOptions?: {
    enabled: boolean;
    fieldKey: keyof T;
  };
  pageHeaderOptions?: IPageHeaderProps;
}

export const filterOrderDataTable = async <T extends object>(
  tableOptions: ITableOptions<T>,
  data: T[]
) => {
  const { orderBy, orderByDirection = "asc", search = "", keysToSearch } = tableOptions;
  const sortedData = data.sort(sortByProperty<T>(orderBy, orderByDirection));
  let resultData = sortedData;
  if (search) {
    const options = {
      keys: keysToSearch as string[],
      threshold: 0.2,
      distance: 100,
      findAllMatches: true,
    };
    const fuse = new Fuse(sortedData, options);

    const result = fuse.search(search);
    resultData = result.map(r => r.item);
  }
  return resultData;
};

export const getTableOptions = <T extends object>(
  pageProgps: Flowdapt.IPageParams,
  keysToSearch: (keyof T)[]
) => {
  const tableOptions: ITableOptions<T> = {
    search: (pageProgps?.searchParams?.search || "") as string,
    orderBy: (pageProgps?.searchParams?.orderBy || "") as keyof T,
    orderByDirection: (pageProgps?.searchParams?.orderByDirection || "") as "asc" | "desc",
    keysToSearch: keysToSearch,
  };
  return tableOptions;
};

interface ITableFieldDataProps {
  value: unknown;
  type?: ITableFieldType;
}
export const TableFieldData = (props: ITableFieldDataProps) => {
  const { value, type = "string" } = props;
  switch (type) {
    case "date":
      return new Date(value as string).toLocaleDateString();
    default:
      return value as string;
  }
};
