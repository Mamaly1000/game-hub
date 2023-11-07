import { getUserProfile } from "@/services/authServices";
import { UserInterface } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
  return useQuery({
    queryFn: getUserProfile,
    queryKey: ["get-user-profile"],
    retry: false,
  });
};
