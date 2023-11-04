"use client";
import CheckOTPform from "@/components/forms/CheckOTPform";
import SendOTPform from "@/components/forms/SendOTPform";
import React, { useState } from "react"; 
import { useTimer } from "react-timer-hook";
const AuthPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ phoneNumber: "", otp: "" });
  const [timer, _setTimer] = useState(10);
  const { seconds, minutes, start, restart, isRunning } = useTimer({
    expiryTimestamp: new Date(Date.now() + timer * 1000),
    autoStart: false,
  });
  return (
    <div className="min-w-full flex items-center justify-center">
      <div className="min-w-full md:min-w-[70%] md:max-w-[70%] min-h-[300px] rounded-lg drop-shadow-2xl flex flex-col items-center justify-center ">
        {step === 0 && <SendOTPform setData={setData} setStep={setStep} />}
        {step === 1 && (
          <CheckOTPform
            timer={{
              seconds: seconds,
              minutes: minutes,
              isRunning,
              timer,
              restart,
              start,
            }}
            data={data}
            setData={setData}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;

//auth form => input + button => phone number => send otp
// input + button => text-field
// form => check otp (verify otp) =>
// request => axios || fetch
// using react-query => redux alternative (state management) + fetch + loading + error + retry + refetch + mutate
