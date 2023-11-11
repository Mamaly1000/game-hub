import { paymentService } from "@/services/cartServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePayment = () => {
  return useMutation({
    mutationFn: paymentService,
    mutationKey: ["payment-action"],
    onError: (err) => toast.error(err.message),
  });
};
