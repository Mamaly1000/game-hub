"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import CreateProductsForm from "@/components/forms/CreateProductsForm";
import PageHeader from "@/components/headers/PageHeader";
import { Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

const AddProductPage = () => {
  const router = useRouter();
  return (
    <BottomAppBar
      customIcon={{
        background: "rgb(var(--color-warning))",
        fn: () => router.push("/admin/products"),
        icon: <Settings />,
      }}
      displayAddBtn
      tooltipTitle="بازگشت به پنل"
    >
      <PageHeader>ایجاد محصول جدید</PageHeader>
      <CreateProductsForm />
    </BottomAppBar>
  );
};

export default AddProductPage;
