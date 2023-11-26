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
          className="bg-primary-900"
          disable={isLoading}
          onclick={() => refetch()}
        >
          لطفا دوباره امتحان کنید
        </Custom_Button>
      </Box>
    );
  }
  if (!users) {
    return (
      <Box>
        <Custom_Button disable={isLoading} onclick={() => router.push("/auth")}>
          لطفا ابتدا لاگین کنید
        </Custom_Button>
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
