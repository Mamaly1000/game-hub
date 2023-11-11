"use client";
import PayDetail from "@/components/cart-components/PayDetail";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import CustomizedTables from "@/components/table-components/CustomTable";
import Box from "@/components/ui/Box";
import { useFetchUser } from "@/hook/useAuth";
import { UserInterface } from "@/types/User";
import { cartInterface } from "@/types/cart";
import { useRouter } from "next/navigation";
import React from "react";

const CartPage = () => {
  const { data, isLoading, error, refetch } = useFetchUser();
  const user: UserInterface | null = data?.data.data.user;
  const cart: cartInterface | null = data?.data.data.cart;

  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  } 
  if (!user) {
    return (
      <Box>
        <Custom_Button
          btn_type="button"
          className="bg-primary-900"
          text="لطفا ابتدا لاگین کنید"
          type="primary"
          disable={isLoading}
          onclick={() => router.push("/auth")}
        />
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Custom_Button
          btn_type="button"
          className="bg-primary-900"
          text="لطفا دوباره تلاش کنید"
          disable={isLoading}
          type="primary"
          onclick={() => refetch()}
        />
      </Box>
    );
  }
  if ((user && user.cart.products.length === 0) || !user.cart.products) {
    return (
      <Box>
        <span>سبد خرید خالی می باشد!</span>
        <Custom_Button
          btn_type="button"
          className="bg-primary-900"
          text="رفتن به فروشگاه"
          type="primary"
          disable={false}
          onclick={() => router.push("/products")}
        />
      </Box>
    );
  }
  return (
    <div className="min-w-full flex items-start justify-start gap-3 flex-col p-5 max-w-full overflow-hidden">
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
        rows={cart!.productDetail || []}
      />
      <PayDetail cart={cart || null} />
    </div>
  );
};

export default CartPage;
