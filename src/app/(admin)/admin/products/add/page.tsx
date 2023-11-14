import CreateProductsForm from "@/components/forms/CreateProductsForm";
import PageHeader from "@/components/headers/PageHeader";
import React from "react";

const AddProductPage = () => {
  return (
    <div className=" min-w-full flex flex-col gap-5 items-start justify-start">
      <PageHeader>ایجاد محصول جدید</PageHeader>
      <CreateProductsForm />
    </div>
  );
};

export default AddProductPage;
