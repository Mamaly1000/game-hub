import Image from "next/image";
import React, { ReactNode } from "react";

const ContentTemplate = ({
  children,
  img,
  classname,
  title,
}: {
  title: string;
  classname: string;
  img: string;
  children: ReactNode | string;
}) => {
  return (
    <section className={` min-w-full min-h-[400px] relative flex items-center p-5 justify-between gap-3 ${classname}`}>
      <div className=" relative min-w-full md:min-w-[47%] md:max-w-[47%] min-h-[300px] md:min-h-full flex items-center justify-center p-10">
        <Image
          alt={title}
          src={img}
          fill
          loading="lazy"
          className="object-cover drop-shadow-2xl rounded-lg"
        />
      </div>
      <div className="min-w-full md:min-w-[47%] md:max-w-[47%] md:min-h-full flex items-start justify-start flex-col gap-3">
        <h2 className="font-bold text-[1.5rem] capitalize text-primary-200">{title}</h2>
        {typeof children === "string" ? <p className="text-start font-light">{children}</p> : children}
      </div>
    </section>
  );
};

export default ContentTemplate;
