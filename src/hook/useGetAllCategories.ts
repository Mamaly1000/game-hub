import {
  createCategoryService,
  getAllCategories,
  removeCategoryService,
  updateCategoryService,
  useGetSingleCategoryService,
} from "@/services/categoryServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
    onError: (err: any) => toast.error(err.response.data.message),
  });
};
export const useGetSingleCategory = (id: string | string[]) => {
  return useQuery({
    queryFn: () => useGetSingleCategoryService(id as string),
    queryKey: ["get-category", id],
  });
};
export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategoryService,
    mutationKey: ["create-category"],
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });
};
export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategoryService,
    mutationKey: ["update-category"],
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });
};
