import { ParsedUrlQuery } from "querystring";
import http from "./httpService";
import queryString from "query-string";
export const getAllProducts = (data: ParsedUrlQuery, cookies: string) => {
  return http.get(`/product/list?${queryString.stringify(data)}`, {
    headers: {
      Cookie: cookies,
    },
  });
};
export const getAllRawProducts = () => {
  return http.get(`/product/list`);
};
export const getSingleProduct = (slug: string) => {
  return http.get(`/product/slug/${slug}`);
};
export const likeProductService = (id: string) => {
  return http.post(`/product/like/${id}`);
};
