"use client";
import CustomForm from "@/components/forms/CustomForm";
import PageHeader from "@/components/headers/PageHeader";
import Normal_textfield from "@/components/inputs/Normal_textfield";
import Custom_textFiled from "@/components/inputs/custom_textFiled";
import Loader from "@/components/loading/Loader";
import { useFetchUser } from "@/hook/useAuth";
import { updateUserProfile } from "@/services/authServices";
import { updateUserProfileResponse } from "@/types/OTP";
import { UpdateUserInterface, UserInterface } from "@/types/User";
import { userUpdateKeys } from "@/types/common";
import { formGenerator } from "@/utils/formGenerator";
import numConvertor from "@/utils/numConvertor";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AboutMe = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [FormData, setFormData] = useState<UpdateUserInterface | null>(null);
  const { data, isLoading, error, refetch } = useFetchUser();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: updateUserProfile,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  useEffect(() => {
    if (data) {
      setUser(data.data.data.user);
      setFormData(
        formGenerator<UserInterface, userUpdateKeys, UpdateUserInterface>(
          data.data.data.user,
          ["name", "email", "password", "biography", "phoneNumber"]
        )
      );
    }
    if (error) {
      toast.error(error.message);
    }
  }, [isLoading]);

  return !isLoading ? (
    <div className="min-w-full flex flex-col items-start justify-start gap-5">
      <PageHeader>{user?.name + " خوش آمدید"}</PageHeader>
      {FormData &&
        (!isPending ? (
          <CustomForm
            onReset={() =>
              setFormData({
                // avatarUrl: "",
                biography: "",
                email: "",
                name: "",
                phoneNumber: "",
              })
            }
            onSubmit={async (e) => {
              e.preventDefault();
              await mutateAsync(FormData as UpdateUserInterface).then(
                (data: { data: updateUserProfileResponse }) => {
                  toast.success(data.data.data.message);
                  refetch().then(() => {
                    setUser({
                      ...user,
                      ...(FormData as any),
                    });
                  });
                }
              );
            }}
            resetText="ریست"
            submitText="ذخیره اطلاعات"
          >
            {FormData &&
              Object.keys(FormData).map((key) => {
                return (
                  <Normal_textfield
                    key={key}
                    label={key}
                    name={key}
                    value={(FormData as any)[key] || ""}
                    setValue={(e) =>
                      setFormData({
                        ...FormData,
                        [e.target.name]: numConvertor("en", e.target.value),
                      })
                    }
                    onError={(e) => {
                      const error = {
                        value: false,
                        message: "",
                      };
                      if (e.target.value.length === 0) {
                        error.message = `لطفا ${key} مورد نظر خود را وارد کنید`;
                        error.value = true;
                      }
                      return error;
                    }}
                  />
                );
              })}
          </CustomForm>
        ) : (
          <Loader />
        ))}
    </div>
  ) : (
    <Loader />
  );
};

export default AboutMe;
