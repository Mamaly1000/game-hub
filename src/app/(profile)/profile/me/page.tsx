"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import PageHeader from "@/components/headers/PageHeader";
import Loader from "@/components/loading/Loader";
import { useFetchUser } from "@/hook/useAuth";
import { updateUserProfile } from "@/services/authServices";
import { UserInterface } from "@/types/User";
import { Backspace } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AboutMe = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | null>(null);
  const { data, isLoading, error } = useFetchUser();

  useEffect(() => {
    if (data) {
      setUser(data.data.data.user);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [isLoading]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <BottomAppBar
      customIcon={{
        background: "rgb(var(--color-primary-900))",
        fn: () => router.push("/profile"),
        icon: <Backspace />,
      }}
      displayAddBtn
      tooltipTitle="بازگشت به پنل"
    >
      <PageHeader>{user?.name + " خوش آمدید"}</PageHeader>
      {FormData && <UpdateProfileForm defaultValue={user} />}
    </BottomAppBar>
  );
};

export default AboutMe;
