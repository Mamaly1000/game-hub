import React, { ReactNode } from "react";

const PageHeader = ({
  children,
  classname,
}: {
  classname?: string;
  children: ReactNode;
}) => {
  return (
    <h1
      className={
        classname ? classname : "font-bold capitalize text-xl md:text-3xl "
      }
    >
      {children}
    </h1>
  );
};

export default PageHeader;
