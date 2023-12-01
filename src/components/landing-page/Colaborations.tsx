"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  Sony,
  apple,
  asus,
  lg,
  microsoft,
  samsung,
  marvel,
} from "@/assets/brands/brands";
import Image from "next/image";
const Colaborations = () => {
  const brands = [apple, microsoft, asus, samsung, Sony, lg, marvel];
  return (
    <div className="min-w-full min-h-[120px] max-w-[120px]  mb-10">
      <Swiper
        style={{ width: "100%" }}
        autoplay={{
          delay: 1000,
        }}
        slidesPerView={"auto"}
        spaceBetween={10}
        modules={[Autoplay]}
        loop={true}
        dir="rtl"
      >
        {[brands, brands].flat().map((pic) => (
          <SwiperSlide
            key={pic.src}
            className="overflow-hidden bg-white relative min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] rounded-lg drop-shadow-2xl flex items-center justify-center p-1"
          >
            <Image
              alt=""
              src={pic.src}
              className="object-contain "
              fill
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Colaborations;
