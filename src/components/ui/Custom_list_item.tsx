import { Checkbox, ListItem } from "@mui/material";
import React, { ReactNode } from "react";
import Custom_checkbox from "../inputs/Custom_checkbox";
import { categoryInterface } from "@/types/category";

const Custom_list_item = ({
  children,
  secondaryAction,
  onchange,
  labelId,
  checked,
}: {
  secondaryAction?: ReactNode;
  children: ReactNode;
  labelId: string;
  onchange: (
    e: React.ChangeEvent<HTMLInputElement> | categoryInterface
  ) => void;
  checked: boolean;
}) => {
  return (
    <ListItem
      secondaryAction={
        secondaryAction || (
          <Custom_checkbox
            checked={checked}
            color=""
            labelId={labelId}
            onchange={onchange}
          />
        )
      }
      disablePadding
    >
      {children}
    </ListItem>
  );
};

export default Custom_list_item;
