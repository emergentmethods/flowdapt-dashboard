"use client";

import TableProvider from "./TableContext";
import TableMain from "./TableMain";
import useSelectAll from "./useSelectAll";
import { ITable } from "./utils";

const Table = <T extends object>(props: ITable<T>) => {
  const { data, selectRowOptions } = props;

  const useSelectAllProps = useSelectAll(data, selectRowOptions?.fieldKey);

  return (
    <TableProvider {...useSelectAllProps} allSelectedItems={[]}>
      <TableMain {...props} />
    </TableProvider>
  );
};

export default Table;
