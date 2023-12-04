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
import { Metadata } from "next";
import { Box } from "@mui/material";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "به صفحه محصولات game hub خوش آمدید.",
  description: "با ما بروز باشید.",
};

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
        <Box
          sx={{
            display: { xs: "block", md: "none" },
          }}
          className="col-span-12"
        >
          <MobileSidebar categories={categories} />
        </Box>
        <Box
          sx={{
            overflow: { md: "auto" },
            maxHeight: { xs: "fit-content", md: "100%" },
            gridColumn: { xs: "span 12 / span 12", md: "span 10 / span 10" },
          }}
          className="max-w-full  p-5  flex items-start justify-center md:justify-start gap-5 flex-wrap bg-transparent  "
        >
          <Box sx={{ display: { xs: "none", md: "block" }, minWidth: "100%" }}>
            <PageHeader classname="hidden md:block min-w-full font-bold text-start text-[3rem]">
              محصولات
            </PageHeader>
          </Box>
          {(products as productInterface[]).map((p) => {
            return <CustomProductCard product={p} key={p._id} />;
          })}
        </Box>
      </Suspense>
    </div>
  );
};

export default ProductsPage;
