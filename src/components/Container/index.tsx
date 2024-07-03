import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-10">{children}</div>;
};

export default Container;
