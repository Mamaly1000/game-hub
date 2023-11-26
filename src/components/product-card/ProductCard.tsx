import { productInterface } from "@/types/product";
import Image from "next/image";
import React from "react";
import Custom_link from "../inputs/Custom_link";
import AddToCart from "../cart-components/AddToCart";
import Badge from "../ui/Badge";
import PriceDisplay from "./PriceDisplay";
import Link from "next/link";
import NumDisplay from "../ui/NumDisplay";
import LikeButton from "./LikeButton"; 




const ProductCard = ({ product }: { product: productInterface }) => {
  return (
    <div className="min-w-full min-h-fit md:min-w-[320px] md:min-h-[320px] md:max-h-[320px] md:max-w-[320px] rounded-lg drop-shadow-2xl p-3 flex flex-col items-center justify-between gap-2 backdrop-blur-md text-inherit bg-mid_transparent ">
      <div className="relative min-w-full max-h-[130px] aspect-video rounded-lg">
        <LikeButton
          classname="absolute z-10 p-2 rounded-full top-2 start-2"
          product={product}
        />
        <Image
          src={product.imageLink}
          placeholder="blur"
          blurDataURL={product.imageLink}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="line-clamp-1 text-center font-semibold capitalize "
      >
        {product.title}
      </Link>
      <div className="min-w-full flex items-center flex-wrap justify-between gap-2 text-[.85rem] ">
        <PriceDisplay
          price={{
            discount: product.discount,
            offPrice: product.offPrice,
            price: product.price,
          }}
        />
        <Badge
          classname=" rounded-lg bg-primary-900 text-[.8rem] px-3 capitalize pt-1"
          text={product.brand}
        />
      </div>
      <div className="min-w-full flex flex-wrap items-center justify-between gap-2 text-[.85rem]">
        <Custom_link
          classname="dark:bg-secondary-900 dark:text-white  bg-primary-900  text-white px-3 py-2 rounded-lg drop-shadow-2xl"
          href={`/products/${product.slug}`}
          text={"مشاهده محصول"}
        />
        <NumDisplay
          classname="border-[1px] border-primary-900 rounded-lg p-2"
          number={product.countInStock}
          title="موجود در انبار"
        />
      </div>
      <AddToCart product={product} />
    </div>
  );
};

export default ProductCard;
