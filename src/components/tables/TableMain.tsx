"use client";

import { useContext } from "react";
import PageHeader from "../PageHeader";
import { TableContext } from "./TableContext";
import TableHeader from "./TableHeader";
import { ITable, TableFieldData } from "./utils";
import useDictionaries from "@/hooks/useDictionaries";

const TableMain = <T extends object>(props: ITable<T>) => {
  const dict = useDictionaries();
  const {
    tableOptions,
    tableHeaders,
    data,
    RowActions = null,
    pathname,
    actionsLabel = dict.global.actions,
    selectRowOptions,
    pageHeaderOptions,
  } = props;
  const tableContext = useContext(TableContext);
  if (!tableContext) {
    return null;
  }
  const { selectAll, selected, setSelectAll, setSelected } = tableContext;

  return (
    <div className="w-full">
      {pageHeaderOptions && <PageHeader {...pageHeaderOptions} />}
      <table className="table table-compact w-full mt-6">
        <thead>
          <tr>
            {selectRowOptions?.enabled && data.length > 0 && (
              <th className="flex items-center justify-center">
                <input
                  type="checkbox"
                  title={dict.global.selectAll}
                  className="checkbox checkbox-sm"
                  checked={selectAll}
                  onChange={() => {
                    const newSelectAll = !selectAll;
                    setSelectAll(newSelectAll);
                    setSelected(
                      Object.fromEntries(
                        data.map(item => [item[selectRowOptions?.fieldKey], newSelectAll])
                      )
                    );
                  }}
                />
              </th>
            )}
            {tableHeaders.map(tableHeader => (
              <th key={tableHeader.fieldName as string}>
                <TableHeader
                  tableOptions={tableOptions}
                  fieldName={tableHeader.fieldName}
                  label={tableHeader.label}
                  pathname={pathname}
                />
              </th>
            ))}
            {RowActions && <th className="flex items-center justify-center">{actionsLabel}</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                {selectRowOptions?.enabled && (
                  <td className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      title={dict.global.selectRow}
                      className="checkbox checkbox-sm"
                      name="selectRow"
                      checked={selected[item[selectRowOptions?.fieldKey]] || false}
                      onChange={() => {
                        const keyName: any = item[selectRowOptions?.fieldKey];
                        const value: any = selected[item[selectRowOptions?.fieldKey]];
                        setSelected({
                          ...selected,
                          [keyName]: !value,
                        });
                      }}
                    />
                  </td>
                )}
                {tableHeaders.map(tableHeader => (
                  <td key={tableHeader.fieldName as string}>
                    <TableFieldData
                      value={item[tableHeader.fieldName]}
                      type={tableHeader.fieldType}
                    />
                  </td>
                ))}
                {RowActions && (
                  <td className="flex items-center justify-center">
                    <RowActions {...item} />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableMain;
