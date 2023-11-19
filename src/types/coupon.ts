import { productInterface } from "./product";

export interface couponInterface {
  code: string;
  type: "fixedProduct" | "percent";
  amount: number;
  expireDate: Date;
  isActive: boolean;
  usageCount: number;
  usageLimit: number;
  productIds: productInterface[];
  _id: string;
}
export interface createCouponInterface {
  code: string;
  type: string;
  productIds: string[];
  amount: string;
  usageLimit: string;
  expireDate: Date | null | string;
}
