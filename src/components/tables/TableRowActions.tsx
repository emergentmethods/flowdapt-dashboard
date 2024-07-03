"use client";

import React from "react";
import { closeDaisyUIDropdown } from "@/lib/util";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import ButtonDetail from "./ButtonDetail";

export interface ITableRowActions {
  label: string;
  onClick?: () => Promise<void>;
  modalId?: string;
  link?: string;
}
export interface ITableRowActionsProps {
  actions: ITableRowActions[];
  children?: React.ReactNode;
}

const TableRowActions = (props: ITableRowActionsProps) => {
  const { actions, children } = props;

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-primary">
          <Cog6ToothIcon className="w-6 h-6" />
        </label>
        <div className="dropdown dropdown-end">
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 z-10"
          >
            {actions.map((action, index) => (
              <li key={index} onClick={closeDaisyUIDropdown}>
                <ButtonDetail action={action} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children && <>{children}</>}
    </>
  );
};

export default TableRowActions;
