import { createProductService } from "@/services/productServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProductService,
    mutationKey: ["create-product"],
    onError: (err) => toast.error(err.message),
  });
};
