import { categoryInterface } from "@/types/category"; 
import React from "react";

const SmallCategoryCard = ({ category }: { category: categoryInterface }) => {
  return (
    <div
      className="min-w-[150px] min-h-[150px] max-w-[150px] rounded-lg border-[1px] border-primary-900 p-3 max-h-[150px] flex flex-col items-center justify-between gap-2 drop-shadow-2xl relative [&>*]:text-start"
      style={{
        direction: "rtl",
      }}
    >
      <h5 className="font-bold w-full text-end flex justify-between capitalize flex-wrap items-center">
        {category.title}
        <span className="font-light text-[.9rem]">{category.englishTitle}</span>
      </h5>
      <p className="text-right font-extralight text-[.8rem]">
        {category.description}
      </p>
    </div>
  );
};

export default SmallCategoryCard;
