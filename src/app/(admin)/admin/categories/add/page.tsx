import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import PageHeader from "@/components/headers/PageHeader";
import React from "react";

const Add = () => {
  return (
    <div className="relative min-w-full flex flex-col items-start justify-start gap-5 ">
      <PageHeader>ایجاد دسته بندی</PageHeader>
      <CreateCategoryForm />
    </div>
  );
};

export default Add;
