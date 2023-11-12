"use client";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import UsersTable from "@/components/table-components/UsersTable";
import Box from "@/components/ui/Box";
import { useFetchAllUsers } from "@/hook/useFetchAllUsers";
import { UserInterface } from "@/types/User";
import { useRouter } from "next/navigation";
import React from "react";

const UsersPage = () => {
  const router = useRouter();
  const { isLoading, error, data, refetch } = useFetchAllUsers();
  const users: UserInterface[] | null = data?.data.data.users;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <h1>{error.message}</h1>
        <Custom_Button
          btn_type="button"
          className="bg-primary-900"
          text="لطفا دوباره امتحان کنید"
          type="primary"
          disable={isLoading}
          onclick={() => refetch()}
        />
      </Box>
    );
  }
  if (!users) {
    return (
      <Box>
        <Custom_Button
          btn_type="button"
          className=""
          text="لطفا ابتدا لاگین کنید"
          type="primary"
          disable={isLoading}
          onclick={() => router.push("/auth")}
        />
      </Box>
    );
  }
  console.log(data?.data);

  return (
    <div className="min-w-full flex flex-col gap-3 items-start justify-start ">
      <PageHeader>لیست کاربران</PageHeader>
      <UsersTable
        labels={[
          "#",
          "نام",
          "ایمیل",
          "شماره تلفن",
          "تاییدیه شماره تلفن",
          "زمان ایجاد شده",
          "بایوگرافی",
          "وضعیت",
          "نقش",
          "نشان",
        ]}
        users={users}
      />
    </div>
  );
};

export default UsersPage;
