import AddToCart from "@/components/cart-components/AddToCart";
import PageHeader from "@/components/headers/PageHeader";
import PriceDisplay from "@/components/product-card/PriceDisplay";
import { getAllProducts, getSingleProduct } from "@/services/productServices";
import { productInterface, singleProductInterface } from "@/types/product";
import { toPersianNumbersWithComma } from "@/utils/numConvertor";
import { GetServerSidePropsContext } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import React from "react";

export const dynamicParams = false;
export const dynamic = "force-static";

const SingleProductPage = async ({ params }: { params: Params }) => {
  const { data } = await getSingleProduct(params.product_slug);
  const product: singleProductInterface = await data.data.product;
  return (
    <div className="min-w-full p-5 flex items-start justify-start  gap-3 bg-inherit text-inherit flex-col">
      <PageHeader> {product.title} </PageHeader>
      <div className=" relative min-w-full flex flex-wrap items-center  justify-between gap-3">
        <p className="mb-6 min-w-full md:min-w-[40%] md:max-w-[45%] ">
          {product.description}
        </p>
        <div className="relative w-full md:w-[40%] h-[300px] ">
          <Image
            src={product.imageLink}
            alt={product.title}
            blurDataURL={product.imageLink}
            placeholder="blur"
            fill
            className="object-contain ring-1 ring-primary-900 rounded-lg drop-shadow-2xl  "
          />
        </div>
      </div>
      <div className="min-w-full flex items-center justify-between flex-wrap gap-3">
        <PriceDisplay
          price={{
            discount: null,
            offPrice: product.offPrice,
            price: product.price,
          }}
          className="border-[1px] w-full md:w-fit rounded-lg font-bold flex items-center justify-center gap-2 p-2"
        />
        <PriceDisplay
          price={{
            discount: product.discount,
            offPrice: product.offPrice,
            price: product.price,
          }}
          title="قیمت با تخفیف"
          className="border-[1px] w-full md:w-fit rounded-lg font-bold flex items-center justify-center gap-2 p-2"
        />
        <AddToCart product={product} />
      </div>
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
