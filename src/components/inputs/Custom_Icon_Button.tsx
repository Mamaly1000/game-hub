import { IconButton } from "@mui/material";
import React, { ReactNode } from "react";

const Custom_Icon_Button = ({
  children,
  onClick,
  background,
  disable = false,
  className,
  color,
}: {
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
  background?: string;
  disable?: boolean;
  className?: string;
}) => {
  return (
    <IconButton
      sx={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: background || "rab(var(--color-primary-900))",
        color: color || "#ffffff",
      }}
      onClick={onClick}
      disabled={disable}
      className={className}
    >
      {children}
    </IconButton>
  );
};

export default Custom_Icon_Button;
