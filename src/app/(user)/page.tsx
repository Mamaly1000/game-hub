import Image from "next/image";
import pol from "../../../public/assets/polygon.svg";
import robot from "../../../public/assets/robot.svg";
import mock from "../../../public/assets/3d-casual-life-boy-holding-shopping-bag.png";
import PageHeader from "@/components/headers/PageHeader";
import SmallProductCard from "@/components/landing-page/SmallProductCard";
import Custom_link from "@/components/inputs/Custom_link";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { getAllRawProducts } from "@/services/productServices";
import { productInterface } from "@/types/product";

export default async function Home() {
  const {
    data: {
      data: { products },
    },
  }: {
    data: {
      data: { products: productInterface[] };
    };
  } = await getAllRawProducts();

  return (
    <main className="flex min-w-full min-h-screen flex-col items-center justify-between p-10 md:p-24  ">
      <section className="min-w-full min-h-[400px] flex flex-col md:flex-row gap-5 justify-between items-center ">
        <div className="min-w-full md:min-w-[47%] md:max-w-[47%] min-h-full relative flex flex-col gap-5 items-start justify-between  ">
          <div className="min-w-full flex flex-col relative justify-between items-start gap-3">
            <PageHeader classname="relative  font-extrabold text-start text-[1.5rem] min-h-[200px] md:text-[3rem] text-white flex flex-wrap gap-2 justify-between items-center p-0 ">
              با Game-Hub منبع شما برای همه چیزهای فناوری و سرگرمی.
            </PageHeader>
            <Custom_link
              classname="px-3 py-2 rounded-lg bg-primary-900 text-[1.2rem] font-bold flex items-center justify-center gap-2"
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

          <div className="min-w-full flex flex-wrap items-start justify-start gap-1 max-h-[200px] overflow-hidden ">
            {products &&
              products.length > 0 &&
              products.map((p) => {
                return <SmallProductCard product={p} key={p._id} />;
              })}
          </div>
        </div>

        <div className="min-w-full md:min-w-[47%] md:max-w-[47%] min-h-full relative flex flex-col items-center justify-start gap-5">
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
          <div className="relative min-w-full flex justify-center items-center min-h-[400px] border-[1px] border-primary-900 rounded-lg drop-shadow-2xl">
            <Image alt="" src={pol} className="absolute" />
            <Image
              alt=""
              src={robot}
              className="absolute w-[300px] h-[300px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
