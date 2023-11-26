"use client";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import PaymentsCustomTable from "@/components/table-components/PaymentsCustomTable";
import { useGetAllPayments } from "@/hook/usePayment";
import { adminPaymentInterface } from "@/types/payment";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const { data, error, isLoading, refetch } = useGetAllPayments();
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
  if (!data) {
    return (
      <Box>
        <Custom_Button
          className="bg-primary-900"
          disable={isLoading}
          onclick={() => router.push("/auth")}
        >
          لطفا ابتدا لاگین کنید
        </Custom_Button>
      </Box>
    );
  }
  const payments: adminPaymentInterface[] | null = data.data.data.payments;

  return (
    <div className="min-w-full flex flex-col gap-3 items-start justify-start  relative">
      <PageHeader>لیست سفارشات</PageHeader>
      <PaymentsCustomTable
        labels={[
          "شماره فاکتور",
          "توضیحات",
          "نام کاربر",
          "ایمیل کاربر",
          "شماره کاربر",
          "مبلغ",
          "تاریخ",
          "وضعیت",
        ]}
        rows={payments || []}
      />
    </div>
  );
};

export default page;
