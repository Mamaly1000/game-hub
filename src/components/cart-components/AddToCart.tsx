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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Custom_link from "../inputs/Custom_link";
import { toPersianNumbers } from "@/utils/numConvertor";
import AddIcon from "@mui/icons-material/Add";
import Custom_Icon_Button from "../inputs/Custom_Icon_Button";
import Custom_Tooltip from "../ui/Custom_Tooltip";
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
  const availableProduct = user?.cart?.products.find(
    (p) => (p.productId as unknown as string) === product._id
  );

  return user && availableProduct ? (
    <div className=" mx-2 md:min-w-fit  max-w-fit flex items-center justify-center gap-2 ">
      <Custom_Icon_Button
        background="rgb(var(--color-error))"
        disable={removePending}
        onClick={removeFromCart}
      >
        <BiMinus />
      </Custom_Icon_Button>
      <span className="min-w-[35px] h-[35px] flex items-center justify-center rounded-lg font-bold border-[1px] border-primary-900 ">
        {toPersianNumbers(availableProduct.quantity)}
      </span>
      <Custom_Icon_Button
        background="rgb(var(--color-success))"
        disable={addPending}
        onClick={addToCart}
      >
        <AddIcon />
      </Custom_Icon_Button>
      {redirect && (
        <Custom_link
          classname="px-3 py-2 rounded-lg drop-shadow-2xl bg-primary-900"
          href="/cart"
          text="ادامه سفارش"
        />
      )}
    </div>
  ) : (
    <div className="mx-2">
      <Custom_Icon_Button
        background="rgb(var(--color-success))"
        disable={isLoading && addPending}
        onClick={addToCart}
      >
        <ShoppingCartIcon />
      </Custom_Icon_Button>
    </div>
  );
};

export default AddToCart;
