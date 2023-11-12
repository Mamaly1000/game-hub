"use client";
import { categoryInterface } from "@/types/category";
import React, { Suspense } from "react";
import Loader from "../loading/Loader";
import ProductFilters from "../filter-components/ProductFilters";
import ProductSorts from "../sort-components/ProductSorts";

const SideBar = ({ links }: { links: categoryInterface[] }) => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="col-span-2 text-white bg-secondary-800 flex items-start justify-start gap-3 flex-col max-h-screen min-h-screen ">
        <ProductFilters links={links} />
        <ProductSorts />
      </div>
    </Suspense>
  );
};

export default SideBar;
