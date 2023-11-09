import { ParsedUrlQuery } from "querystring";
import http from "./httpService";
import queryString from "query-string";
export const getAllProducts = (data: ParsedUrlQuery) => {
  return http.get(`/product/list?${queryString.stringify(data)}`);
};
export const getSingleProduct = (slug: string) => {
  return http.get(`/product/slug/${slug}`);
};
