import { getAllRawProducts } from "@/services/productServices";
import { productInterface } from "@/types/product";
import HeroSection from "@/components/landing-page/HeroSection";
import Overviews from "@/components/landing-page/Overviews";
import Colaborations from "@/components/landing-page/Colaborations";
import Acheivements from "@/components/landing-page/Acheivements";
import Services from "@/components/landing-page/Services";
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
    <main className="flex col-span-12 row-span-full min-w-full min-h-fit flex-col items-start justify-start px-2 py-10 md:p-24 pb-10 gap-10 relative ">
      <HeroSection products={products} />
      <Overviews />
      <Colaborations />
      <Acheivements products={products} />
      <Services />
    </main>
  );
}
