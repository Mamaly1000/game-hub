import { getAllUsers } from "@/services/adminServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllUsers = () => {
  return useQuery({
    queryFn: getAllUsers,
    queryKey: ["fetch-all-users"],
  });
};
