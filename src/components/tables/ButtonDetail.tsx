"use client";

import React from "react";
import { ITableRowActions } from "./TableRowActions";
import Link from "next/link";

interface IPropsButtonDetail {
  action: ITableRowActions;
}
const ButtonDetail = (props: IPropsButtonDetail) => {
  const { action } = props;
  const { label, modalId, onClick, link } = action;
  if (modalId) {
    return (
      <button type="button" className="justify-between" onClick={() => window[modalId].showModal()}>
        {action.label}
      </button>
    );
  }
  if (onClick) {
    <button type="button" onClick={onClick}>
      {label}
    </button>;
  }
  if (link) {
    return (
      <Link href={link} className="justify-between">
        {label}
      </Link>
    );
  }
};

export default ButtonDetail;
