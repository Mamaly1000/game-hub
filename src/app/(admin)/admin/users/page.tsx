"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import UsersTable from "@/components/table-components/UsersTable";
import Box from "@/components/ui/Box";
import { useFetchAllUsers } from "@/hook/useFetchAllUsers";
import { UserInterface } from "@/types/User";
import { useRouter } from "next/navigation";
import React from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
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

  return (
    <BottomAppBar
      customIcon={{
        fn: () => router.push("/"),
        icon: <BackspaceIcon />,
        background: "rgb(var(--color-primary-900))",
      }}
      displayAddBtn={true}
      tooltipTitle="بازکشت به سایت"
    >
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
    </BottomAppBar>
  );
};

export default UsersPage;
