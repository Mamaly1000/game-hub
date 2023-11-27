import { Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import RTL_Creator from "./RTL_Creator";

const Custom_Tooltip = ({
  children,
  title,
}: {
  children: ReactElement<any, any>;
  title: string;
}) => {
  return (
    <RTL_Creator>
      <Tooltip title={title}>{children || ""}</Tooltip>
    </RTL_Creator>
  );
};

export default Custom_Tooltip;
