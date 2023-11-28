"use client";
import CompleteUserDataForm from "@/components/forms/CompleteUserDataForm";
import React from "react";

const complete_profile = () => {
  return (
    <div className="col-span-12 min-w-full flex items-center justify-center">
      <div className="min-w-full md:min-w-[70%] md:max-w-[70%] min-h-[300px] flex items-center justify-center">
        <CompleteUserDataForm />
      </div>
    </div>
  );
};

export default complete_profile;
