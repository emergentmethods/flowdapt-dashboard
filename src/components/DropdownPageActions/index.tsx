"use client";
import React from "react";
import { closeDaisyUIDropdown } from "@/lib/util";

interface IDropdownPageActionsProps {
  title?: string;
  dropdownItems: React.ReactNode[];
  children?: React.ReactNode;
  actionElement?: React.ReactNode;
}

const DropdownPageActions = (props: IDropdownPageActionsProps) => {
  const { title = "", dropdownItems, children, actionElement } = props;
  return (
    <>
      <div className="dropdown dropdown-end">
        {actionElement ? (
          <label tabIndex={0}>{actionElement}</label>
        ) : (
          <label tabIndex={0} className="btn m-1 btn-sm">
            {title || actionElement}
          </label>
        )}
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 z-10"
        >
          {dropdownItems.map((item, index) => (
            <li key={index} onClick={closeDaisyUIDropdown}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      {children && <>{children}</>}
    </>
  );
};

export default DropdownPageActions;
