import React from "react";
import ReadOnlyDatePicker from "../ui/ReadOnlyDatePicker";
import { cartInterface } from "@/types/cart";
import PayDetail from "../cart-components/PayDetail";

const AdminDrawer = ({ cart = null }: { cart?: cartInterface | null }) => {
  return (
    <div className="min-w-full max-w-full overflow-x-hidden overflow-y-auto flex items-start justify-start gap-3 flex-col px-2 py-3">
      <ReadOnlyDatePicker />
      {cart && <PayDetail cart={cart} />}
    </div>
  );
};

export default AdminDrawer;
