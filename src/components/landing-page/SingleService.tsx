import Image from "next/image";
import React, { ReactNode } from "react";
import smDots from "@/assets/smalldots.svg";

const SingleService = ({
  icon,
  title,
  description,
}: {
  icon: string | ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative w-full sm:w-[350px] min-h-[220px] rounded-lg drop-shadow-2xl bg-secondary-900 p-3 flex flex-col items-start justify-between gap-3">
      {typeof icon === "string" ? (
        <Image src={icon} alt={title} width={20} height={20} />
      ) : (
        icon
      )}
      <h4 className="pb-3 border-b-[3px] border-white w-[90%] text-[1.2rem] font-bold">
        {title}
      </h4>
      <p className="text-[.8rem] font-light text-start max-w-[80%]">
        {description}
      </p>
      <Image
        src={smDots}
        alt=""
        width={160}
        height={160}
        className="absolute end-0 top-0 z-0"
      />
    </div>
  );
};

export default SingleService;
