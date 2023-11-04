import vazirFont from "@/common/local-fonts/VazirFont";
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
  onclick: () => void;
  type: "primary" | "secondary" | "warning" | "error" | "success";
  className: string;
  children?: ReactNode;
}) => {
  const colors: { name: typeof type; value: string }[] = [
    {
      name: "primary",
      value: "bg-primary-800",
    },
    { name: "secondary", value: "bg-secondary-800" },
    { name: "error", value: "bg-error" },
    { name: "success", value: "bg-success" },
    { name: "warning", value: "bg-warning" },
  ];
  return (
    <button
      type={btn_type}
      className={`${className + colors.find((c) => c.name === type)?.value} disabled:opacity-50`}
      onClick={onclick}
      style={vazirFont.style}
      disabled={disable}
    >
      {text} {children}
    </button>
  );
};

export default Custom_Button;
