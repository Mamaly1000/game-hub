"use client";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import CustomizedTables from "@/components/table-components/CustomTable";
import Box from "@/components/ui/Box";
import { useAllProducts } from "@/hook/useGetProducts";
import { productInterface } from "@/types/product";
import { useRouter } from "next/navigation";
import React from "react";
import { MdAdd } from "react-icons/md";
import TableActions from "@/components/table-actions/TableActions";
import { useRemoveProduct } from "@/hook/useGetSingleProduct";
const page = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useAllProducts();
  const { isPending, mutateAsync } = useRemoveProduct();
  const products: productInterface[] | null = data?.data.data.products;
  if (isLoading || isPending) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <h1>{error.message}</h1>
        <Custom_Button
          btn_type="button"
          className="bg-primary-900"
          text="لطفا دوباره امتحان کنید"
          type="primary"
          disable={isLoading}
          onclick={() => refetch()}
        />
      </Box>
    );
  }
  if (!products) {
    return (
      <Box>
        <Custom_Button
          btn_type="button"
          className=""
          text="لطفا ابتدا لاگین کنید"
          type="primary"
          disable={isLoading}
          onclick={() => router.push("/auth")}
        />
      </Box>
    );
  }

  return (
    <div className="min-w-full flex flex-col gap-3 items-start justify-start  relative">
      <PageHeader>لیست محصولات</PageHeader>
      <CustomizedTables
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
        additionalActions={(data) => {
          return (
            <TableActions refetch={refetch} fn={mutateAsync} data={data} />
          );
        }}
      />
      <Custom_Button
        btn_type="button"
        className="absolute top-2 end-2 z-10 bg-success text-white p-3 rounded-full"
        text=""
        type="primary"
        disable={false}
        onclick={() => router.push("/admin/products/add")}
      >
        <MdAdd className="w-[30px] h-[30px]" />
      </Custom_Button>
    </div>
  );
};

export default page;
