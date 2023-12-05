import { UserInterface } from "./User";
import { cartInterface } from "./cart";

export interface paymentType {
  _id: string;
  invoiceNumber: string;
  paymentMethod: string;
  amount: number;
  description: string;
  status: string;
  isPaid: boolean;
  authority: string;
  user: UserInterface;
  paymentDate: string;
  cart: cartInterface;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface adminPaymentInterface {
  _id: string;
  invoiceNumber: string;
  paymentMethod: string;
  amount: number;
  description: string;
  status: string;
  isPaid: boolean;
  authority: string;
  user: {
    _id: string;
    phoneNumber: string;
    email: string;
    name: string;
    avatarUrl: string | null;
  };
  paymentDate: string;
  cart: {
    _id: string;
    productDetail: {
      _id: string;
      title: string;
      slug: string;
      imageLink: string;
      price: number;
      offPrice: number;
      discount: number;
      quantity: number;
    }[];
    coupon: null | string;
    payDetail: {
      totalOffAmount: number;
      totalPrice: number;
      totalGrossPrice: number;
      orderItems: {
        price: number;
        product: string;
      }[];
      productIds: string[];
      description: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
