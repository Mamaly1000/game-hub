"use client";
import PayDetail from "@/components/cart-components/PayDetail";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import AdminMainProductRow from "@/components/table-components/AdminMainProductRow";
import TableSample from "@/components/table-components/TableSample";
import Box from "@/components/ui/Box";
import RTL_Creator from "@/components/ui/RTL_Creator";
import { useFetchUser } from "@/hook/useAuth";
import { UserInterface } from "@/types/User";
import { cartInterface } from "@/types/cart";
import { productInterface, singleCartProductInterface } from "@/types/product";
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
        <Custom_Button disable={isLoading} onclick={() => router.push("/auth")}>
          لطفا ابتدا لاگین کنید
        </Custom_Button>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Custom_Button disable={isLoading} onclick={() => refetch()}>
          لطفا دوباره تلاش کنید
        </Custom_Button>
      </Box>
    );
  }
  if (user && user.cart && !!!user.cart.products.length) {
    return (
      <Box>
        <span>سبد خرید خالی می باشد!</span>
        <Custom_Button disable={false} onclick={() => router.push("/products")}>
          رفتن به فروشگاه
        </Custom_Button>
      </Box>
    );
  }

  return (
    <RTL_Creator>
      <div className="col-span-12 grid grid-cols-12 min-w-full items-start justify-start gap-3 flex-col p-5 max-w-full overflow-hidden">
        <div className="col-span-12 md:col-span-9">
          <TableSample
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
            TableRowData={(
              row: singleCartProductInterface | productInterface,
              i
            ) => {
              return (
                <AdminMainProductRow row={row} key={row._id} role={user.role} />
              );
            }}
          />
        </div>
        <PayDetail cart={cart || null} />
      </div>
    </RTL_Creator>
  );
};

export default CartPage;
