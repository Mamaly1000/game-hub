"use client";
import CategoriesList from "@/components/admin-landing/CategoriesList";
import CouponsList from "@/components/admin-landing/CouponsList";
import TransactionsList from "@/components/admin-landing/TransactionsList";
import UsersList from "@/components/admin-landing/UsersList";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import Custom_LineChart from "@/components/charts/Custom_LineChart";
import PageHeader from "@/components/headers/PageHeader";
import Loader from "@/components/loading/Loader";
import { useFetchUser } from "@/hook/useAuth";
import { useGetAllCoupons } from "@/hook/useCoupon";
import { useFetchAllUsers } from "@/hook/useFetchAllUsers";
import { useGetAllCategories } from "@/hook/useGetAllCategories";
import { useGetAllPayments } from "@/hook/usePayment";
import { UserInterface } from "@/types/User";
import { cartInterface } from "@/types/cart";
import { categoryInterface } from "@/types/category";
import { couponInterface } from "@/types/coupon";
import { adminPaymentInterface } from "@/types/payment";
import React from "react";

const AdminPage = () => {
  const { data: AdminData, isLoading: AdminLoading } = useFetchUser();
  const { data: AllUsers, isLoading: UsersLoading } = useFetchAllUsers();
  const { data: AllPayments, isLoading: PaymentsLoading } = useGetAllPayments();
  const { data: AllCoupons, isLoading: CouponsLoading } = useGetAllCoupons();
  const { data: AllCategories, isLoading: CategoriesLoading } =
    useGetAllCategories();
  const user: UserInterface | null = AdminData?.data.data.user;
  const payments: adminPaymentInterface | null = AdminData?.data.data.payments;
  const cart: cartInterface | null = AdminData?.data.data.cart;
  const allUsers: UserInterface[] | null = AllUsers?.data.data.users;
  const allCoupons: couponInterface[] | null = AllCoupons?.data.data.coupons;
  const allPayments: adminPaymentInterface[] | null =
    AllPayments?.data.data.payments;
  const allCategories: categoryInterface[] | null =
    AllCategories?.data.data.categories;
  console.log(allCoupons);

  if (
    AdminLoading ||
    UsersLoading ||
    PaymentsLoading ||
    CategoriesLoading ||
    CouponsLoading
  ) {
    return <Loader />;
  }
  return (
    <BottomAppBar>
      <PageHeader>{user?.name + " خوش آمدید."}</PageHeader>
      <div className="min-w-full flex-wrap items-start justify-start gap-5 overflow-hidden">
        <div className="min-w-full max-w-full min-h-fit overflow-hidden flex items-center justify-center">
          <UsersList
            allUsers={
              allUsers?.sort((a, b) => {
                var textA = a.role.toUpperCase();
                var textB = b.role.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              }) || []
            }
          />
        </div>
        <div className="min-w-full min-h-fit overflow-hidden flex items-center justify-center">
          <TransactionsList payments={allPayments} />
        </div>
        <div className="min-w-full min-h-fit overflow-hidden flex items-center justify-center">
          <CategoriesList categories={allCategories} />
        </div>
        <div className="min-w-full min-h-fit overflow-hidden flex items-center justify-center">
          <CouponsList coupons={allCoupons} />
        </div>
        <div className="min-w-full min-h-fit overflow-hidden flex items-center justify-center relative">
          <Custom_LineChart />
        </div>
      </div>
    </BottomAppBar>
  );
};

export default AdminPage;
