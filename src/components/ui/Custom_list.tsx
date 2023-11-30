import vazirFont from "@/common/local-fonts/VazirFont";
import { DialogTitle, Divider, List } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";
import Custom_link from "../inputs/Custom_link";

const Custom_list = ({
  children,
  classname,
  bgcolor,
  title,
  callToAction = null,
}: {
  callToAction?: { text: string; link: string } | null;
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
        maxWidth: { xs: "100%", md: 360 },
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
          minWidth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: callToAction ? "space-between" : "start",
          whiteSpace: "nowrap",
        }}
      >
        {title}
        {callToAction && (
          <Custom_link
            classname="text-[1rem] bg-primary-900 rounded-lg drop-shadow-2xl px-2 py-1"
            href={callToAction.link}
          >
            {callToAction.text}
          </Custom_link>
        )}
      </DialogTitle>
      <Divider className="min-w-full border-b-[1px] border-primary-900 mb-5" />
      {children}
    </List>
  );
};

export default Custom_list;
