import { getAllRawProducts } from "@/services/productServices";
import { productInterface } from "@/types/product";
import HeroSection from "@/components/landing-page/HeroSection";

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
      <HeroSection products={products} />
    </main>
  );
}
