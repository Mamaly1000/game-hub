"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function AutoPlaySlider({
  title,
  children,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="  max-w-full flex relative items-start justify-start gap-3 bg-transparent overflow-hidden">
      {title && <h2>{title}</h2>}
      <Swiper className="mx-auto max-w-[300px] sm:max-w-[500px] md:max-w-[500px] lg:max-w-[600px]  overflow-hidden">
        {children}
      </Swiper>
    </div>
  );
}
