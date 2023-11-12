import http from "./httpService";

export const getAllUsers = () => {
  return http.get("/admin/user/list");
};
