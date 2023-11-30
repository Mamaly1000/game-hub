import { couponInterface } from "@/types/coupon";
import React from "react";
import Custom_list from "../ui/Custom_list";
import { ListItem } from "@mui/material";
import { StylesTypo } from "@/styles/Typo";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import moment from "jalali-moment";

const CouponsList = ({ coupons }: { coupons: couponInterface[] | null }) => {
  return (
    <div className="min-w-full max-w-full bg-secondary-800 rounded-[5px] drop-shadow-2xl min-h-full">
      <Custom_list
        classname="min-w-full"
        title="لیست کدهای تخفیف"
        bgcolor="inherit"
        callToAction={{ link: "/admin/coupons", text: "مشاهده همه" }}
      >
        {coupons?.map((c) => (
          <CouponListItem coupon={c} key={c._id} />
        ))}
      </Custom_list>
    </div>
  );
};

export default CouponsList;

export const CouponListItem = ({ coupon }: { coupon: couponInterface }) => {
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
        textAlign: "start",
      }}
    >
      <StylesTypo
        sx={{
          minWidth: { xs: "100px", md: "200px" },
          maxWidth: { xs: "100px", md: "200px" },
          overflow: "hidden",
        }}
      >
        {coupon.code}
      </StylesTypo>
      <StylesTypo
        sx={{
          display: { xs: "none", sm: "block" },
          minWidth: { xs: "100px", md: "200px" },
          color: "rgb(var(--color-success)) !important",
        }}
      >
        {toPersianNumbersWithComma(coupon.amount)} تومان
      </StylesTypo>
      <StylesTypo
        sx={{
          display: { xs: "none", md: "block" },
          minWidth: { xs: "100px", md: "200px" },
        }}
      >
        {coupon.type}
      </StylesTypo>
      <StylesTypo>
        {toPersianNumbers(
          moment(coupon.expireDate).format("jYYYY/jMM/jDD-HH:MM")
        )}
      </StylesTypo>
    </ListItem>
  );
};
