import { completeProfile } from "@/services/authServices";
import { completeProfileResponse, completeProfileType } from "@/types/OTP";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import Loader from "../loading/Loader";
import Custom_textFiled from "../inputs/custom_textFiled";
import Custom_Button from "../inputs/Custom_Button";
import * as yup from "yup";
import numConvertor from "@/utils/numConvertor";
import CustomForm from "./CustomForm";
import { useRouter } from "next/navigation";
const init: completeProfileType = {
  name: "",
  email: "",
};
const CompleteUserDataForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
    mutationKey: ["complete-profile"],
    onError: (err: any) => {
      toast.error(err.message);
      toast.error(err.response.data.message);
    },
  });
  const formik = useFormik({
    initialValues: init,
    onSubmit: async (vals) => {
      await mutateAsync(vals, {
        onSuccess: (data: { data: { data: completeProfileResponse } }) => {
          toast.success(data.data.data.message);
          router.push("/");
        },
      });
    },
    validationSchema: yup.object({
      name: yup.string().required("نام خود را وارد کنید"),
      email: yup
        .string()
        .email("ایمیل نا معتبر است")
        .required("ایمیل خود را وارد کنید"),
    }),
  });

  return !isPending ? (
    <CustomForm onSubmit={formik.handleSubmit}>
      <Custom_textFiled
        label="نام"
        name="name"
        onchangeType="custom"
        type="text"
        value={formik.values.name}
        formik={formik}
        setValue={(e) => {
          formik.setFieldValue("name", numConvertor("en", e.target.value));
        }}
      />{" "}
      <Custom_textFiled
        label="ایمیل"
        name="email"
        onchangeType="custom"
        type="email"
        value={formik.values.email}
        formik={formik}
        setValue={(e) => {
          formik.setFieldValue("email", numConvertor("en", e.target.value));
        }}
      />
      <div className="min-w-full flex items-center justify-center gap-4">
        <Custom_Button
          btn_type="submit"
          className="px-3 py-2 rounded-lg drop-shadow-2xl "
          text="تایید شماره"
          type="primary"
        />{" "}
        <Custom_Button
          btn_type="reset"
          className="px-3 py-2 rounded-lg drop-shadow-2xl "
          onclick={() => {
            formik.resetForm();
          }}
          text="حذف شماره"
          type="error"
        />
      </div>
    </CustomForm>
  ) : (
    <Loader />
  );
};

export default CompleteUserDataForm;
