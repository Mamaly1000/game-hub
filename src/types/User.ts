import { cartInterface } from "./cart";
import { ROLES } from "./common";
import { productInterface } from "./product";

export interface UserInterface {
  name: string;
  avatar: string;
  biography: string | null;
  likedProducts: Array<productInterface>;
  email: string;
  phoneNumber: string;
  password: string;
  otp: {
    code: number;
    expiresIn: Date;
  };
  resetLink: string | null;
  isVerifiedPhoneNumber: boolean;
  isActive: boolean;
  Products: Array<productInterface>;
  role: ROLES;
  cart: cartInterface;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  avatarUrl: null | string;
}
export interface UpdateUserInterface {
  name: string;
  biography: string | null;
  email: string;
  phoneNumber: string;
  // avatarUrl: null | string;
}
