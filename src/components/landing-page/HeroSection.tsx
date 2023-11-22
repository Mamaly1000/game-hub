import React from "react";
import PageHeader from "../headers/PageHeader";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import Custom_link from "../inputs/Custom_link";
import Image from "next/image";
import MultipleSlider from "../sliders/MultipleSlider";
import { productInterface } from "@/types/product";
import pol from "@/assets/polygon.svg";
import robot from "@/assets/robot.svg";
import mock from "@/assets/3d-casual-life-boy-holding-shopping-bag.png";
const HeroSection = ({ products }: { products: productInterface[] }) => {
  return (
    <section className="min-w-full min-h-[400px] flex flex-col md:flex-row gap-5 justify-between items-center ">
      <div className="min-w-full md:min-w-[47%] md:max-w-[47%] md:min-h-full relative flex flex-col gap-5 items-start justify-start   ">
        <div className="min-w-full flex flex-col relative justify-between items-start gap-3">
          <PageHeader classname="relative w-[80%]   font-extrabold text-start text-[1.5rem] min-h-[200px] md:text-[3rem] text-white flex flex-wrap gap-2 justify-between items-center p-0 ">
            با Game-Hub منبع شما برای همه چیزهای فناوری و سرگرمی.
          </PageHeader>
          <Custom_link
            classname="px-3 py-2 rounded-lg bg-primary-900 text-[1.2rem] font-bold flex items-center justify-center gap-2 drop-shadow-2xl animate-pulse"
            href="/auth"
            text="بزن بریم"
          >
            <SensorOccupiedIcon />
          </Custom_link>
          <Image
            alt=""
            src={mock.src}
            width={100}
            height={200}
            className="absolute bottom-0 end-0 z-0"
          />
        </div>

        {products && (
          <MultipleSlider
            title=" مشاهده دسته بندی ها"
            type="product"
            data={products as productInterface[]}
          />
        )}
      </div>

      <div className="min-w-full md:min-w-[47%] md:max-w-[47%] min-h-full relative flex flex-col-reverse md:flex-col items-center justify-start gap-5">
        <div className="relative min-w-full flex justify-center items-center min-h-[400px] border-[1px] border-primary-900 rounded-lg drop-shadow-2xl">
          <Image alt="" src={pol} className="absolute" />
          <Image alt="" src={robot} className="absolute w-[300px] h-[300px]" />
        </div>
        <div className="min-w-full flex flex-col items-start justify-start gap-3 rounded-lg drop-shadow-2xl p-3">
          <p className="min-w-full text-start text-[1rem] font-bold">
            مکانی که همه چیز در زمینه بازی، فناوری و سرگرمی را پوشش می‌دهد. از
            انواع گسترده‌ای از بازی‌ها، کامپیوترها، لپ‌تاپ‌ها و لوازم جانبی
            فناوری گرفته تا آخرین فیلم‌ها و سرگرمی‌ها، همه چیز را در GAME-HUB
            بیابید
          </p>
          <Custom_link
            classname="px-3 py-2 rounded-lg bg-primary-900 drop-shadow-2xl"
            href="/products"
            text="مشاهده محصولات"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
