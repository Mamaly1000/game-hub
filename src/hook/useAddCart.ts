import {
  ApplyCouponToCartService,
  RemoveCouponToCartService,
  addToCartService,
  removeFromCart,
} from "@/services/cartServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCart = (type: "add" | "remove") => {
  if (type === "add") {
    return useMutation({
      mutationFn: addToCartService,
      mutationKey: ["add-to-cart"],
      onError: (err) => toast.error(err.message),
    });
  }
  if (type === "remove") {
    return useMutation({
      mutationFn: removeFromCart,
      mutationKey: ["remove-from-cart"],
      onError: (err) => toast.error(err.message),
    });
  }
  return useMutation({
    mutationFn: addToCartService,
    mutationKey: ["add-to-cart"],
    onError: (err) => toast.error(err.message),
  });
};
export const useAddCouponCoupon = () => {
  return useMutation({
    mutationFn: ApplyCouponToCartService,
    mutationKey: ["add-coupon-to-cart"],
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
};
export const useRemoveCouponCoupon = () => {
  return useMutation({
    mutationFn: RemoveCouponToCartService,
    mutationKey: ["Remove-coupon-to-cart"],
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
};
