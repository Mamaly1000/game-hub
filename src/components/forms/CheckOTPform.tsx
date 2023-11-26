import { checkOTP, getOTP } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loader from "../loading/Loader";
import OtpInput from "react-otp-input";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import numConvertor from "@/utils/numConvertor";
import Custom_Button from "../inputs/Custom_Button";
import * as yup from "yup";
import { checkOTP_responseType, getOTPresponseType } from "@/types/OTP";
import { useRouter } from "next/navigation";
import CustomForm from "./CustomForm";

const CheckOTPform = ({
  setStep,
  data,
  setData,
  timer,
  setTimer,
}: {
  setTimer: Dispatch<SetStateAction<Date>>;
  timer: {
    seconds: number;
    minutes: number;
    timer: Date;
    isRunning: boolean;
    restart: (
      newExpiryTimestamp: Date,
      autoStart?: boolean | undefined
    ) => void;
    start: () => void;
  };
  data: {
    phoneNumber: string;
    otp: string;
  };
  setData: Dispatch<SetStateAction<typeof data>>;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({ mutationFn: checkOTP });
  const { mutateAsync: asyncOTPmutate, isPending: getOTPpending } = useMutation(
    { mutationFn: getOTP }
  );
  const [otp, setOtp] = useState({
    fa: "",
    en: "",
  });
  const formik = useFormik({
    initialValues: data,
    onSubmit: async (vals) => {
      await mutateAsync(vals, {
        onSuccess: (data: { data: checkOTP_responseType }) => {
          toast.success(data.data.data.message);

          if (data.data.data.user.isActive) {
            document.location.href = "/";
          } else {
            router.push("/complete_profile");
          }
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
        },
      });
    },
    validationSchema: yup.object({
      otp: yup
        .string()
        .required("لطفا کد را وارد کنید")
        .min(6, "کد حداقل دارای شش کاراکتر می باشد."),
    }),
  });
  const resetCode = async () => {
    await asyncOTPmutate(formik.values.phoneNumber, {
      onSuccess: (res: { data: { data: getOTPresponseType } }) => {
        toast.success(res.data.data.message);
        timer.restart(res.data.data.expiresIn, true);
        setTimer(res.data.data.expiresIn);
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        timer.restart(new Date(Date.now() + 30 * 1000), true);
        setTimer(new Date(Date.now() + 30 * 1000));
      },
    });
  };
  useEffect(() => {
    if (!timer.isRunning && timer.seconds !== 0) {
      timer.start();
    }
  }, []);
  return !isPending ? (
    <CustomForm
      additionalButtons={
        <Custom_Button
          btn_type="reset"
          className="px-3 py-2 rounded-lg drop-shadow-2xl text-white opacity-100 bg-warning"
          onclick={() => {
            resetCode();
          }}
          disable={timer.isRunning}
        >
          دریافت مجدد کد
        </Custom_Button>
      }
      onSubmit={formik.handleSubmit}
      onReset={() => {
        timer.restart(new Date(timer.timer), true);
        formik.resetForm();
        setStep(0);
      }}
      resetText="بازگشت"
      submitText="تایید کد"
    >
      <div className="min-w-full flex flex-wrap items-center justify-between gap-2">
        <span className="w-full md:w-[30%] text-start">
          کد تایید را وارد کنید:
        </span>
        <p className="w-full md:w-[30%]">
          ویرایش شماره{" "}
          <span
            onClick={() => {
              setStep(0);
              setData({
                otp: "",
                phoneNumber: "",
              });
              timer.restart(new Date(timer.timer), true);
            }}
            className="text-primary-900 underline"
          >
            {numConvertor("fa", formik.values.phoneNumber)}
          </span>
        </p>
        <div className="w-full md:w-[30%] flex items-center justify-center gap-3 flex-wrap">
          <p className="min-w-fit ">زمان باقی مانده</p>
          <span className=" text-white bg-primary-900 rounded-lg p-3 text-center ">
            {numConvertor("fa", timer.seconds + "")}
          </span>
          <span className="font-extrabold text-primary-900">:</span>
          <span className=" text-white bg-primary-900 rounded-lg p-3 text-center ">
            {numConvertor("fa", timer.minutes + "")}
          </span>
        </div>
      </div>
      <div className="min-w-full flex items-center justify-center gap-3 flex-col">
        <OtpInput
          value={otp.fa}
          onChange={(v) => {
            setOtp({
              en: numConvertor("en", v),
              fa: numConvertor("fa", v),
            });
            formik.setFieldValue("otp", numConvertor("en", v));
          }}
          shouldAutoFocus
          numInputs={6}
          renderSeparator={
            <span className="text-primary-900 font-extrabold">-</span>
          }
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: `2px solid rgb(var(--color-primary-900))`,
            padding: 5,
            minWidth: 40,
            minHeight: 40,
            maxHeight: 40,
            maxWidth: 40,
            borderRadius: 5,
            outline: "none",
          }}
          containerStyle={{
            height: "56px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "self-start",
            justifyContent: "space-between",
            gap: 5,
            marginBottom: 10,
            minHeight: 130,
          }}
        />
        <p className="text-error">{formik.errors.otp}</p>
      </div>
    </CustomForm>
  ) : (
    <Loader />
  );
};

export default CheckOTPform;
