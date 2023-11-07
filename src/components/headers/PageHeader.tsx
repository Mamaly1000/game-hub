import React, { ReactNode } from "react";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="font-bold capitalize text-xl md:text-3xl ">{children}</h1>
  );
};

export default PageHeader;
