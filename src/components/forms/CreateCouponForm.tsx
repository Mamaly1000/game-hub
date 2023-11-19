import { useAllProducts } from "@/hook/useGetProducts";
import { createCouponInterface } from "@/types/coupon";
import { productInterface } from "@/types/product";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import Custom_Dialog from "../ui/Custom_Dialog";
import Custom_Button from "../inputs/Custom_Button";
import { MdAdd } from "react-icons/md";
import Custom_textFiled from "../inputs/custom_textFiled";
import CustomSelect from "../inputs/CustomSelect";
import CustomMultipleSelect from "../inputs/CustomMultipleSelect";
import CustomDatePicker from "../inputs/CustomDatePicker";
import Loader from "../loading/Loader";

const CreateCouponForm = ({
  submitHandler,
  loading = false,
}: {
  loading?: boolean;
  submitHandler: (
    vals: createCouponInterface,
    setValue?: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading: productsLoading } = useAllProducts();
  const products: productInterface[] | null = data?.data.data.products;
  const formik = useFormik<createCouponInterface>({
    initialValues: {
      code: "",
      type: "",
      productIds: [""],
      amount: "",
      usageLimit: "",
      expireDate: new Date(),
    },
    onSubmit: async (vals, opt) => {
      await submitHandler(vals, setOpen);
      opt.resetForm();
    },
    validationSchema: yup.object({
      code: yup.string().required("لطفا کد تخفیف را وارد کنید"),
      type: yup.string().required("لطفا نوع کد تخفیف را وارد کنید"),
      productIds: yup.array(
        yup
          .string()
          .required("لطفا محصولاتی که شامل کد تخفیف می شوند را انتخاب کنید.")
      ),
      amount: yup.string().required("لطفا مقدار کد تخفیف را وارد کنید"),
      usageLimit: yup.string().required("لطفا محدودیت کد تخفیف را وارد کنید"),
      expireDate: yup.date().required("لطفا تاریخ انقضا کد تخفیف را وارد کنید"),
    }),
  });
  return (
    <Custom_Dialog
      open={open}
      setOpen={setOpen}
      Modal_title="ایجاد کد تخفیف"
      btnElement={
        <Custom_Button
          btn_type="button"
          className="absolute top-2 end-2 z-10 bg-success text-white p-3 rounded-full"
          text=""
          type="primary"
          disable={false}
          onclick={() => setOpen(true)}
        >
          <MdAdd className="w-[30px] h-[30px]" />
        </Custom_Button>
      }
      modalActions={
        <>
          <Custom_Button
            className="px-3 py-2 rounded-lg bg-success"
            btn_type="submit"
            text="ایجاد کوپن"
            onclick={() => formik.submitForm()}
          />{" "}
          <Custom_Button
            className="px-3 py-2 rounded-lg bg-error"
            onclick={() => {
              formik.resetForm();
              setOpen(false);
            }}
            text="ریست فرم"
          />
        </>
      }
    >
      {!productsLoading || !loading ? (
        <form
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
          className="min-w-full flex flex-col items-start justify-start gap-3 "
        >
          <Custom_textFiled
            label="کد تخفیف"
            name="code"
            onchangeType="formik"
            type="text"
            value={formik.values.code}
            formik={formik}
          />{" "}
          <Custom_textFiled
            label="مقدار کد تخفیف"
            name="amount"
            onchangeType="formik"
            type="text"
            value={formik.values.amount}
            formik={formik}
            real_type="number"
          />{" "}
          <Custom_textFiled
            label="محدودیت کد تخفیف"
            name="usageLimit"
            onchangeType="formik"
            type="text"
            real_type="number"
            value={formik.values.usageLimit}
            formik={formik}
          />{" "}
          <CustomSelect
            formik={formik}
            label="نوع کد تخفیف"
            name="type"
            onclickHandler={(val) => {
              formik.setFieldValue("type", val);
            }}
            asyncData={[
              { data: "percent", name: "درصدی" },
              { data: "fixedProduct", name: "قیمت ثابت" },
            ]}
          />
          <CustomMultipleSelect
            asyncData={
              data
                ? (products as productInterface[]).map((p) => {
                    return { data: p, name: p.title };
                  })
                : []
            }
            formik={formik}
            label="محصولات انتخاب شده"
            name="productIds"
            setDataChange={(vals) => {
              if (products) {
                formik.setFieldValue(
                  "productIds",
                  vals.map((v) => {
                    return products?.find((p) => p.title === v)?._id || "no id";
                  })
                );
              }
            }}
            displayInput={false}
          />
          <CustomDatePicker
            changeHandler={(val) => {
              formik.setFieldValue("expireDate", val);
            }}
            value={formik.values.expireDate}
            formik={formik}
            name={"expireDate"}
            label="تاریخ انقضا کد تخفیف"
          />
        </form>
      ) : (
        <Loader />
      )}
    </Custom_Dialog>
  );
};

export default CreateCouponForm;
