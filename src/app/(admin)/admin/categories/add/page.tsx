"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import PageHeader from "@/components/headers/PageHeader";
import { Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

const Add = () => {
  const router = useRouter();
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
      <PageHeader>ایجاد دسته بندی</PageHeader>
      <CreateCategoryForm />
    </BottomAppBar>
  );
};

export default Add;
