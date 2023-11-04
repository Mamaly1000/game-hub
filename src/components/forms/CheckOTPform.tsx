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

const CheckOTPform = ({
  setStep,
  data,
  setData,
  timer,
}: {
  timer: {
    seconds: number;
    minutes: number;
    timer: number;
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
  const [otp, setOtp] = useState({
    fa: "",
    en: "",
  });

  const { mutateAsync, isPending } = useMutation({ mutationFn: checkOTP });
  const { mutateAsync: asyncOTPmutate, isPending: getOTPpending } = useMutation(
    { mutationFn: getOTP }
  );
  const formik = useFormik({
    initialValues: data,
    onSubmit: async (vals) => {
      await mutateAsync(vals, {
        onSuccess: (data) => {
          toast.success(data.data.data.message);
          setStep(2);
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
          setStep(2);
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

  useEffect(() => {
    if (!isPending) {
      timer.start();
    }
  }, []);

  const resetCode = async () => {
    await asyncOTPmutate(formik.values.phoneNumber, {
      onSuccess: (res) => {
        toast.success(res.data.data.message);
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      },
    });
  };

  return !isPending ? (
    <form
      className="mt-10 min-w-fit flex items-center justify-center gap-5 flex-col"
      onSubmit={formik.handleSubmit}
    >
      <span className="min-w-full text-start">کد تایید را وارد کنید</span>
      <p>
        ویرایش شماره{" "}
        <span
          onClick={() => {
            setStep(0);
            setData({
              otp: "",
              phoneNumber: "",
            });
            timer.restart(new Date(Date.now() + timer.timer * 1000), true);
          }}
          className="text-primary-900 underline"
        >
          {numConvertor("fa", formik.values.phoneNumber)}
        </span>
      </p>
      <div className="min-w-fit flex items-center justify-center gap-3 flex-wrap">
        <p className="min-w-fit ">زمان باقی مانده</p>
        <span className=" text-white bg-primary-900 rounded-lg p-3 text-center ">
          {numConvertor("fa", timer.seconds + "")}
        </span>
        <span className="font-extrabold text-primary-900">:</span>
        <span className=" text-white bg-primary-900 rounded-lg p-3 text-center ">
          {numConvertor("fa", timer.minutes + "")}
        </span>
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
      <div className="min-w-full flex items-center justify-center gap-4">
        <Custom_Button
          btn_type="submit"
          className="px-3 py-2 rounded-lg drop-shadow-2xl text-white "
          onclick={() => formik.submitForm()}
          text="تایید"
          type="primary"
        />{" "}
        <Custom_Button
          btn_type="reset"
          className="px-3 py-2 rounded-lg drop-shadow-2xl text-white "
          onclick={() => {
            timer.restart(new Date(Date.now() + timer.timer * 1000), true);
            formik.resetForm();
            setStep(0);
          }}
          text="بازگشت"
          type="error"
        />{" "}
        <Custom_Button
          btn_type="reset"
          className="px-3 py-2 rounded-lg drop-shadow-2xl text-white opacity-100 "
          onclick={() => {
            resetCode();
            timer.restart(new Date(Date.now() + timer.timer * 1000), true);
          }}
          text="دریافت مجدد کد"
          type="warning"
          disable={timer.isRunning}
        />
      </div>
    </form>
  ) : (
    <Loader />
  );
};

export default CheckOTPform;
