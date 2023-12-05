"use client";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import PaymentTableRow from "@/components/table-components/SingleCollapsibleRow";
import TableSample from "@/components/table-components/TableSample";
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
  console.log(payments);

  return (
    <div className="min-w-full flex flex-col items-start justify-start gap-3">
      <PageHeader>اطلاعات پرداخت ها</PageHeader>
      <TableSample
        labels={["#", "توضیحات", "مبلغ", "تاریخ", "وضعیت"]}
        rows={payments || []}
        TableRowData={(row: paymentType, i) => {
          return (
            <PaymentTableRow
              i={i}
              labels={[
                "نام محصول",
                "قیمت",
                "تخفیف",
                "قیمت نهایی",
                "تعداد",
                "لینک محصول",
              ]}
              row={row}
              role="USER"
            />
          );
        }}
      />
    </div>
  );
};

export default PaymentsPage;
