import http from "./httpService";

export const getOTP = (data: any) => {
  return http.post("/user/get-otp", data);
};
export const checkOTP = (data: any) => {
  return http.post("/user/check-otp", data);
};
