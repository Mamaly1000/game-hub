import http from "./httpService";
import queryString from "query-string";
export const getAllProducts = (data: { category: string }) => {
  return http.get(`/product/list?${queryString.stringify(data)}`);
};
