import { getAllRawProducts } from "@/services/productServices";
import { useQuery } from "@tanstack/react-query";

export const useAllProducts = () => {
  return useQuery({
    queryFn: getAllRawProducts,
    queryKey: ["get all users"],
  });
};
