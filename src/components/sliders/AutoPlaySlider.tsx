"use client";
import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function AutoPlaySlider({
  title,
  children,
}: {
  children: ReactNode;
  title?: string;
}) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="min-w-full max-w-full flex relative items-start justify-start gap-3 bg-transparent max-w-full overflow-hidden">
      {title && <h2>{title}</h2>}
      <Slider className="max-w-[100%]" {...settings}>
        {children}
      </Slider>
    </div>
  );
}
