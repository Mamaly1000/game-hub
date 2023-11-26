import vazirFont from "@/common/local-fonts/VazirFont";
import { Button } from "@mui/material";
import React, { ReactNode } from "react";

const Custom_Button = ({
  text,
  onclick,
  className,
  btn_type,
  children,
  disable,
  background,
}: {
  background?: string;
  disable?: boolean;
  btn_type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  onclick?: () => void;
  className: string;
  children?: ReactNode;
}) => {
  return (
    <Button
      type={btn_type}
      className={`
      text-white disabled:opacity-50 drop-shadow-2xl
      ${className}
      `}
      onClick={onclick}
      style={vazirFont.style}
      disabled={disable}
      sx={{ background: background || "auto" }}
    >
      {text} {children}
    </Button>
  );
};

export default Custom_Button;
