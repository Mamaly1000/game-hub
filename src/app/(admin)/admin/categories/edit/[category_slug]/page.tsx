"use client";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import { useGetSingleCategory } from "@/hook/useGetAllCategories";
import { categoryInterface } from "@/types/category";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const EditCategoryPage = () => {
  const { category_slug } = useParams();
  const router = useRouter();
  const { data, error, isLoading, refetch } =
    useGetSingleCategory(category_slug);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <p>{error.message}</p>
        <Custom_Button
          className=""
          onclick={() => router.push("/admin/products")}
          text="بازگشت یه پنل"
        />
      </Box>
    );
  }
  if (!data) {
    return (
      <Box>
        <Custom_Button
          className=""
          onclick={() => refetch()}
          text="دوباره تلاش کنید"
        />
      </Box>
    );
  }
  const category: categoryInterface | null = data.data.data.category;
  const submitHandler = async (data: {
    productId: string | undefined;
    data: any;
  }) => {};
  return <div></div>;
};

export default EditCategoryPage;
