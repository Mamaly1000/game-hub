import { categoryInterface } from "@/types/category";
import { Checkbox } from "@mui/material";
import React from "react";

const Custom_checkbox = ({
  onchange,
  checked,
  labelId,
  color,
}: {
  onchange: (
    e: React.ChangeEvent<HTMLInputElement> | categoryInterface
  ) => void;
  checked: boolean;
  labelId: string;
  color: string;
}) => {
  return (
    <Checkbox
      style={{ color: color || "rgb(var(--color-primary-900))" }}
      edge="end"
      onChange={onchange}
      checked={checked}
      inputProps={{ "aria-labelledby": labelId }}
    />
  );
};

export default Custom_checkbox;
