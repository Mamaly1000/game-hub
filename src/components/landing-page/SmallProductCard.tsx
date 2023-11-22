"use client";
import { productInterface } from "@/types/product";
import { gradientGenerator } from "@/utils/gradientGenerator";
import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import React from "react";
import RTL_Creator from "../ui/RTL_Creator";
import Custom_link from "../inputs/Custom_link";

const SmallProductCard = ({ product }: { product: productInterface }) => {
  return (
    <RTL_Creator>
      <Card
        className="group max-w-[300px] max-h-[200px]   min-w-[300px] min-h-[200px] relative p-1 overflow-hidden flex items-center justify-center"
        sx={{
          minWidth: 300,
          maxWidth: 300,
          background: "rgba(var(--color-secondary-900), var(--tw-bg-opacity))",
        }}
      >
        <Image
          className="z-10 min-w-[290px] min-h-[190px] max-w-[290px] max-h-[190px] object-cover absolute rounded-lg border-[1px] border-primary-900 group-hover:opacity-50"
          alt={product.title}
          src={product.imageLink}
          width={290}
          height={190}
        />
        <CardContent
          sx={{ background: gradientGenerator() }}
          className="relative z-20 min-w-[300px] scale-0 min-h-[200px] group-hover:scale-100 flex items-center justify-center text-white"
        >
          <Custom_link
            text={`خرید ${product.category.title}`}
            href={`/products?category=${product.category.englishTitle}`}
            classname="font-vazir px-3 py-2 rounded-lg bg-primary-900"
          />
        </CardContent>
      </Card>
    </RTL_Creator>
  );
};

export default SmallProductCard;
