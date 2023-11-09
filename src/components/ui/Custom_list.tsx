import vazirFont from "@/common/local-fonts/VazirFont";
import { DialogTitle, Divider, List } from "@mui/material";
import React, { ReactNode } from "react";

const Custom_list = ({
  children,
  classname,
  bgcolor,
  title,
}: {
  title: string;
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
      <DialogTitle
        style={{
          fontWeight: 600,
          textAlign: "start",
          direction: "rtl",
          fontFamily: vazirFont.style.fontFamily,
        }}
      >
        {title}
      </DialogTitle>
      <Divider className="min-w-full border-b-[1px] border-primary-900" />
      {children}
    </List>
  );
};

export default Custom_list;
