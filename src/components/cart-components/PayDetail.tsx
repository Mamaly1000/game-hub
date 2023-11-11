"use client";
import { cartInterface } from "@/types/cart";
import React from "react";
import PriceDisplay from "../product-card/PriceDisplay";
import Custom_Button from "../inputs/Custom_Button";
import { Divider } from "@mui/material";

const PayDetail = ({ cart }: { cart: cartInterface | null }) => {
  return (
    cart && (
      <div className="min-w-full md:min-w-fit md:max-w-fit flex flex-col items-start justify-start gap-2 bg-secondary-800 rounded-lg p-3">
        <p>اطلاعات پرداخت :</p>
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: cart.payDetail.totalGrossPrice,
          }}
          title="جمع کل"
        />{" "}
        <Divider className="min-w-full border-b-[2px] border-white" />
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: cart.payDetail.totalOffAmount,
          }}
          title="تخفیف"
        />{" "}
        <Divider className="min-w-full border-b-[2px] border-white" />
        <PriceDisplay
          price={{
            discount: null,
            offPrice: null,
            price: cart.payDetail.totalPrice,
          }}
          title="مبلغ قابل پرداخت"
          className="font-bold"
        />
        <Divider className="min-w-full border-b-[2px] border-white" />
        <Custom_Button
          btn_type="button"
          className="bg-success px-3 py-2 rounded-lg drop-shadow-2xl min-w-full"
          text="ثبت سفارش"
          type="success"
          disable={false}
        />
      </div>
    )
  );
};

export default PayDetail;
