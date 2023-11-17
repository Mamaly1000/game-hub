"use client";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import CustomForm from "./CustomForm";
import { categoryInterface, createCategoryInterface } from "@/types/category";
import Custom_textFiled from "../inputs/custom_textFiled";
import CustomSelect from "../inputs/CustomSelect";
import { useCreateCategory } from "@/hook/useGetAllCategories";
import Loader from "../loading/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formGenerator } from "@/utils/formGenerator";

const CreateCategoryForm = ({
  initialData,
  formType = "create",
  submitHandler,
}: {
  formType?: "create" | "update";
  initialData?: categoryInterface | null;
  submitHandler?: (data: {
    categoryId: string | undefined;
    data: any;
  }) => Promise<void>;
}) => {
  const router = useRouter();
  const { isPending, mutateAsync } = useCreateCategory();
  const formik = useFormik<createCategoryInterface>({
    initialValues: {
      title: "",
      englishTitle: "",
      description: "",
      type: "",
    },
    onSubmit: async (vals) => {
      console.log(vals);

      if (formType === "create") {
        await mutateAsync(vals).then((res) => {
          toast.success(res.data.data.message);
          router.push("/admin/categories");
        });
      }
      if (formType === "update" && submitHandler) {
        await submitHandler({ data: vals, categoryId: initialData?._id });
      }
    },
    validationSchema: yup.object({
      title: yup.string().required("عنوان دسته بندی را وارد کنید."),
      englishTitle: yup
        .string()
        .required("عنوان انگلیسی دسته بندی را وارد کنید."),
      description: yup.string().required("توضیحات دسته بندی را وارد کنید."),
      type: yup.string().required("نوع دسته بندی را وارد کنید."),
    }),
  });
  useEffect(() => {
    if (initialData) {
      formik.setValues(
        formGenerator<
          categoryInterface,
          "title" | "englishTitle" | "description" | "type",
          createCategoryInterface
        >(initialData, ["title", "englishTitle", "description", "type"])
      );
    }
  }, []);
  return !isPending ? (
    <CustomForm
      onReset={formik.handleReset}
      onSubmit={formik.handleSubmit}
      resetText="ریست فرم"
      submitText={formType === "create" ? "ایجاد دسته بندی" : "اعمال تغییرات"}
    >
      <Custom_textFiled
        label="عنوان"
        name="title"
        onchangeType="formik"
        type="text"
        value={formik.values.title}
        formik={formik}
      />
      <Custom_textFiled
        label="عنوان انگلیسی"
        name="englishTitle"
        onchangeType="formik"
        type="text"
        value={formik.values.englishTitle}
        formik={formik}
      />
      <Custom_textFiled
        label="توضیحات"
        value={formik.values.description}
        name="description"
        onchangeType="formik"
        type="text"
        formik={formik}
      />
      <CustomSelect
        formik={formik}
        label="نوع دسته بندی"
        name="type"
        onclickHandler={(val) => {
          formik.setFieldValue("type", val);
        }}
        asyncData={[
          { name: "کامنت", data: "comment" },
          { name: "پست", data: "post" },
          { name: "محصول", data: "product" },
          { name: "تیکت", data: "ticket" },
        ]}
        PreData={
          initialData
            ? { data: initialData.type, name: initialData.type }
            : undefined
        }
      />
    </CustomForm>
  ) : (
    <Loader />
  );
};

export default CreateCategoryForm;
