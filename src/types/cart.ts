import { productInterface, singleCartProductInterface } from "./product";

export interface cartInterface {
  _id: string;
  productDetail: singleCartProductInterface[];
  coupon: null | string;
  payDetail: {
    totalOffAmount: number;
    totalPrice: number;
    totalGrossPrice: number;
    orderItems: Array<{
      price: number;
      product: string;
    }>;
    productIds: Array<string>;
    description: string;
  };
  products: {
    productId: productInterface;
    quantity: number;
    _id: string;
  }[];
}
