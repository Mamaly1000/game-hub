import { logoutUser } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
    mutationKey: ["logout-user"],
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
    onSuccess: () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("token");
      document.location.href = "/";
    },
  });
};
