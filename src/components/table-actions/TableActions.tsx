import { productInterface, singleCartProductInterface } from "@/types/product";
import React from "react";
import Custom_Button from "../inputs/Custom_Button";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveProduct } from "@/hook/useGetSingleProduct";

const TableActions = ({
  data,
}: {
  data: singleCartProductInterface | productInterface;
}) => {
  const { isPending, mutateAsync } = useRemoveProduct();
  const client = useQueryClient();
  const router = useRouter();
  return (
    <div className="min-w-fit flex items-center justify-between gap-2">
      <Custom_Button
        onclick={async () => {
          await mutateAsync(data._id)
            .then((res) => {
              toast.success(res.data.data.message);
              client.invalidateQueries({ queryKey: ["get-all-users"] });
              router.refresh();
            })
            .catch((err) => toast.error(err.response.data.message));
        }}
        disable={isPending}
        className="bg-error w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
        background="rgba(var(--color-error), var(--tw-bg-opacity))"
      >
        <FaRegTrashAlt />
      </Custom_Button>
      <Custom_Button
        onclick={() => router.push(`/admin/products/edit/${data._id}`)}
        className="bg-warning w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
        background="rgba(var(--color-warning), var(--tw-bg-opacity))"
      >
        <FaEdit />
      </Custom_Button>
    </div>
  );
};

export default TableActions;
