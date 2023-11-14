import { productInterface, singleCartProductInterface } from "@/types/product";
import React from "react";
import Custom_Button from "../inputs/Custom_Button";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const TableActions = ({
  data,
  fn,
  refetch,
}: {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  fn: (id: string) => Promise<AxiosResponse>;
  data: singleCartProductInterface | productInterface;
}) => {
  const router = useRouter();
  return (
    <div className="min-w-fit flex items-center justify-between gap-2">
      <Custom_Button
        onclick={() => {
          fn(data._id)
            .then((res) => {
              toast.success(res.data.data.message);
              refetch();
              router.refresh();
            })
            .catch((err) => toast.error(err.response.data.message));
        }}
        className="bg-error w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
      >
        <FaRegTrashAlt />
      </Custom_Button>
      <Custom_Button
        onclick={() => router.push(`/admin/products/edit/${data._id}`)}
        className="bg-warning w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
      >
        <FaEdit />
      </Custom_Button>
    </div>
  );
};

export default TableActions;
