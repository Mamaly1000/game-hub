"use client";
import React from "react";
import CustomForm from "./CustomForm";
import Custom_textFiled from "../inputs/custom_textFiled";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "../ui/Box";
import CustomSelect from "../inputs/CustomSelect";

const CreateProductsForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      slug: "",
      imageLink: "",
      brand: "",
      tags: [],
      category: "",
      price: "",
      discount: "",
      offPrice: "",
      countInStock: "",
    },
    onSubmit: (vals) => {
      console.log(vals);
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
      tags: yup.array().required("لطفا تگ های محصول را وارد کنید"),
      category: yup.string().required("لطفا دسته بندی محصول را وارد کنید"),
      price: yup.number().required("لطفا قیمت محصول را وارد کنید"),
      discount: yup.number().required("لطفا تخفیف محصول را وارد کنید"),
      offPrice: yup.number().required("لطفا قیمت نهایی محصول را وارد کنید"),
      countInStock: yup.number().required("لطفا تعداد محصول را وارد کنید"),
    }),
  });
  return (
    <CustomForm
      onReset={formik.handleSubmit}
      onSubmit={() => {
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
        setValue={(e) => {
          console.log(e.target.value);
        }}
      />{" "}
      <Custom_textFiled
        label="توضیحات محصول"
        name="description"
        onchangeType="formik"
        type="text"
        value={formik.values.description}
        formik={formik}
        setValue={(e) => {
          console.log(e.target.value);
        }}
      />{" "}
      <Custom_textFiled
        label="نشانه یا آدرس محصول"
        name="slug"
        onchangeType="formik"
        type="text"
        value={formik.values.slug}
        formik={formik}
        setValue={(e) => {
          console.log(e.target.value);
        }}
      />{" "}
      <Custom_textFiled
        label="برند محصول"
        name="brand"
        onchangeType="formik"
        type="text"
        value={formik.values.brand}
        formik={formik}
        setValue={(e) => {
          console.log(e.target.value);
        }}
      />{" "}
      <Custom_textFiled
        label="عکس محصول"
        name="imageLink"
        onchangeType="formik"
        type="text"
        value={formik.values.imageLink}
        formik={formik}
        setValue={(e) => {
          console.log(e.target.value);
        }}
      />
      <Box>
        {!!formik.values.imageLink && <img src={formik.values.imageLink} />}
      </Box>
      <Custom_textFiled
        label="قیمت محصول"
        name="price"
        onchangeType="formik"
        type="number"
        value={formik.values.price}
        formik={formik}
        setValue={(e) => {
          console.log(e.target.value);
        }}
      />{" "}
      <Custom_textFiled
        label="تخفیف محصول"
        name="discount"
        onchangeType="formik"
        type="number"
        value={formik.values.discount}
        formik={formik}
        setValue={(e) => {
          console.log(e.target.value);
        }}
      />{" "}
      <CustomSelect />
    </CustomForm>
  );
};

export default CreateProductsForm;
