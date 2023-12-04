"use client";
import React, { ReactNode, useEffect, useState } from "react";
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
import { useCreateProduct } from "@/hook/useCreateProduct";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createProductInterface, productInterface } from "@/types/product";
import Custom_Button from "../inputs/Custom_Button";
import { formGenerator } from "@/utils/formGenerator";
import Custom_Stepper from "../ui/Custom_Stepper";
import { Build, Description, PriceCheck, TagSharp } from "@mui/icons-material";

const CreateProductsForm = ({
  type = "create",
  submitHandler,
  selectedData,
}: {
  selectedData?: productInterface;
  submitHandler?: (data: {
    productId: string | undefined;
    data: createProductInterface;
  }) => void;
  type?: "create" | "update";
}) => {
  const router = useRouter();
  const { isPending, mutateAsync } = useCreateProduct();
  const [formData, setFormData] = useState<createProductInterface>({
    brand: "",
    category: "",
    countInStock: "",
    description: "",
    discount: "",
    imageLink: "",
    offPrice: "",
    price: "",
    slug: "",
    tags: [],
    title: "",
  });
  const [step, setStep] = useState(0);
  const formik1 = useFormik({
    initialValues: {
      title: "",
      description: "",
      slug: "",
      imageLink: "",
    },
    onSubmit: (vals) => {
      setFormData({ ...formData, ...vals });
      setStep(1);
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
    }),
  });
  const formik2 = useFormik({
    initialValues: {
      brand: "",
      price: "",
      discount: "",
      countInStock: "",
    },
    onSubmit: (vals) => {
      setFormData({ ...formData, ...vals });
      setStep(2);
    },
    validationSchema: yup.object({
      brand: yup.string().required("لطفا برند محصول را وارد کنید"),
      price: yup.number().required("لطفا قیمت محصول را وارد کنید"),
      discount: yup.number().required("لطفا تخفیف محصول را وارد کنید"),
      countInStock: yup.number().required("لطفا تعداد محصول را وارد کنید"),
    }),
  });
  const formik3 = useFormik({
    initialValues: {
      tags: [""],
      category: "",
    },
    onSubmit: (vals) => {
      const finalData = {
        brand: formData.brand,
        category: vals.category,
        countInStock: formData.countInStock,
        description: formData.description,
        discount: formData.discount,
        imageLink: formData.imageLink,
        offPrice: +formData.price - +formData.discount + "",
        price: formData.price,
        slug: formData.slug,
        tags: vals.tags,
        title: formData.title,
      };
      if (type === "create") {
        mutateAsync(finalData).then((res) => {
          toast.success(res.data.data.message);
          router.push(`/products/${formData.slug}`);
        });
      }
      if (type === "update" && submitHandler) {
        submitHandler({ productId: selectedData?._id, data: finalData });
      }
    },
    validationSchema: yup.object({
      tags: yup.array(yup.string().required("لطفا تگ های محصول را وارد کنید")),
      category: yup.string().required("لطفا دسته بندی محصول را وارد کنید"),
    }),
  });
  const { data, isLoading } = useGetAllCategories();
  const categories: categoryInterface[] | null = data?.data.data.categories;

  const AddBtn = (step: number, fn: () => void): ReactNode => {
    return (
      <Custom_Button
        className="bg-warning px-3 py-2 rounded-lg"
        btn_type="button"
        onclick={() => {
          setStep(step - 1);
          if (type === "create") {
            fn();
          }
        }}
      >
        بازگشت
      </Custom_Button>
    );
  };

  useEffect(() => {
    if (selectedData && type === "update") {
      setFormData(
        formGenerator<
          productInterface,
          | "brand"
          | "category"
          | "countInStock"
          | "description"
          | "discount"
          | "imageLink"
          | "offPrice"
          | "price"
          | "slug"
          | "tags"
          | "title",
          createProductInterface
        >(selectedData, [
          "brand",
          "category",
          "countInStock",
          "description",
          "discount",
          "imageLink",
          "offPrice",
          "price",
          "slug",
          "tags",
          "title",
        ])
      );
      formik1.setValues(
        formGenerator<
          productInterface,
          "description" | "imageLink" | "slug" | "title",
          typeof formik1.values
        >(selectedData, ["description", "imageLink", "slug", "title"])
      );
      formik2.setValues(
        formGenerator<
          productInterface,
          "brand" | "countInStock" | "discount" | "offPrice" | "price",
          typeof formik2.values
        >(selectedData, ["brand", "countInStock", "discount", "price"])
      );
      formik3.setValues(
        formGenerator<
          productInterface,
          "category" | "tags",
          typeof formik3.values
        >(selectedData, ["category", "tags"])
      );
    }
  }, []);

  return !isLoading || !isPending ? (
    <div className="min-w-full flex flex-col items-start justify-start gap-3">
      <div className=" min-w-full flex items-center justify-center relative gap-2  ">
        <Custom_Stepper
          step={step}
          stepsIcons={[<Description />, <PriceCheck />, <TagSharp />]}
          stepsLabels={["مرحله اول", "مرحله دوم", "مرحله آخر"]}
        />
      </div>
      {step === 0 && (
        <CustomForm
          onSubmit={formik1.handleSubmit}
          onReset={() => {
            formik1.resetForm();
          }}
          resetText="ریست فرم"
          submitText="مرحله بعد"
        >
          <Custom_textFiled
            label="نام محصول"
            name="title"
            onchangeType="formik"
            type="text"
            value={formik1.values.title}
            formik={formik1}
          />
          <Custom_textFiled
            label="توضیحات محصول"
            name="description"
            onchangeType="formik"
            type="text"
            value={formik1.values.description}
            formik={formik1}
          />
          <Custom_textFiled
            label="نشانه یا آدرس محصول"
            name="slug"
            onchangeType="formik"
            type="text"
            value={formik1.values.slug}
            formik={formik1}
          />
          <Custom_textFiled
            label="عکس محصول"
            name="imageLink"
            onchangeType="formik"
            type="text"
            value={formik1.values.imageLink}
            formik={formik1}
          />
          {!!formik1.values.imageLink && (
            <Box>
              {!!formik1.values.imageLink && (
                <img src={formik1.values.imageLink} />
              )}
            </Box>
          )}
        </CustomForm>
      )}
      {step === 1 && (
        <CustomForm
          onSubmit={formik2.handleSubmit}
          onReset={() => {
            formik2.resetForm();
          }}
          additionalButtons={AddBtn(1, formik2.resetForm)}
          resetText="ریست فرم"
          submitText="مرحله بعد"
        >
          {
            <Custom_textFiled
              label="برند محصول"
              name="brand"
              onchangeType="formik"
              type="text"
              value={formik2.values.brand}
              formik={formik2}
            />
          }

          {
            <Custom_textFiled
              label="قیمت محصول"
              name="price"
              onchangeType="formik"
              type="text"
              value={formik2.values.price}
              formik={formik2}
            />
          }
          {
            <Custom_textFiled
              label="تخفیف محصول"
              name="discount"
              onchangeType="formik"
              type="text"
              value={formik2.values.discount}
              formik={formik2}
            />
          }
          {
            <Custom_textFiled
              label="تعداد محصول"
              name="countInStock"
              onchangeType="formik"
              type="text"
              value={formik2.values.countInStock}
              formik={formik2}
            />
          }
        </CustomForm>
      )}
      {step === 2 && (
        <CustomForm
          onSubmit={formik3.handleSubmit}
          onReset={() => {
            formik3.resetForm();
          }}
          additionalButtons={AddBtn(2, formik3.resetForm)}
          resetText="ریست فرم"
          submitText="ایجاد محصول"
        >
          <CustomMultipleSelect
            formik={formik3}
            name="tags"
            setDataChange={(vals) => {
              formik3.setFieldValue("tags", vals);
            }}
            label="تگ های مرتبط"
          />
          <CustomSelect
            formik={formik3}
            name="category"
            label="دسته بندی"
            onclickHandler={(val) => {
              const category: categoryInterface = val;
              formik3.setFieldValue("category", category._id);
            }}
            asyncData={
              categories!.map((c) => {
                return {
                  data: c,
                  name: c.title,
                };
              }) || []
            }
            PreData={
              selectedData
                ? {
                    name: selectedData!.category!.title,
                    data: selectedData!.category,
                  }
                : undefined
            }
          />
        </CustomForm>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default CreateProductsForm;
