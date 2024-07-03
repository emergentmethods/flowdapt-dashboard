import { useEffect, useState } from "react";

const useSelectAll = <T extends object>(data: T[], keyName: keyof T | undefined) => {
  // Create a new state variable, selected, to keep track of the selected rows
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  // Another state variable to keep track of the select all checkbox
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // Whenever data changes, reset the selected state
  useEffect(() => {
    if (keyName) {
      setSelected(Object.fromEntries(data.map(item => [String(item[keyName]), false])));
    }
  }, [data, keyName]);

  // Whenever selected changes, determine whether selectAll should be true or false
  useEffect(() => {
    if (selected) {
      setSelectAll(Object.values(selected).every(Boolean));
    }
  }, [selected]);

  return { selected, selectAll, setSelected, setSelectAll };
};

export default useSelectAll;
