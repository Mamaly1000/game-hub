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
