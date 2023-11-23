"use client";
import React from "react";
import smDots from "@/assets/smalldots.svg";
import lgDots from "@/assets/bigDots.svg";
import Image from "next/image";
import { toPersianNumbers } from "@/utils/numConvertor";
const DisplayDots = ({
  size = "sm",
  width = 300,
  height = 300,
  mainText,
  prefix,
  suffix,
}: {
  mainText: string;
  prefix?: string;
  suffix?: string;
  width?: number;
  height?: number;
  size?: "sm" | "lg";
}) => {
  return (
    <div className="min-w-full md:min-w-[400px]  min-h-[400px] flex items-center justify-center relative">
      {size === "sm" ? (
        <Image
          className="absolute md:-start-[50px] z-10"
          src={smDots}
          alt=""
          width={width}
          height={height}
        />
      ) : (
        <Image
          className="absolute md:-start-[50px] z-10"
          src={lgDots}
          alt=""
          width={width}
          height={height}
        />
      )}
      <div className="absolute text-[1.4rem] text-start md:end-0 z-20 min-w-[300px] min-h-[300px] flex flex-col items-center justify-center  ">
        <span className="me-3">{prefix}</span>
        <span className="text-center font-extrabold capitalize text-[3rem]">
          {toPersianNumbers(mainText)}
        </span>
        <span className="ms-3">{suffix}</span>
      </div>
    </div>
  );
};

export default DisplayDots;
