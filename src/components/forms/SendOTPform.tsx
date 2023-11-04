"use client";
import { useFormik } from "formik";
import Custom_textFiled from "../inputs/custom_textFiled";
import * as yup from "yup";
import { phoneNumberRegex } from "@/utils/phoneNumberRegex";
import numConvertor from "@/utils/numConvertor";
import Custom_Button from "../inputs/Custom_Button";
import http from "@/services/httpService";
import toast from "react-hot-toast";
const init = { phoneNumber: "" };

const SendOTPform = () => {
  const formik = useFormik({
    initialValues: init,
    onSubmit: (val) => {
      http
        .post("/user/get-otp", val)
        .catch((err) => toast.error(err.response.data.message));
    },
    validationSchema: yup.object({
      phoneNumber: yup
        .string()
        .required("لطفا شماره تلفن خود را وارد بنمایید")
        .matches(phoneNumberRegex, "شماره تلفن وارد شده معتبر نمی باشد"),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-w-full flex flex-col items-center justify-center gap-5 p-5 text-secondary-100 dark:text-white"
    >
      <Custom_textFiled
        label="شماره تلفن"
        name="phoneNumber"
        type="tel"
        value={formik.values.phoneNumber}
        formik={formik}
        onchangeType="custom"
        setValue={(e) => {
          formik.setFieldValue(
            "phoneNumber",
            numConvertor("en", numConvertor("en", e.target.value))
          );
        }}
      />
      <div className="min-w-full flex items-center justify-center gap-4">
        <Custom_Button
          btn_type="submit"
          className="px-3 py-2 rounded-lg drop-shadow-2xl "
          onclick={() => {
            formik.submitForm();
          }}
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
    </form>
  );
};

export default SendOTPform;
