import { createCouponInterface } from "@/types/coupon";
import http from "./httpService";

export const createCouponService = (data: createCouponInterface) => {
  return http.post("/admin/coupon/add", data);
};
export const getAllCouponService = () => {
  return http.get("/admin/coupon/list");
};
export const deleteCouponServeci = (id: string) => {
  return http.delete(`/admin/coupon/remove/${id}`);
};
