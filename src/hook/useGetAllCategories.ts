import { getAllCategories } from "@/services/categoryServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryFn: getAllCategories,
    queryKey: ["get-all-categories"],
  });
};
