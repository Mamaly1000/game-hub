import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import Custom_Button from "../inputs/Custom_Button";

const CouponTableActions = ({
  asyncFunc,
  func,
}: {
  asyncFunc: () => Promise<void>;
  func: () => void;
}) => {
  return (
    <div className="min-w-fit flex gap-3 items-center justify-start">
      <Custom_Button
        className="w-[35px] h-[35px] rounded-lg bg-error text-white"
        onclick={asyncFunc}
        background="rgb(var(--color-error))"
      >
        <Delete />
      </Custom_Button>{" "}
      <Custom_Button
        className="w-[35px] h-[35px] rounded-lg bg-warning text-white"
        onclick={func}
        background="rgb(var(--color-warning))"
      >
        <Edit />
      </Custom_Button>
    </div>
  );
};

export default CouponTableActions;
