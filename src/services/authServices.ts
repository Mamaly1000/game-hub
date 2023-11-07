import { completeProfileType } from "@/types/OTP";
import http from "./httpService";
import { UpdateUserInterface } from "@/types/User";

export const getOTP = (data: any) => {
  return http.post("/user/get-otp", data);
};
export const checkOTP = (data: any) => {
  return http.post("/user/check-otp", data);
};
export const completeProfile = (data: completeProfileType) => {
  return http.post("/user/complete-profile", data);
};
export const getUserProfile = () => {
  return http.get("/user/profile");
};
export const updateRefreshToken = () => {
  return http.get("");
};
export const updateUserProfile = (data: UpdateUserInterface) => {
  return http.patch("/user/update", data);
};
export const logoutUser = () => {
  return http.post("/user/logout");
};
