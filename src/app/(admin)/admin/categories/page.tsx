"use client";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import CategoriesTable from "@/components/table-components/CategoriesTable";
import { useGetAllCategories } from "@/hook/useGetAllCategories";
import { categoryInterface } from "@/types/category";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { MdAdd } from "react-icons/md";

const AddCategoryPage = () => {
  const router = useRouter();
  const { data, isLoading, refetch, error } = useGetAllCategories();
  const categories: categoryInterface[] | null = data?.data.data.categories;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <h1>{error.message}</h1>
        <Custom_Button
          background="rgba(var(--color-primary-900), var(--tw-bg-opacity))"
          disable={isLoading}
          onclick={() => refetch()}
        >
          لطفا دوباره امتحان کنید
        </Custom_Button>
      </Box>
    );
  }
  if (!categories) {
    return (
      <Box>
        <Custom_Button disable={isLoading} onclick={() => router.push("/auth")}>
          لطفا ابتدا لاگین کنید
        </Custom_Button>
      </Box>
    );
  }
  return (
    <div className="relative min-w-full flex flex-col items-start justify-start gap-5 ">
      <PageHeader>لیست دسته بندی ها</PageHeader>
      <CategoriesTable
        labels={["عنوان", "توضیحات", "عنوان انگلیسی", "نوع", "عملیات"]}
        rows={categories || []}
      />
      <Custom_Button
        className="absolute top-2 end-2 z-10 bg-success text-white p-3 rounded-full"
        disable={false}
        onclick={() => router.push("/admin/categories/add")}
      >
        <MdAdd className="w-[30px] h-[30px]" />
      </Custom_Button>
    </div>
  );
};

export default AddCategoryPage;
