"use client";
import { useFormik } from "formik";
import Custom_textFiled from "../inputs/custom_textFiled";
import * as yup from "yup";
import { phoneNumberRegex } from "@/utils/phoneNumberRegex";
import numConvertor from "@/utils/numConvertor";
import Custom_Button from "../inputs/Custom_Button";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getOTP } from "@/services/authServices";
import { Dispatch, SetStateAction } from "react";
import Loader from "../loading/Loader";
import CustomForm from "./CustomForm";
import { getOTPresponseType } from "@/types/OTP";
const init = { phoneNumber: "" };

const SendOTPform = ({
  setStep,
  setData,
  setTimer,
}: {
  setTimer: Dispatch<SetStateAction<Date>>;
  setData: any;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: getOTP,
  });
  const formik = useFormik({
    initialValues: init,
    onSubmit: async (vals) => {
      await mutateAsync(vals, {
        onSuccess: (data: { data: { data: getOTPresponseType } }) => {
          toast.success(data.data.data.message);
          setTimer(data.data.data.expiresIn);
          setData({ phoneNumber: vals.phoneNumber, otp: "" });
          setStep(1);
        },
        onError: (err: any) => {
          setData({ phoneNumber: vals.phoneNumber, otp: "" });
          toast.error(err?.response?.data?.message);
          setStep(1);
        },
      });
    },
    validationSchema: yup.object({
      phoneNumber: yup
        .string()
        .required("لطفا شماره تلفن خود را وارد بنمایید")
        .matches(phoneNumberRegex, "شماره تلفن وارد شده معتبر نمی باشد"),
    }),
  });

  return !isPending ? (
    <CustomForm onSubmit={formik.handleSubmit}>
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
      <div className=" min-w-full flex items-center justify-center gap-4">
        <Custom_Button
          btn_type="submit"
          className="px-3 py-2 rounded-lg drop-shadow-2xl "
          text="تایید"
          type="primary"
        />{" "}
        <Custom_Button
          btn_type="reset"
          className="px-3 py-2 rounded-lg drop-shadow-2xl "
          onclick={() => {
            formik.resetForm();
          }}
          text="ریست"
          type="error"
        />
      </div>
    </CustomForm>
  ) : (
    <Loader />
  );
};

export default SendOTPform;
