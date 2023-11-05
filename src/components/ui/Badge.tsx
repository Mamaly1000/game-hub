import { AppColorsTypes } from "@/types/common";
import { AppColors } from "@/utils/colors";
import numConvertor from "@/utils/numConvertor";
import React from "react";

const Badge = ({
  text,
  color,
  width,
  height,
  classname,
}: {
  text: string | number;
  color: AppColorsTypes;
  width?: number | string;
  height?: number | string;
  classname?: string;
}) => {
  return (
    <div
      className={`drop-shadow-2xl rounded-full text-white flex items-center justify-center
        ${AppColors.find((c) => c.name === color)?.value}  
        ${classname}`}
      style={{
        minWidth: width || "auto",
        maxWidth: width || "auto",
        minHeight: height || "auto",
        maxHeight: height || "auto",
      }}
    >
      {numConvertor("fa", text + "")}
    </div>
  );
};

export default Badge;
