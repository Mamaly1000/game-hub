import { phoneNumberRegex } from "@/utils/phoneNumberRegex";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import CustomForm from "./CustomForm";
import Custom_textFiled from "../inputs/custom_textFiled";
import { UpdateUserInterface, UserInterface } from "@/types/User";
import { formGenerator } from "@/utils/formGenerator";
import { userUpdateKeys } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/services/authServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateProfileForm = ({
  defaultValue = null,
}: {
  defaultValue: null | UserInterface;
}) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: updateUserProfile,
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
  const client = useQueryClient();
  const router = useRouter();
  const formik = useFormik<UpdateUserInterface>({
    initialValues: {
      name: "",
      email: "",
      biography: "",
      phoneNumber: "",
    },
    onSubmit: (vals) => {
      mutateAsync(vals).then((res) => {
        toast.success(res.data.data.message);
        client.invalidateQueries({ queryKey: ["get-user-profile"] });
        router.refresh();
      });
    },
    validationSchema: yup.object({
      name: yup.string().required("فیلد نام نباید خالی باشد."),
      email: yup
        .string()
        .email("ایمیل معتبر نیست")
        .required("فیلد ایمیل نباید خالی باشد."),
      biography: yup.string().required("فیلد بایوگرافی نباید خالی باشد."),
      phoneNumber: yup
        .string()
        .required("لطفا شماره تلفن خود را وارد بنمایید")
        .matches(phoneNumberRegex, "شماره تلفن وارد شده معتبر نمی باشد"),
    }),
  });
  useEffect(() => {
    if (defaultValue) {
      formik.setValues({
        ...formGenerator<UserInterface, userUpdateKeys, UpdateUserInterface>(
          defaultValue,
          ["name", "email", "password", "biography", "phoneNumber"]
        ),
      });
    }
  }, []);
  return (
    <CustomForm
      onReset={formik.handleReset}
      onSubmit={formik.handleSubmit}
      resetText="ریست فرم"
      submitText="اعمال تغییرات"
    >
      <Custom_textFiled
        label="نام"
        name="name"
        type="text"
        value={formik.values.name}
        formik={formik}
        onchangeType="formik"
        real_type="text"
      />
      <Custom_textFiled
        label="ایمیل"
        name="email"
        type="text"
        value={formik.values.email}
        formik={formik}
        onchangeType="formik"
        real_type="text"
      />
      <Custom_textFiled
        label="شماره تلفن"
        name="phoneNumber"
        type="tel"
        value={formik.values.phoneNumber}
        formik={formik}
        onchangeType="formik"
        real_type="number"
      />
      <Custom_textFiled
        label="بایوگرافی"
        name="biography"
        type="text"
        value={formik.values.biography || ""}
        formik={formik}
        onchangeType="formik"
        real_type="text"
      />
    </CustomForm>
  );
};

export default UpdateProfileForm;
