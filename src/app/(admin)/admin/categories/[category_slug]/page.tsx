"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import Loader from "@/components/loading/Loader";
import ProductsSection from "@/components/sections/ProductsSection";
import { useGetSingleCategory } from "@/hook/useGetAllCategories";
import { useAllProducts } from "@/hook/useGetProducts";
import { categoryInterface } from "@/types/category";
import { productInterface } from "@/types/product";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

const SingleCategoryPage = () => {
  const router = useRouter();
  const { category_slug } = useParams();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetSingleCategory(category_slug);
  const { data, isLoading } = useAllProducts();
  if (isLoading || categoryLoading) {
    return <Loader />;
  }
  const category: categoryInterface | null = categoryData?.data.data.category;
  const allproducts: productInterface[] | null = data?.data.data.products;

  return (
    !!category &&
    !!allproducts && (
      <BottomAppBar
        displayAddBtn
        customIcon={{
          background: "rgb(var(--color-primary-900))",
          fn: () => router.push("/admin/categories"),
          icon: <BackspaceIcon />,
        }}
      >
        <ProductsSection
          products={allproducts!.filter(
            (p) =>
              (!!p.category.englishTitle
                ? p.category?.englishTitle
                : "تعریف نشده") === category.englishTitle
          )}
          title={"دسته بندی " + category?.title || "دسته بندی مرتبط"}
        />
      </BottomAppBar>
    )
  );
};

export default SingleCategoryPage;
