"use client";
import { toPersianNumbersWithComma } from "@/utils/numConvertor";
import React from "react";

const PriceDisplay = ({
  price,
  title,
  className,
}: {
  className?: string;
  title?: string;
  price: {
    price: number;
    discount: number | null;
    offPrice: number | null;
  };
}) => {
  return price.discount && price.offPrice ? (
    <div className={className}>
      {title || "قیمت کل"} :
      <span className="text-error line-through">
        {toPersianNumbersWithComma(price.price)}
      </span>
      -<span>{toPersianNumbersWithComma(price.offPrice)}</span>
    </div>
  ) : (
    <div className={className}>
      {title || "قیمت کل"} :{toPersianNumbersWithComma(price.price)}
    </div>
  );
};

export default PriceDisplay;
