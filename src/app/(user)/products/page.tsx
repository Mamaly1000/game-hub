import Loader from "@/components/loading/Loader";
import SideBar from "@/components/user-sidebar/SideBar";
import { getAllCategories } from "@/services/categoryServices";
import { getAllProducts } from "@/services/productServices";
import { productInterface } from "@/types/product";
import { toStringCookies } from "@/utils/toStringCookies";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import PageHeader from "@/components/headers/PageHeader";
import MobileSidebar from "@/components/user-sidebar/MobileSidebar";
import CustomProductCard from "@/components/product-card/CustomProductCard";
export const dynamic = "force-dynamic";

const ProductsPage = async ({ searchParams }: { searchParams: any }) => {
  const allcategories = getAllCategories();
  const allproducts = getAllProducts(searchParams, toStringCookies(cookies()));

  const [
    {
      data: {
        data: { categories },
      },
    },
    {
      data: {
        data: { products },
      },
    },
  ] = await Promise.all([allcategories, allproducts]);

  return (
    <div className="col-span-12 min-w-full max-h-fit md:max-h-screen   overflow-hidden grid grid-cols-12  ">
      <SideBar links={categories} />
      <Suspense fallback={<Loader />}>
        <div className="col-span-12 md:hidden">
          <MobileSidebar categories={categories} />
        </div>
        <div className="max-w-full  max-h-fit md:max-h-full md:overflow-auto col-span-12 md:col-span-10 p-5  flex items-start justify-start gap-5 flex-wrap bg-transparent  ">
          <PageHeader classname="hidden md:block min-w-full font-bold text-start text-[3rem]">
            محصولات
          </PageHeader>
          {(products as productInterface[]).map((p) => {
            return <CustomProductCard product={p} key={p._id} />;
          })}
        </div>
      </Suspense>
    </div>
  );
};

export default ProductsPage;
