import React from "react";
import { productInterface } from "../../types/product";
import CustomProductCard from "../product-card/CustomProductCard";
import Custom_link from "../inputs/Custom_link";

const ProductsSection = ({
  products,
  link,
  title,
}: {
  products: productInterface[] | undefined | null;
  link?: {
    text: string;
    route: string;
  };
  title: string;
}) => {
  return !!products && products.length > 0 ? (
    <div className="min-w-full flex flex-col items-start justify-start gap-4">
      <div
        className={`min-w-full flex flex-col md:flex-row items-center ${
          !!!link ? "justify-start" : "justify-between"
        }`}
      >
        <h2 className="font-bold capitalize text-[1.5rem] md:text-[2rem]">
          {title}
        </h2>
        {!!link && (
          <Custom_link
            href={link.route}
            classname="px-3 py-2 rounded-lg bg-primary-900 drop-shadow-2xl "
          >
            {link.text}
          </Custom_link>
        )}
      </div>
      <div className="min-w-full flex flex-wrap items-start justify-center md:justify-start gap-4">
        {products.map((p) => (
          <CustomProductCard product={p} />
        ))}
      </div>
    </div>
  ) : (
    <div className="min-w-full min-h-[300px] flex-col flex items-center justify-center gap-3">
      <p className="font-bold">محصولی با این دسته بندی وجو ندارد.</p>
      <Custom_link href="/admin/categories">بازگشت به پنل</Custom_link>
    </div>
  );
};

export default ProductsSection;
