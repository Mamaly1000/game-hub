"use client";
import PageHeader from "@/components/headers/PageHeader";
import Loader from "@/components/loading/Loader";
import { useFetchUser } from "@/hook/useAuth";
import { UserInterface } from "@/types/User";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DisplayDate from "@/components/date-display/DisplayDate";
const ProfilePage = () => {
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
  return !isLoading && data ? (
    <div className="min-w-full flex items-start justify-start gap-5 ">
      <PageHeader>{user?.name + " خوش آمدید"}</PageHeader>
      <DisplayDate title="تاریخ پیوستن" defaultValue={true} user={user} />
    </div>
  ) : (
    <Loader />
  );
};

export default ProfilePage;
