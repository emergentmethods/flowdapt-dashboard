import Link from "next/link";
import { ITableOptions, ITableHeader } from "./utils";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/24/solid";

const getOrderByDirection = <T extends object>(
  orderBy: keyof T,
  tableOptionsParam: ITableOptions<T>
) => {
  if (orderBy === tableOptionsParam.orderBy) {
    return tableOptionsParam.orderByDirection === "asc" ? "desc" : "asc";
  }
  return "asc";
};
interface IIconSort<T> {
  orderBy: keyof T;
  tableOptionsParam: ITableOptions<T>;
}
const IconSort = <T extends object>(props: IIconSort<T>) => {
  const { orderBy, tableOptionsParam } = props;
  if (orderBy === tableOptionsParam.orderBy) {
    return tableOptionsParam.orderByDirection === "asc" ? (
      <ArrowLongUpIcon className="h-3 w-3 text-blue-500" />
    ) : (
      <ArrowLongDownIcon className="h-3 w-3 text-blue-500" />
    );
  }
  return null;
};

interface ITableHeaderProps<T> {
  tableOptions: ITableOptions<T>;
  pathname: string | null | undefined;
}
const TableHeader = <T extends object>(props: ITableHeader<T> & ITableHeaderProps<T>) => {
  const { tableOptions, fieldName, label, pathname } = props;

  return (
    <Link
      href={{
        pathname: pathname,
        query: {
          orderBy: fieldName as string,
          orderByDirection: getOrderByDirection(fieldName, tableOptions),
          search: props.tableOptions.search,
        },
      }}
      className="flex"
    >
      <span className="mr-2">{label}</span>{" "}
      <IconSort orderBy={fieldName} tableOptionsParam={tableOptions} />
    </Link>
  );
};

export default TableHeader;
