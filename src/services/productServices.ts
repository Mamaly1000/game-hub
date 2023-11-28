import { ParsedUrlQuery } from "querystring";
import http from "./httpService";
import queryString from "query-string";
import { createProductInterface } from "@/types/product";
export const getAllProducts = (data: ParsedUrlQuery, cookies?: string) => {
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
export const getSingleProductById = (id: string) => {
  return http.get(`/product/${id}`);
};
export const likeProductService = (id: string) => {
  return http.post(`/product/like/${id}`);
};
export const createProductService = (data: createProductInterface) => {
  return http.post("/admin/product/add", data);
};
export const updateProduct = ({
  productId,
  data,
}: {
  productId: string;
  data: createProductInterface;
}) => {
  return http.patch(`/admin/product/update/${productId}`, data);
};
export function removeProduct(id: string) {
  return http.delete(`/admin/product/remove/${id}`);
}
