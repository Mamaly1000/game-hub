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
      <div>
        <span className="text-error line-through">
          {toPersianNumbersWithComma(price.price)}
        </span>
        -<span>{toPersianNumbersWithComma(price.offPrice)}</span>
      </div>
    </div>
  ) : (
    <div className={className}>
      <span>{title || "قیمت کل"} : </span>
      <span>{toPersianNumbersWithComma(price.price)}</span>
    </div>
  );
};

export default PriceDisplay;
