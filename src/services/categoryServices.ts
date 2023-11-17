import { createCategoryInterface } from "@/types/category";
import http from "./httpService";

export const getAllCategories = () => {
  return http.get("/category/list");
};
export const removeCategoryService = (id: string) => {
  return http.delete(`/admin/category/remove/${id}`);
};
export const useGetSingleCategoryService = (id: string) => {
  return http.get(`/category/${id}`);
};
export const createCategoryService = (data: createCategoryInterface) => {
  return http.post("/admin/category/add", data);
};
export const updateCategoryService = ({
  data,
  id,
}: {
  data: createCategoryInterface;
  id: string;
}) => {
  return http.patch(`/admin/category/update/${id}`, data);
};
