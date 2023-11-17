import { getAllPayments, getSinglePayments } from "@/services/adminServices";
import { paymentService } from "@/services/cartServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePayment = () => {
  return useMutation({
    mutationFn: paymentService,
    mutationKey: ["payment-action"],
    onError: (err) => toast.error(err.message),
  });
};
export const useGetAllPayments = () => {
  return useQuery({
    queryFn: getAllPayments,
    queryKey: ["get-all-payments"],
  });
};
export const useGetSinglePayments = (id: string) => {
  return useQuery({
    queryFn: () => getSinglePayments(id),
    queryKey: ["get-payment", id],
  });
};
