import {
  getAllCategories,
  removeCategoryService,
  useGetSingleCategoryService,
} from "@/services/categoryServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryFn: getAllCategories,
    queryKey: ["get-all-categories"],
  });
};
export const useDeleteCategory = (id: string) => {
  return useMutation({
    mutationFn: removeCategoryService,
    mutationKey: ["delete-category", id],
  });
};
export const useGetSingleCategory = (id: string | string[]) => {
  return useQuery({
    queryFn: () => useGetSingleCategoryService(id as string),
    queryKey: ["get-category", id],
  });
};
