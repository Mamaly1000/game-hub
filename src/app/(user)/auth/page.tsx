"use client";
import CheckOTPform from "@/components/forms/CheckOTPform";
import SendOTPform from "@/components/forms/SendOTPform";
import RTL_Creator from "@/components/ui/RTL_Creator";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTimer } from "react-timer-hook";
const AuthPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ phoneNumber: "", otp: "" });
  const [timer, setTimer] = useState(new Date(Date.now() + 30 * 1000));
  const { seconds, minutes, restart, isRunning, resume } = useTimer({
    expiryTimestamp: timer,
    autoStart: false,
    onExpire: () => {
      toast.error("زمان استفاده از کد تمام شده است");
    },
  });

  return (
    <RTL_Creator>
      <div className="col-span-12  min-w-full flex items-center justify-center text-white">
        <div className="min-w-full md:min-w-[70%] md:max-w-[70%] min-h-[300px] rounded-lg drop-shadow-2xl flex flex-col items-center justify-center ">
          {step === 0 && (
            <SendOTPform
              setTimer={setTimer}
              setData={setData}
              setStep={setStep}
            />
          )}
          {step === 1 && (
            <CheckOTPform
              setTimer={setTimer}
              timer={{
                seconds: seconds,
                minutes: minutes,
                isRunning,
                timer,
                restart,
                start: resume,
              }}
              data={data}
              setData={setData}
              setStep={setStep}
            />
          )}
        </div>
      </div>
    </RTL_Creator>
  );
};

export default AuthPage;
