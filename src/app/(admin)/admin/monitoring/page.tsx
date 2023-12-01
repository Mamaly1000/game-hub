"use client";
import CategoriesList from "@/components/admin-landing/CategoriesList";
import CouponsList from "@/components/admin-landing/CouponsList";
import TransactionsList from "@/components/admin-landing/TransactionsList";
import UsersList from "@/components/admin-landing/UsersList";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import DisplayProductsChart from "@/components/charts/DisplayProductsChart";
import PageHeader from "@/components/headers/PageHeader";
import Loader from "@/components/loading/Loader";
import { useGetAllCoupons } from "@/hook/useCoupon";
import { useFetchAllUsers } from "@/hook/useFetchAllUsers";
import { useGetAllCategories } from "@/hook/useGetAllCategories";
import { useAllProducts } from "@/hook/useGetProducts";
import { useGetAllPayments } from "@/hook/usePayment";
import { UserInterface } from "@/types/User";
import { categoryInterface } from "@/types/category";
import { couponInterface } from "@/types/coupon";
import { adminPaymentInterface } from "@/types/payment";
import { productInterface } from "@/types/product";
import React from "react";

const page = () => {
  const { data: AllUsers, isLoading: UsersLoading } = useFetchAllUsers();
  const { data: AllProducts, isLoading: ProductsLoading } = useAllProducts();
  const { data: AllPayments, isLoading: PaymentsLoading } = useGetAllPayments();
  const { data: AllCoupons, isLoading: CouponsLoading } = useGetAllCoupons();
  const { data: AllCategories, isLoading: CategoriesLoading } =
    useGetAllCategories();
  const allUsers: UserInterface[] | null = AllUsers?.data.data.users;
  const allProducts: productInterface[] | null =
    AllProducts?.data.data.products;
  const allCoupons: couponInterface[] | null = AllCoupons?.data.data.coupons;
  const allPayments: adminPaymentInterface[] | null =
    AllPayments?.data.data.payments;
  const allCategories: categoryInterface[] | null =
    AllCategories?.data.data.categories;
  if (
    UsersLoading ||
    PaymentsLoading ||
    CategoriesLoading ||
    CouponsLoading ||
    ProductsLoading
  ) {
    return <Loader />;
  }
  return (
    <BottomAppBar>
      <PageHeader>مانیتورینگ</PageHeader>
      <div className="min-w-full grid grid-cols-12 min-h-fit gap-5 overflow-hidden">
        <div className="col-span-12 min-w-full overflow-hidden flex items-center min-h-fit justify-center relative">
          <DisplayProductsChart products={allProducts} />
        </div>
        <div className="col-span-12 md:col-span-6  min-h-fit overflow-hidden flex items-center justify-center">
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
        <div className="col-span-12 md:col-span-6 min-h-fit  overflow-hidden flex items-center justify-center">
          <TransactionsList payments={allPayments} />
        </div>
        <div className="col-span-12 md:col-span-6 min-h-fit overflow-hidden flex items-center justify-center">
          <CategoriesList categories={allCategories} />
        </div>
        <div className="col-span-12 md:col-span-6 min-h-fit overflow-hidden flex items-center justify-center">
          <CouponsList coupons={allCoupons} />
        </div>
      </div>
    </BottomAppBar>
  );
};

export default page;
