import SideBar from "@/components/user-sidebar/SideBar";
import { getAllCategories } from "@/services/categoryServices";
import { getAllProducts } from "@/services/productServices";
import { productInterface } from "@/types/product";
import React from "react";

export const dynamic = "force-dynamic";

const ProductsPage = async ({ searchParams }: { searchParams: any }) => {
  const {
    data: {
      data: { categories },
    },
  } = await getAllCategories();
  const {
    data: {
      data: { products },
    },
  } = await getAllProducts(searchParams);

  return (
    <div className="min-w-full max-h-screen min-h-screen grid grid-cols-12 grid-rows-6 ">
      <SideBar links={categories} />
      <div className="max-w-full col-span-9   flex items-start justify-start gap-5 flex-wrap bg-transparent p-2">
        {(products as productInterface[]).map((p) => (
          <div
            className="p-5 rounded-lg drop-shadow-2xl bg-primary-900 text-white font-bold"
            key={p._id}
          >
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
