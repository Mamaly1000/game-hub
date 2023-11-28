"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import CreateProductsForm from "@/components/forms/CreateProductsForm";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import Box from "@/components/ui/Box";
import {
  useGetSingleProduct,
  useUpdateProduct,
} from "@/hook/useGetSingleProduct";
import { createProductInterface, productInterface } from "@/types/product";
import { Settings } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const EditProductPage = () => {
  const router = useRouter();
  const { product_slug } = useParams();
  const { isPending, mutateAsync } = useUpdateProduct(product_slug as string);
  const { data, isLoading, error, refetch } = useGetSingleProduct(
    product_slug + ""
  );
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <p>{error.message}</p>
        <Custom_Button onclick={() => router.push("/admin/products")}>
          بازگشت یه پنل
        </Custom_Button>
      </Box>
    );
  }
  if (!data) {
    return (
      <Box>
        <Custom_Button onclick={() => refetch()}>
          دوباره تلاش کنید
        </Custom_Button>
      </Box>
    );
  }
  const product: productInterface | null = data.data.data.product;
  const submitHandler = async (data: {
    productId: string | undefined;
    data: createProductInterface;
  }) => {
    await mutateAsync({
      data: data.data,
      productId: data.productId || (product_slug as string),
    }).then((res) => {
      toast.success(res.data.data.message);
      router.push(`/admin/products`);
    });
  };
  return (
    <BottomAppBar
      customIcon={{
        background: "rgb(var(--color-warning))",
        fn: () => router.push("/admin/products"),
        icon: <Settings />,
      }}
      displayAddBtn
      tooltipTitle="بازگشت به پنل"
    >
      <PageHeader>{product?.title}</PageHeader>
      {product && !isPending ? (
        <CreateProductsForm
          selectedData={product}
          submitHandler={submitHandler}
          type="update"
        />
      ) : (
        <Loader />
      )}
    </BottomAppBar>
  );
};

export default EditProductPage;
