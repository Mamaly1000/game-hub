"use client";
import { toPersianNumbersWithComma } from "@/utils/numConvertor";
import React from "react";

const NumDisplay = ({
  number,
  classname,
  title,
}: {
  classname: string;
  title: string;
  number: string | number;
}) => {
  return (
    number && (
      <span className={classname}>
        {title} : {toPersianNumbersWithComma(number)}
      </span>
    )
  );
};

export default NumDisplay;
