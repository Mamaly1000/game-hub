"use client";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import Box from "@/components/ui/Box";
import { useGetSinglePayments } from "@/hook/usePayment";
import { paymentType } from "@/types/payment";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const { payment_id } = useParams();
  const { data, isLoading, refetch, error } = useGetSinglePayments(
    payment_id as string
  );
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
  const payment: paymentType = data.data.data.payment;

  return (
    <div className="min-w-full flex flex-col gap-3 items-start justify-start  relative">
      <PageHeader>لیست سفارشات</PageHeader>
      {payment.amount}
    </div>
  );
};

export default page;
