import { createCouponService, deleteCouponServeci, getAllCouponService } from "@/services/coupon";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllCoupons = () => {
  return useQuery({
    queryFn: getAllCouponService,
    queryKey: ["get-coupons"],
  });
};
export const useCreateCoupon = () => {
  return useMutation({
    mutationFn: createCouponService,
    mutationKey: ["create-coupon"],
    onError: (err: any) => toast.error(err.response.data.message),
  });
};
export const useDeleteCoupon = () => {
  return useMutation({
    mutationFn: deleteCouponServeci,
    mutationKey: ["delete-coupon"],
  });
};
