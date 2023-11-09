import { List } from "@mui/material";
import React, { ReactNode } from "react";

const Custom_list = ({
  children,
  classname,
  bgcolor,
}: {
  bgcolor?: string;
  classname: string;
  children: ReactNode;
}) => {
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: bgcolor || "rgb(var(--color-secondary-900))",
      }}
      className={classname}
    >
      {children}
    </List>
  );
};

export default Custom_list;
