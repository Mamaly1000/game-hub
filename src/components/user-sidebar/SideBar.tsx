"use client";
import { categoryInterface } from "@/types/category";
import React, { Suspense } from "react";
import Loader from "../loading/Loader";
import ProductFilters from "../filter-components/ProductFilters";
import ProductSorts from "../sort-components/ProductSorts";
import { Box } from "@mui/material";

const SideBar = ({ links }: { links: categoryInterface[] }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          overflow: "auto",
        }}
        className=" col-span-2 text-white bg-secondary-800 items-start justify-start gap-3 flex-col max-h-screen min-h-screen "
      >
        <ProductFilters links={links} />
        <ProductSorts />
      </Box>
    </Suspense>
  );
};

export default SideBar;
