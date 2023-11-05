import { cartInterface } from "./cart";
import { ROLES } from "./common";

export interface UserInterface {
  name: string;
  avatar: string;
  biography: string | null;
  likedProducts: Array<unknown>;
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
  Products: Array<unknown>;
  role: ROLES;
  cart: cartInterface;
}
