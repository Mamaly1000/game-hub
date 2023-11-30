import { adminPaymentInterface } from "@/types/payment";
import React from "react";
import Custom_list from "../ui/Custom_list";
import { ListItem } from "@mui/material";
import { StylesTypo } from "@/styles/Typo";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import moment from "jalali-moment";

const TransactionsList = ({
  payments,
}: {
  payments: adminPaymentInterface[] | null;
}) => {
  return (
    <div className="min-w-full max-w-full bg-secondary-800 rounded-[5px] drop-shadow-2xl min-h-full">
      <Custom_list
        title="لیست سفارشات"
        bgcolor="inherit"
        classname="min-w-full"
        callToAction={{
          link: "/admin/payments",
          text: "مشاهده همه",
        }}
      >
        {payments?.map((p) => (
          <PaymentListItem payment={p} key={p._id} />
        ))}
      </Custom_list>
    </div>
  );
};

export default TransactionsList;

export const PaymentListItem = ({
  payment,
}: {
  payment: adminPaymentInterface;
}) => {
  return (
    <ListItem
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        fontSize: ".8rem",
      }}
    >
      <StylesTypo sx={{ minWidth: "200px", textAlign: "start" }}>
        {payment.user.name}
      </StylesTypo>
      <StylesTypo sx={{ color: "rgb(var(--color-success)) !important" }}>
        {toPersianNumbersWithComma(payment.amount)} تومان
      </StylesTypo>
      <StylesTypo sx={{ display: { xs: "none", sm: "block" } }}>
        {toPersianNumbers(
          moment(new Date(+payment.paymentDate)).format("jYYYY/jMM/jDD-HH:MM")
        )}
      </StylesTypo>
    </ListItem>
  );
};
