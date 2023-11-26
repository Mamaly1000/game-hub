"use client";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import CollapsibleTable from "@/components/table-components/CollapsibleTable";
import Box from "@/components/ui/Box";
import { useFetchUser } from "@/hook/useAuth";
import { paymentType } from "@/types/payment";
import React from "react";

const PaymentsPage = () => {
  const { data, isLoading, error, refetch } = useFetchUser();
  const payments: paymentType[] | null = data?.data.data.payments;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <p>{error.message}</p>
        <Custom_Button
          className="bg-primary-900"
          disable={isLoading}
          onclick={() => refetch()}
        >
          دوباره تلاش کنید
        </Custom_Button>
      </Box>
    );
  }

  return (
    payments && (
      <div className="min-w-full flex flex-col items-start justify-start gap-3">
        <PageHeader>اطلاعات پرداخت ها</PageHeader>
        <CollapsibleTable
          labels={["#", "شماره فاکتور", "توضیحات", "مبلغ", "تاریخ", "وضعیت"]}
          rows={payments || []}
        />
      </div>
    )
  );
};

export default PaymentsPage;
