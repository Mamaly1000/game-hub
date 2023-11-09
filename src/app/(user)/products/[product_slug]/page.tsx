import { getAllProducts, getSingleProduct } from "@/services/productServices";
import { productInterface, singleProductInterface } from "@/types/product";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/numConvertor";

import { GetServerSidePropsContext } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export const dynamicParams = false;
export const dynamic = "force-static";

const SingleProductPage = async ({ params }: { params: Params }) => {
  const { data } = await getSingleProduct(params.product_slug);
  const product: singleProductInterface = await data.data.product;
  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">{product.title}</h1>
      <p className="mb-6">{product.description}</p>
      <p className="mb-6">
        قیمت محصول :{" "}
        <span className={`${product.discount ? "line-through" : "font-bold"}`}>
          {/* {toPersianNumbersWithComma(product.price)} */}
        </span>
      </p>
      {!!product.discount && (
        <div className="flex items-center gap-x-2 mb-6">
          <p className="text-xl font-bold">
            {/* قیمت با تخفیف : {toPersianNumbersWithComma(product.offPrice)} */}
          </p>
          <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
            {/* {toPersianNumbers(product.discount)} % */}
          </div>
        </div>
      )}
      {/* <AddToCart product={product} /> */}
    </div>
  );
};

export default SingleProductPage;

export const generateStaticParams = async (ctx: GetServerSidePropsContext) => {
  const {
    data: {
      data: { products },
    },
  } = await getAllProducts(ctx.params as any);

  return (products as productInterface[]).map((p) => {
    return { slug: p.slug };
  });
};
