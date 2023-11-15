import http from "./httpService";

export const getAllCategories = () => {
  return http.get("/category/list");
};
export const removeCategoryService = (id: string) => {
  return http.post(`/admin/category/remove/${id}`);
};
export const useGetSingleCategoryService = (id: string) => {
  return http.get(`/category/${id}`);
};
