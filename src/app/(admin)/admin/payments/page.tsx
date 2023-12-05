"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import { useGetAllPayments } from "@/hook/usePayment";
import { adminPaymentInterface } from "@/types/payment";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import TableSample from "@/components/table-components/TableSample";
import PaymentTableRow from "@/components/table-components/SingleCollapsibleRow";
import PaymentsChart from "@/components/charts/PaymentsChart";

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
    <BottomAppBar
      customIcon={{
        fn: () => router.push("/"),
        icon: <BackspaceIcon />,
        background: "rgb(var(--color-primary-900))",
      }}
      displayAddBtn={true}
      tooltipTitle="بازکشت به سایت"
    >
      <PageHeader>لیست سفارشات</PageHeader>
      <TableSample
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
        TableRowData={(row: adminPaymentInterface, i) => {
          return (
            <PaymentTableRow
              key={row._id}
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
            />
          );
        }}
      />
      <PaymentsChart payments={payments} />
    </BottomAppBar>
  );
};

export default page;
