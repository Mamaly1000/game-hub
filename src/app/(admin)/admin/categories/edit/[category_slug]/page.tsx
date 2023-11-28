"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import {
  useGetSingleCategory,
  useUpdateCategory,
} from "@/hook/useGetAllCategories";
import { categoryInterface } from "@/types/category";
import { Settings } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const EditCategoryPage = () => {
  const { category_slug } = useParams();
  const router = useRouter();
  const { data, error, isLoading, refetch } =
    useGetSingleCategory(category_slug);
  const { isPending, mutateAsync } = useUpdateCategory();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <p>{error.message}</p>
        <Custom_Button onclick={() => router.push("/admin/products")}>
          بازگشت یه پنل
        </Custom_Button>
      </Box>
    );
  }
  if (!data) {
    return (
      <Box>
        <Custom_Button onclick={() => refetch()}>
          دوباره تلاش کنید
        </Custom_Button>
      </Box>
    );
  }
  const category: categoryInterface | null = data.data.data.category;
  const submitHandler = async (data: {
    categoryId: string | undefined;
    data: any;
  }) => {
    await mutateAsync({
      data: data.data,
      id: data.categoryId || (category_slug as string),
    }).then((res) => {
      toast.success(res.data.data.message);
      router.push("/admin/categories");
    });
  };
  return (
    <BottomAppBar
    customIcon={{
      background: "rgb(var(--color-warning))",
      fn: () => router.push("/admin/categories"),
      icon: <Settings />,
    }}
    displayAddBtn
    tooltipTitle="بازگشت به پنل"
  >
      <PageHeader>{"دسته بندی " + category?.title}</PageHeader>
      {!isPending ? (
        <CreateCategoryForm
          initialData={category}
          formType="update"
          submitHandler={submitHandler}
        />
      ) : (
        <Loader />
      )}
    </BottomAppBar>
  );
};

export default EditCategoryPage;
