"use client";
import React from "react";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import Box from "@/components/ui/Box";
import { useAllProducts } from "@/hook/useGetProducts";
import { productInterface, singleCartProductInterface } from "@/types/product";
import { useRouter } from "next/navigation";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import { Add } from "@mui/icons-material";
import TableSample from "@/components/table-components/TableSample";
import AdminMainProductRow from "@/components/table-components/AdminMainProductRow";
import DisplayProductsChart from "@/components/charts/DisplayProductsChart";
const page = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useAllProducts();
  const products: productInterface[] | null = data?.data.data.products;
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
  if (!products) {
    return (
      <Box>
        <Custom_Button disable={isLoading} onclick={() => router.push("/auth")}>
          لطفا ابتدا لاگین کنید
        </Custom_Button>
      </Box>
    );
  }

  return (
    <BottomAppBar
      displayAddBtn={true}
      tooltipTitle="ایجاد محصول جدید"
      mainOnClick={() => router.push("/admin/products/add")}
    >
      <PageHeader>لیست محصولات</PageHeader>
      <Custom_Button
        className=" animate-pulse"
        disable={false}
        onclick={() => router.push("/admin/products/add")}
        sx={{
          display: { xs: "none", md: "flex" },
          background: "rgb(var(--color-success)) !important",
          color: "inherit",
        }}
      >
        <Add /> ایجاد محصول
      </Custom_Button>
      <TableSample
        TableRowData={(
          row: singleCartProductInterface | productInterface,
          _i
        ) => {
          return <AdminMainProductRow row={row} key={row._id} />;
        }}
        labels={[
          "نام محصول",
          "تعداد",
          "قیمت",
          "تخفیف",
          "قیمت نهایی",
          "لینک محصول",
          "عملیات",
        ]}
        rows={products}
      />
      <DisplayProductsChart products={products} />
    </BottomAppBar>
  );
};

export default page;
