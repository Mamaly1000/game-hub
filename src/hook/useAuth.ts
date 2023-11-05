import { getUserProfile } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () =>
  useQuery({
    queryFn: getUserProfile,
    queryKey: ["get-user-profile"],
    retry: false,
  });
