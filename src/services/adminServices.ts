import http from "./httpService";

export const getAllUsers = () => {
  return http.get("/admin/user/list");
};
export const getAllPayments = () => {
  return http.get("/admin/payment/list");
};
export const getSinglePayments = (id: string) => {
  return http.get(`/admin/payment/${id}`);
};
