import { Tooltip } from "@mui/material";
import React from "react";

const Custom_Tooltip = ({
  children,
  title,
}: {
  children: any;
  title: string;
}) => {
  return <Tooltip title={title}>{children || ""}</Tooltip>;
};

export default Custom_Tooltip;
