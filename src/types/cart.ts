export interface cartInterface {
  _id: string;
  productDetail: Array<unknown>;
  coupon: null | string;
  payDetail: {
    totalOffAmount: number;
    totalPrice: number;
    totalGrossPrice: number;
    orderItems: Array<unknown>;
    productIds: Array<unknown>;
    description: string;
  };
  products: {
    productId: string;
    quantity: number;
    _id: string;
  }[];
}
