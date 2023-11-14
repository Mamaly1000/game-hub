"use client";
import { useFetchUser } from "@/hook/useAuth";
import { UserInterface } from "@/types/User";
import {
  productInterface,
  singleCartProductInterface,
  singleProductInterface,
} from "@/types/product";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Custom_Button from "../inputs/Custom_Button";
import { useCart } from "@/hook/useAddCart";
import { HiOutlinePlusSm } from "react-icons/hi";
import { BiMinus } from "react-icons/bi";
import Custom_link from "../inputs/Custom_link";
import { toPersianNumbers } from "@/utils/numConvertor";
const AddToCart = ({
  product,
  redirect = true,
}: {
  redirect?: boolean;
  product:
    | singleProductInterface
    | productInterface
    | singleCartProductInterface;
}) => {
  const { data, isLoading, refetch } = useFetchUser();
  const { isPending: addPending, mutateAsync: addMutation } = useCart("add");
  const { isPending: removePending, mutateAsync: removeMutation } =
    useCart("remove");
  const user: UserInterface | null = data?.data.data.user;
  const router = useRouter();
  const addToCart = async () => {
    if (!user || !user.isActive) {
      toast.error("لطفا ابتدا لاگین کنید.");
      router.push("/auth");
    } else {
      await addMutation(product._id).then((res) => {
        refetch();
        toast.success(res.data.data.message);
      });
    }
  };
  const removeFromCart = async () => {
    if (user && !user.isActive) {
      toast.error("لطفا ابتدا لاگین کنید.");
      router.push("/auth");
    } else {
      await removeMutation(product._id).then((res) => {
        refetch();
        toast.success(res.data.data.message);
      });
    }
  };
  const availableProduct = user?.cart.products.find(
    (p) => p.productId._id === product._id
  );
  return user && availableProduct ? (
    <div className="min-w-full md:min-w-fit md:max-w-fit flex items-center justify-center gap-2 ">
      <Custom_Button
        btn_type="button"
        className="bg-error rounded-lg  text-white w-[35px] h-[35px] flex items-center justify-center "
        text=""
        type="error"
        disable={removePending}
        onclick={removeFromCart}
      >
        <BiMinus />
      </Custom_Button>
      <span className="min-w-[35px] h-[35px] flex items-center justify-center rounded-lg font-bold border-[1px] border-primary-900 ">
        {toPersianNumbers(availableProduct.quantity)}
      </span>
      <Custom_Button
        btn_type="button"
        className="bg-success rounded-lg w-[35px] h-[35px] flex items-center justify-center  text-white"
        text=""
        type="success"
        disable={addPending}
        onclick={addToCart}
      >
        <HiOutlinePlusSm />
      </Custom_Button>
      {redirect && <Custom_link classname="" href="/cart" text="ادامه سفارش" />}
    </div>
  ) : (
    <div>
      <Custom_Button
        btn_type="button"
        className="bg-success px-3 py-2 rounded-lg whitespace-nowrap"
        text="اضافه کردن به سبد خرید"
        type="success"
        disable={isLoading && addPending}
        onclick={addToCart}
      />
    </div>
  );
};

export default AddToCart;
