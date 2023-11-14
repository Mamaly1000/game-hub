"use client";
import React, { useEffect } from "react";
import CustomForm from "./CustomForm";
import Custom_textFiled from "../inputs/custom_textFiled";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "../ui/Box";
import CustomMultipleSelect from "../inputs/CustomMultipleSelect";
import CustomSelect from "../inputs/CustomSelect";
import { useGetAllCategories } from "@/hook/useGetAllCategories";
import { categoryInterface } from "@/types/category";
import Loader from "../loading/Loader";
import { createProductInterface } from "@/types/product";
import { useCreateProduct } from "@/hook/useCreateProduct";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateProductsForm = () => {
  const router = useRouter();
  const { isPending, mutateAsync } = useCreateProduct();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      slug: "",
      imageLink: "",
      brand: "",
      tags: [""],
      category: "",
      price: "",
      discount: "",
      countInStock: "",
    },
    onSubmit: (vals) => {
      mutateAsync({
        brand: vals.brand,
        category: vals.category,
        countInStock: vals.countInStock,
        description: vals.description,
        discount: vals.discount,
        imageLink: vals.imageLink,
        offPrice: +vals.price - +vals.discount + "",
        price: vals.price,
        slug: vals.slug,
        tags: vals.tags,
        title: vals.title,
      }).then((res) => {
        toast.success(res.data.data.message);
      });
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .required("لطفا نام محصول را وارد کنید")
        .min(5, "نام محصول باید بیشتر از 5 کاراکتر باشد")
        .max(50, "نام محصول باید کمتر از 50 کاراکتر داشته باشد."),
      description: yup.string().required("لطفا توضیحات محصول را وارد کنید"),
      slug: yup
        .string()
        .required("لطفا نشانی محصول را وارد کنید")
        .min(5, "نشانی محصول باید بیشتر از 5 کاراکتر باشد")
        .max(50, "نشانی محصول باید کمتر از 50 کاراکتر داشته باشد."),
      imageLink: yup.string().required("لطفا عکس محصول را وارد کنید"),
      brand: yup.string().required("لطفا برند محصول را وارد کنید"),
      tags: yup.array(yup.string().required("لطفا تگ های محصول را وارد کنید")),
      category: yup.string().required("لطفا دسته بندی محصول را وارد کنید"),
      price: yup.number().required("لطفا قیمت محصول را وارد کنید"),
      discount: yup.number().required("لطفا تخفیف محصول را وارد کنید"),
      countInStock: yup.number().required("لطفا تعداد محصول را وارد کنید"),
    }),
  });
  const { data, isLoading } = useGetAllCategories();
  const categories: categoryInterface[] | null = data?.data.data.categories;
  const ValidToDisplay = (
    name:
      | "title"
      | "description"
      | "slug"
      | "imageLink"
      | "brand"
      | "tags"
      | "category"
      | "price"
      | "discount"
      | "countInStock"
  ): boolean => {
    return !!formik.values[name] && !!!formik.errors[name];
  };
  return !isLoading || !isPending ? (
    <CustomForm
      onSubmit={formik.handleSubmit}
      onReset={() => {
        formik.resetForm();
      }}
      resetText="ریست فرم"
      submitText="ایجاد محصول"
    >
      <Custom_textFiled
        label="نام محصول"
        name="title"
        onchangeType="formik"
        type="text"
        value={formik.values.title}
        formik={formik}
      />
      {ValidToDisplay("title") && (
        <Custom_textFiled
          label="توضیحات محصول"
          name="description"
          onchangeType="formik"
          type="text"
          value={formik.values.description}
          formik={formik}
        />
      )}
      {ValidToDisplay("description") && (
        <Custom_textFiled
          label="نشانه یا آدرس محصول"
          name="slug"
          onchangeType="formik"
          type="text"
          value={formik.values.slug}
          formik={formik}
        />
      )}
      {ValidToDisplay("slug") && (
        <Custom_textFiled
          label="برند محصول"
          name="brand"
          onchangeType="formik"
          type="text"
          value={formik.values.brand}
          formik={formik}
        />
      )}
      {ValidToDisplay("brand") && (
        <Custom_textFiled
          label="عکس محصول"
          name="imageLink"
          onchangeType="formik"
          type="text"
          value={formik.values.imageLink}
          formik={formik}
        />
      )}
      {ValidToDisplay("brand") && (
        <Box>
          {!!formik.values.imageLink && <img src={formik.values.imageLink} />}
        </Box>
      )}
      {ValidToDisplay("imageLink") && (
        <Custom_textFiled
          label="قیمت محصول"
          name="price"
          onchangeType="formik"
          type="text"
          value={formik.values.price}
          formik={formik}
        />
      )}
      {ValidToDisplay("price") && (
        <Custom_textFiled
          label="تخفیف محصول"
          name="discount"
          onchangeType="formik"
          type="text"
          value={formik.values.discount}
          formik={formik}
        />
      )}
      {ValidToDisplay("discount") && (
        <Custom_textFiled
          label="تعداد محصول"
          name="countInStock"
          onchangeType="formik"
          type="text"
          value={formik.values.countInStock}
          formik={formik}
        />
      )}
      {ValidToDisplay("countInStock") && (
        <CustomMultipleSelect
          formik={formik}
          name="tags"
          setDataChange={(vals) => {
            formik.setFieldValue("tags", vals);
          }}
          label="تگ های مرتبط"
        />
      )}
      {ValidToDisplay("tags") && (
        <CustomSelect
          formik={formik}
          name="category"
          label="دسته بندی"
          onclickHandler={(val) => {
            const category: categoryInterface = val;
            formik.setFieldValue("category", category._id);
          }}
          asyncData={
            categories?.map((c) => {
              return {
                data: c,
                name: c.title,
              };
            }) || []
          }
        />
      )}
    </CustomForm>
  ) : (
    <Loader />
  );
};

export default CreateProductsForm;
