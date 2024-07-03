"use client";

import React from "react";
export interface IPageHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

const PageHeader = (props: IPageHeaderProps) => {
  const { title, rightElement } = props;
  return (
    <div className="flex">
      <div className="flex-none">
        <h1 className="font-bold py-2 mb-2 text-lg">{title}</h1>
      </div>
      <div className="grow" />
      <div className="flex-none">{rightElement && <>{rightElement}</>}</div>
    </div>
  );
};

export default PageHeader;
