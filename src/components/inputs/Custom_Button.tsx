import vazirFont from "@/common/local-fonts/VazirFont";
import { AppColorsTypes } from "@/types/common";
import { AppColors } from "@/utils/colors";
import React, { ReactNode } from "react";

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
    <button
      type={btn_type}
      className={`${className + AppColors.find((c) => c.name === type)?.value} text-white disabled:opacity-50`}
      onClick={onclick}
      style={vazirFont.style}
      disabled={disable}
    >
      {text} {children}
    </button>
  );
};

export default Custom_Button;
