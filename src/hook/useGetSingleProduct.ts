import {
  getSingleProductById,
  removeProduct,
  updateProduct,
} from "@/services/productServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetSingleProduct = (id: string) => {
  return useQuery({
    queryFn: () => getSingleProductById(id),
    queryKey: [`fetch-product`, id],
  });
};
export const useUpdateProduct = (id: string) => {
  return useMutation({
    mutationFn: updateProduct,
    mutationKey: ["update-product", id],
    onError: (err: any) => toast.error(err.response.data.message),
  });
};
export const useRemoveProduct = () => {
  return useMutation({ mutationFn: removeProduct });
};
