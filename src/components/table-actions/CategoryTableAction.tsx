import { categoryInterface } from "@/types/category";
import React from "react";
import Custom_Button from "../inputs/Custom_Button";
import { useRouter } from "next/navigation";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDeleteCategory } from "@/hook/useGetAllCategories";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const CategoryTableAction = ({ category }: { category: categoryInterface }) => {
  const client = useQueryClient();
  const router = useRouter();
  const { isPending, mutateAsync } = useDeleteCategory(category._id);
  return (
    <div className="min-w-fit flex items-center justify-start gap-2 ">
      <Custom_Button
        onclick={async () => {
          await mutateAsync(category._id).then((res) => {
            toast.success(res.data.data.message);
            client.invalidateQueries({ queryKey: ["get-all-categories"] });
            router.refresh();
          });
        }}
        disable={isPending}
        className="bg-error w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
      >
        <FaRegTrashAlt />
      </Custom_Button>
      <Custom_Button
        onclick={() => router.push(`/admin/categories/edit/${category._id}`)}
        className="bg-warning w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
      >
        <FaEdit />
      </Custom_Button>
    </div>
  );
};

export default CategoryTableAction;
