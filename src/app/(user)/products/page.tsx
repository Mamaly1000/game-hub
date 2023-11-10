import Loader from "@/components/loading/Loader";
import ProductCard from "@/components/product-card/ProductCard";
import SideBar from "@/components/user-sidebar/SideBar";
import { getAllCategories } from "@/services/categoryServices";
import { getAllProducts } from "@/services/productServices";
import { productInterface } from "@/types/product";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

const ProductsPage = async ({ searchParams }: { searchParams: any }) => {
  const allcategories = getAllCategories();
  const allproducts = getAllProducts(searchParams);

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
    <div className="min-w-full max-h-screen min-h-screen grid grid-cols-12 grid-rows-6 ">
      <SideBar links={categories} />
      <Suspense fallback={<Loader />}>
        <div className="max-w-full col-span-9   flex items-start justify-start gap-5 flex-wrap bg-transparent p-2">
          {(products as productInterface[]).map((p) => {
            return <ProductCard product={p} key={p._id} />;
          })}
        </div>
      </Suspense>
    </div>
  );
};

export default ProductsPage;
