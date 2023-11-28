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
import { useAddCouponCoupon, useRemoveCouponCoupon } from "@/hook/useAddCart";
import { useRouter } from "next/navigation";

const PayDetail = ({ cart }: { cart: cartInterface | null }) => {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const { isPending, mutateAsync } = usePayment();
  const { refetch } = useFetchUser();
  const { isPending: addCouponPending, mutateAsync: addcouponAsync } =
    useAddCouponCoupon();
  const { isPending: removeCouponPending, mutateAsync: removecouponAsync } =
    useRemoveCouponCoupon();
  return (
    cart && (
      <div className="col-span-12 md:col-span-3 min-w-full  md:min-h-full flex flex-col items-start justify-start gap-2 bg-secondary-800 rounded-lg p-3">
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
            flexDirection: "row",
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
          <Custom_Icon_Button
            background="rgba(var(--color-warning), var(--tw-bg-opacity))"
            disable={addCouponPending}
            onClick={async () => {
              couponCode &&
                (await addcouponAsync(couponCode)
                  .then((res) => {
                    refetch();
                    router.refresh();
                    toast.success(res.data.data.message);
                    setCouponCode(null);
                  })
                  .catch(() => setCouponCode(null)));
            }}
            className="absolute end-0 top-0 z-20"
          >
            <Tooltip title="اعمال کد">
              <PostAdd sx={{ color: "#ffffff" }} />
            </Tooltip>
          </Custom_Icon_Button>
        </Box>
        <Custom_Divider />
        <div className="min-w-full flex flex-wrap items-center justify-start gap-2">
          <Custom_Button
            className=" px-3 py-2 rounded-lg drop-shadow-2xl min-w-full text-white"
            disable={isPending}
            onclick={() =>
              mutateAsync().then((res) => {
                toast.success(res.data.data.message);
                router.refresh();
                refetch();
              })
            }
            background="rgba(var(--color-success), var(--tw-bg-opacity))"
          >
            ثبت سفارش
          </Custom_Button>
          {!!cart.coupon && (
            <Custom_Button
              className=" px-3 py-2 rounded-lg drop-shadow-2xl min-w-full text-white"
              disable={isPending || removeCouponPending}
              onclick={async () =>
                await removecouponAsync().then((res) => {
                  toast.success(res.data.data.message);
                  router.refresh();
                  refetch();
                })
              }
              background="rgba(var(--color-error), var(--tw-bg-opacity))"
            >
              غیر فعال کردن کد تخفیف
            </Custom_Button>
          )}
        </div>
      </div>
    )
  );
};

export default PayDetail;

export const Custom_Divider = ({ classname }: { classname?: string }) => {
  return (
    <Divider
      className={`min-w-full border-b-[2px] border-white ${classname}`}
      sx={{ borderColor: "#ffffff" }}
    />
  );
};
