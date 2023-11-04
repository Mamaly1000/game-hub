import SendOTPform from "@/components/forms/SendOTPform";
import React from "react";

const AuthPage = () => {
  return (
    <div className="min-w-full flex items-center justify-center">
      <div className="min-w-full md:min-w-[70%] md:max-w-[70%] min-h-[300px] rounded-lg drop-shadow-2xl  ">
        <SendOTPform />
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
