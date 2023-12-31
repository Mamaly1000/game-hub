"use client";
import { categoryInterface } from "@/types/category";
import { productInterface } from "@/types/product";
import React, { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SmallProductCard from "../landing-page/SmallProductCard";
import { Autoplay } from "swiper/modules";

const MultipleSlider = ({
  title,
  data,
  type,
}: {
  type: "product" | "category";
  data: productInterface[] | categoryInterface[];
  title?: string;
}) => {
  const SingleProducts: () => string[] = useCallback(() => {
    let returnedData: string[] = [];
    if (type === "product") {
      const categories = (data as productInterface[]).map(
        (p) => p.category?.englishTitle
      );
      returnedData = [...new Set(categories)] as string[];
    }
    return returnedData;
  }, [data]);
  return (
    <div className=" min-w-full flex flex-col relative items-center justify-center gap-3 ">
      {title && (
        <h2 className="min-w-full text-start font-bold text-[1.3rem]">
          {title}
        </h2>
      )}
      <Swiper
        className="max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] "
        slidesPerView={"auto"}
        spaceBetween={0.5}
        dir="rtl"
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {SingleProducts().map((categoryName) => {
          const product: productInterface | undefined = (
            data as productInterface[]
          )
            .filter((p) => !!p.category?.englishTitle)
            .find((p) => p.category?.englishTitle === categoryName);
          return (
            product && (
              <SwiperSlide key={product._id} className="max-w-fit max-h-fit">
                {(isActive) =>
                  type === "product" && (
                    <SmallProductCard
                      isActive={isActive.isActive}
                      product={product as productInterface}
                    />
                  )
                }
              </SwiperSlide>
            )
          );
        })}
      </Swiper>
    </div>
  );
};

export default MultipleSlider;
