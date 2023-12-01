"use client";
import PaymentsAccordian from "@/components/admin-landing/PaymentsAccordian";
import CustomizedAccordions from "@/components/admin-landing/ProductAccordian";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import PageHeader from "@/components/headers/PageHeader";
import Loader from "@/components/loading/Loader";
import { useFetchUser } from "@/hook/useAuth";
import { UserInterface } from "@/types/User";
import { cartInterface } from "@/types/cart";
import { adminPaymentInterface } from "@/types/payment";
import { productInterface } from "@/types/product";
import React from "react";

const AdminPage = () => {
  const { data: AdminData, isLoading: AdminLoading } = useFetchUser();
  const user: UserInterface | null = AdminData?.data.data.user;
  const payments: productInterface[] | null = AdminData?.data.data.payments;
  const cart: cartInterface | null = AdminData?.data.data.cart;
  console.log(AdminData?.data);

  if (AdminLoading) {
    return <Loader />;
  }
  return (
    <BottomAppBar>
      <PageHeader>{user?.name + " خوش آمدید."}</PageHeader>
      <div className="min-w-full grid grid-cols-12 min-h-fit gap-5 overflow-hidden">
        <div className="col-span-12 md:col-span-6">
          <CustomizedAccordions
            products={cart?.productDetail?.slice(0, 3) as any}
            title="محصولات لایک شده"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomizedAccordions
            products={user?.likedProducts?.slice(0, 3) as any}
            title="محصولات موجود در سبد خربد"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomizedAccordions
            products={user?.Products?.slice(0, 3) as any}
            title="محصولات اضافه شده"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <PaymentsAccordian
            payments={payments?.slice(0, 3) as any}
            title="محصولات سفارش داده شده"
          />
        </div>
        <div className="col-span-12 md:col-span-6"></div>
        <div className="col-span-12 md:col-span-6"></div>
      </div>
    </BottomAppBar>
  );
};

export default AdminPage;
