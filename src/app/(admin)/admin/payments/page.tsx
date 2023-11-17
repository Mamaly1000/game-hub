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
  if (!data) {
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
