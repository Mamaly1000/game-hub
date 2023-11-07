import vazirFont from "@/common/local-fonts/VazirFont";
import { AppColorsTypes } from "@/types/common";
import { AppColors } from "@/utils/colors";
import React, { ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => props.theme.color} !important;
`;

const Custom_Button = ({
  text,
  onclick,
  type,
  className,
  btn_type,
  children,
  disable,
}: {
  disable?: boolean;
  btn_type: "button" | "submit" | "reset" | undefined;
  text: string;
  onclick?: () => void;
  type: AppColorsTypes;
  className: string;
  children?: ReactNode;
}) => {
  return (
    <Button
      theme={{
        color: AppColors.find((c) => c.name === type)?.value || undefined,
      }}
      type={btn_type}
      className={`
      text-white disabled:opacity-50 drop-shadow-2xl
      ${className}
      `}
      onClick={onclick}
      style={vazirFont.style}
      disabled={disable}
    >
      {text} {children}
    </Button>
  );
};

export default Custom_Button;
