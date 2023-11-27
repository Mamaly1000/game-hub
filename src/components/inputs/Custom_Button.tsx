import vazirFont from "@/common/local-fonts/VazirFont";
import { Theme } from "@emotion/react";
import { Button, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

const Custom_Button = ({
  onclick,
  className,
  btn_type = "button",
  children,
  disable,
  background,
  sx,
  color,
}: {
  sx?: SxProps<Theme> | undefined;
  background?: string;
  disable?: boolean;
  btn_type?: "button" | "submit" | "reset" | undefined;
  onclick?: () => void;
  className?: string;
  children?: ReactNode;
  color?: string;
}) => {
  return (
    <Button
      type={btn_type}
      className={` disabled:opacity-50 drop-shadow-2xl
      ${className}
      `}
      onClick={onclick}
      style={vazirFont.style}
      disabled={disable}
      sx={
        sx || {
          background: background || "rab(var(--color-primary-900)) !important",
          color: color || "#ffffff",
        }
      }
    >
      {children}
    </Button>
  );
};

export default Custom_Button;
