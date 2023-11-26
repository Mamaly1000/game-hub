"use client";
import { cartInterface } from "@/types/cart";
import React, { useState } from "react";
import PriceDisplay from "../product-card/PriceDisplay";
import Custom_Button from "../inputs/Custom_Button";
import { Box, Divider, Tooltip } from "@mui/material";
import { usePayment } from "@/hook/usePayment";
import toast from "react-hot-toast";
import { useFetchUser } from "@/hook/useAuth";
import Normal_textfield from "../inputs/Normal_textfield";
import Custom_Icon_Button from "../inputs/Custom_Icon_Button";
import { PostAdd } from "@mui/icons-material";

const PayDetail = ({ cart }: { cart: cartInterface | null }) => {
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const { isPending, mutateAsync } = usePayment();
  const { refetch } = useFetchUser();

  return (
    cart && (
      <div className="col-span-3 min-w-full  md:min-h-full flex flex-col items-start justify-start gap-2 bg-secondary-800 rounded-lg p-3">
        <p>اطلاعات پرداخت :</p>
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: cart.payDetail.totalGrossPrice,
          }}
          title="جمع کل"
        />{" "}
        <Custom_Divider />
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: cart.payDetail.totalOffAmount,
          }}
          title="تخفیف"
        />{" "}
        <Custom_Divider />
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: cart.payDetail.totalPrice,
          }}
          title="مبلغ قابل پرداخت"
          className="font-bold"
        />
        <Custom_Divider />
        <Box
          sx={{
            minWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <div className="w-full relative z-10">
            <Normal_textfield
              label="کد کوپن"
              name="couponCode"
              onError={(e) => {
                return { message: "", value: false };
              }}
              setValue={(e) => {
                setCouponCode(e.target.value);
              }}
              value={couponCode || ""}
            />
          </div>
          <Tooltip title="اعمال کد">
            <Custom_Icon_Button
              background="rgba(var(--color-warning), var(--tw-bg-opacity))"
              disable={false}
              onClick={() => {}}
              className="absolute end-0 top-0 z-20"
            >
              <PostAdd sx={{ color: "#ffffff" }} />
            </Custom_Icon_Button>
          </Tooltip>
        </Box>
        <Custom_Divider />
        <Custom_Button
          className=" px-3 py-2 rounded-lg drop-shadow-2xl min-w-full text-white"
          disable={isPending}
          onclick={() =>
            mutateAsync().then((res) => {
              toast.success(res.data.data.message);
              refetch();
            })
          }
          background="rgba(var(--color-success), var(--tw-bg-opacity))"
        >
          ثبت سفارش
        </Custom_Button>
      </div>
    )
  );
};

export default PayDetail;

export const Custom_Divider = () => {
  return (
    <Divider
      className="min-w-full border-b-[2px] border-white"
      sx={{ borderColor: "#ffffff" }}
    />
  );
};
