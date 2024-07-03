import React from "react";
import { Dispatch, SetStateAction, createContext } from "react";

export interface ITableContext {
  selected: Record<string, boolean>;
  selectAll: boolean;
  setSelected: Dispatch<SetStateAction<Record<string, boolean>>>;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
  allSelectedItems: string[];
}

export const TableContext = createContext<ITableContext | null>(null);

interface ITableProviderProps extends ITableContext {
  children: React.ReactNode;
}

const TableProvider = (props: ITableProviderProps) => {
  const { children, selected } = props;
  const allSelectedItems = Object.entries(selected || {})
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  return (
    <TableContext.Provider value={{ ...props, allSelectedItems: allSelectedItems }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
