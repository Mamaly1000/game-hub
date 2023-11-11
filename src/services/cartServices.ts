import http from "./httpService";

export const addToCartService = (productId: string) => {
  return http.post("/cart/add", { productId });
};
export const removeFromCart = (productId: string) => {
  return http.post("/cart/remove", { productId });
};
export const paymentService=()=>{
  return http.post("/payment/create")
}