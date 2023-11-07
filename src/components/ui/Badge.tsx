import { AppColorsTypes } from "@/types/common";
import numConvertor from "@/utils/numConvertor";
import React from "react";

const Badge = ({
  text,
  width,
  height,
  classname,
}: {
  text: string | number;
  width?: number | string;
  height?: number | string;
  classname?: string;
}) => {
  return (
    <div
      className={`drop-shadow-2xl rounded-full text-white flex items-center justify-center ${classname}`}
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
