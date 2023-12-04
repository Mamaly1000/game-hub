"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import AdminCategoryRow from "@/components/table-components/AdminCategoryRow";
import TableSample from "@/components/table-components/TableSample"; 
import { useGetAllCategories } from "@/hook/useGetAllCategories";
import { categoryInterface } from "@/types/category";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react"; 

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
    <BottomAppBar
      mainOnClick={() => router.push("/admin/categories/add")}
      displayAddBtn
      tooltipTitle="ایجاد دسته بندی جدید"
    >
      <PageHeader>لیست دسته بندی ها</PageHeader>
      <Custom_Button
        onclick={() => router.push("/admin/categories/add")}
        className=" animate-pulse"
        sx={{
          display: { xs: "none", md: "flex" },
          background: "rgb(var(--color-success)) !important",
          color: "inherit",
        }}
      >
        <Add /> ایجاد دسته بندی
      </Custom_Button>
      <TableSample
        TableRowData={(row: categoryInterface, i) => {
          return <AdminCategoryRow i={i} row={row} />;
        }}
        labels={["عنوان", "توضیحات", "عنوان انگلیسی", "نوع", "عملیات"]}
        rows={categories || []}
      />
    </BottomAppBar>
  );
};

export default AddCategoryPage;
