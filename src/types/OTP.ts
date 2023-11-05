import { UserInterface } from "./User";
import { ROLES } from "./common";

export type getOTPresponseType = {
  message: string;
  expiresIn: Date;
  phoneNumber: string;
};
export type checkOTP_responseType = {
  statusCode: number;
  data: {
    message: string;
    user: {
      otp: {
        code: number;
        expiresIn: Date;
      };
      _id: string;
      biography: string | null;
      likedProducts: Array<unknown>;
      phoneNumber: string;
      resetLink: string | null;
      isVerifiedPhoneNumber: boolean;
      isActive: boolean;
      Products: Array<unknown>;
      role: ROLES;
      createdAt: string;
      updatedAt: string;
      __v: number;
      avatarUrl: string | null;
    };
  };
};
export type completeProfileType = {
  name: string;
  email: string;
};
export type completeProfileResponse = {
  message: string;
  user: UserInterface;
};
