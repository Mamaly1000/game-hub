import AddToCart from "@/components/cart-components/AddToCart";
import { Custom_Divider } from "@/components/cart-components/PayDetail";
import PageHeader from "@/components/headers/PageHeader";
import PriceDisplay from "@/components/product-card/PriceDisplay";
import { getAllProducts, getSingleProduct } from "@/services/productServices";
import { productInterface, singleProductInterface } from "@/types/product";
import { Box } from "@mui/material";
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
    <div className=" col-span-12 min-w-full min-h-screen max-h-fit md:max-h-screen overflow-auto p-5 flex items-start justify-start  gap-3 bg-inherit text-inherit flex-col">
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
            className="object-contain rounded-lg drop-shadow-2xl  "
          />
        </div>
      </div>
      <div className="min-w-full flex items-center justify-between flex-col md:flex-wrap md:gap-3">
        <PriceDisplay
          price={{
            discount: null,
            offPrice: product.offPrice,
            price: product.price,
          }}
          className="w-full  flex items-center justify-between md:py-0 py-2"
        />
        <Custom_Divider />
        <PriceDisplay
          price={{
            discount: product.discount,
            offPrice: product.offPrice,
            price: product.price,
          }}
          className="w-full  flex items-center justify-between md:py-0 py-2"
          title="قیمت با تخفیف"
        />
        <Custom_Divider />
        <div className="min-w-full flex items-center justify-between gap-1 py-2 md:py-0">
          <span>تگ ها :</span>
          <div className="w-fit flex items-start justify-start gap-2">
            {product.tags.map((tag) => (
              <h5
                key={tag}
                className="px-2 py-1 rounded-lg bg-primary-900 text-white"
              >
                {tag}
              </h5>
            ))}
          </div>
        </div>
        <Custom_Divider />
        <div className="min-w-full flex items-center justify-between gap-1 py-2 md:py-0">
          <span>برند :</span>
          <div>{product.brand}</div>
        </div>
        <Custom_Divider />
        <div className="min-w-full flex items-center justify-between gap-1 py-2 md:py-0">
          <span>دسته بندی :</span>
          <div>{product.category.title}</div>
        </div>
        <Custom_Divider />
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: product.countInStock,
          }}
          title="موجودی انبار"
          className="w-full  flex items-center justify-between md:py-0 py-2"
        />
        <Custom_Divider />
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: product.likes.length,
          }}
          title="تعداد لایک ها"
          className="w-full  flex items-center justify-between md:py-0 py-2"
        />
        <Custom_Divider />
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: product.numReviews,
          }}
          title="تعداد ویو"
          className="w-full  flex items-center justify-between md:py-0 py-2"
        />
        <Custom_Divider />
        <div className="py-2 md:py-0">
          <AddToCart product={product} redirect />
        </div>
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
