import Link from "next/link";
import React, { ReactNode } from "react";

const Custom_link = ({
  href,
  text,
  children,
  classname,
}: {
  href: string;
  text: string | number;
  children?: ReactNode;
  classname: string;
}) => {
  return (
    <Link
      href={href}
      className={`active:scale-90 hover:scale-105 flex gap-2 whitespace-nowrap  text-primary-900  ${classname}`}
    >
      {text}
      {children}
    </Link>
  );
};

export default Custom_link;
