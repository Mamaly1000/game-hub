"use client";
import AdminDrawer from "@/components/admin-landing/AdminDrawer";
import PaymentsAccordian from "@/components/admin-landing/PaymentsAccordian";
import CustomizedAccordions from "@/components/admin-landing/ProductAccordian";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import PayDetail from "@/components/cart-components/PayDetail";
import PaymentsChart from "@/components/charts/PaymentsChart";
import PersistentDrawerLeft from "@/components/collapsible-drawer/CollapsibleDrawer";
import Loader from "@/components/loading/Loader";
import { useFetchUser } from "@/hook/useAuth";
import { useAllProducts } from "@/hook/useGetProducts";
import { UserInterface } from "@/types/User";
import { cartInterface } from "@/types/cart";
import { adminPaymentInterface } from "@/types/payment";
import { productInterface } from "@/types/product";
import { Box } from "@mui/material";
import React, { ReactNode, useState } from "react";

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const { data: allProducts, isLoading: allProductsLoading } = useAllProducts();
  const { data: AdminData, isLoading: AdminLoading } = useFetchUser();
  const user: UserInterface | null = AdminData?.data.data.user;
  const payments: adminPaymentInterface[] | null =
    AdminData?.data.data.payments;
  const cart: cartInterface | null = AdminData?.data.data.cart;

  if (AdminLoading || allProductsLoading) {
    return <Loader />;
  }

  return (
    <BottomAppBar>
      <PersistentDrawerLeft
        title={user?.name + " خوش آمدید."}
        drawerContent={
          <AdminDrawer
            cart={+cart!.payDetail!.totalGrossPrice === 0 ? null : cart}
          />
        }
        open={open}
        setOpen={setOpen}
      >
        <div className="min-w-full max-w-full grid grid-cols-12 min-h-fit gap-5  ">
          <div className="col-span-12">
            <PaymentsChart payments={payments} />
          </div>
          <MinimizeCard
            component={(data) => {
              return (
                <CustomizedAccordions
                  products={data as any}
                  title="محصولات لایک شده"
                />
              );
            }}
            data={cart!.productDetail?.slice(0, 3)}
          />{" "}
          <MinimizeCard
            component={(data) => {
              return (
                <CustomizedAccordions
                  products={data as any}
                  title="محصولات موجود در سبد خربد"
                />
              );
            }}
            data={user!.likedProducts?.slice(0, 3)}
          />
          <MinimizeCard
            component={(data) => {
              return (
                <CustomizedAccordions
                  products={data as any}
                  title="محصولات اضافه شده"
                />
              );
            }}
            data={user!.Products?.slice(0, 3)}
          />{" "}
          <MinimizeCard
            component={(data) => {
              return (
                <PaymentsAccordian
                  payments={data as any}
                  title="محصولات سفارش داده شده"
                />
              );
            }}
            data={payments!.slice(0, 3)}
          />{" "}
          <MinimizeCard
            component={(data) => {
              return (
                <CustomizedAccordions
                  products={data as any}
                  title="محصولات تخفیف خورده"
                />
              );
            }}
            data={(
              allProducts!.data.data.products as productInterface[]
            ).filter((p) => !!p.discount)}
          />
        </div>
        {!!!(cart!.productDetail.length === 0) && (
          <Box
            sx={{
              maxWidth: "300px",
              maxHeight: "content-fit",
              display: { xs: "none", lg: open ? "none" : "block" },
              position: "fixed",
              top: "100px",
              right: "100px",
            }}
          >
            <PayDetail cart={cart} />
          </Box>
        )}
      </PersistentDrawerLeft>
    </BottomAppBar>
  );
};

export default AdminPage;

export const MinimizeCard = ({
  data = null,
  component,
}: {
  data: Array<any> | null;
  component: (data: any) => ReactNode;
}) => {
  return (
    data?.length !== 0 && (
      <div className="col-span-12 md:col-span-6">{component(data)}</div>
    )
  );
};
