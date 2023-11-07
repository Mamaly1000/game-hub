import { UserInterface } from "@/types/User";
import numConvertor from "@/utils/numConvertor";
import moment from "jalali-moment";
import React, { ReactNode } from "react";

const DisplayDate = ({
  title,
  children,
  mainDate,
  defaultValue,
  user,
}: {
  mainDate?: string;
  title: string;
  children?: ReactNode;
  defaultValue?: boolean;
  user?: UserInterface | null;
}) => {
  return defaultValue && user ? (
    <div className="max-w-fit border-b-[1px] border-inherit flex items-center justify-between gap-2 p-2 [&>span]:whitespace-nowrap text-inherit bg-transparent">
      <span>{title}</span>
      <span>
        {moment(user?.createdAt).locale("fa-IR").format("dddd jDD/jMMMM/jYYYY")}
        -
        {+moment(user?.createdAt).locale("fa-IR").format("HH") > 12
          ? moment(user?.createdAt).locale("fa-IR").format("HH:MM ب.ظ")
          : moment(user?.createdAt).locale("fa-IR").format("HH:MM ق.ظ")}
      </span>
    </div>
  ) : (
    <div className="max-w-fit border-b-[1px] border-inherit flex items-center justify-between gap-2 p-2 [&>span]:whitespace-nowrap text-inherit bg-transparent">
      <span>{title}</span>
      <span>{numConvertor("fa", mainDate + "-" + children)}</span>
    </div>
  );
};

export default DisplayDate;
