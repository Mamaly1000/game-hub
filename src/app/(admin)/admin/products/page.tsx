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
import Custom_Tooltip from "@/components/ui/Custom_Tooltip";
import TableSample from "@/components/table-components/TableSample";
import AdminMainProductRow from "@/components/table-components/AdminMainProductRow";
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
      <Custom_Button
        className=" min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] sticky bottom-[-60px] start-[-20px] z-10 animate-pulse"
        disable={false}
        onclick={() => router.push("/admin/products/add")}
        sx={{
          display: { xs: "none", md: "flex" },
          borderRadius: "50%",
          background: "rgb(var(--color-success)) !important",
          color: "inherit",
        }}
      >
        <Custom_Tooltip title="ایجاد محصول جدید">
          <Add />
        </Custom_Tooltip>
      </Custom_Button>
    </BottomAppBar>
  );
};

export default page;
