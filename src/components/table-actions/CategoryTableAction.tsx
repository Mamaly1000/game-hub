import { categoryInterface } from "@/types/category";
import React from "react";
import Custom_Button from "../inputs/Custom_Button";
import { useRouter } from "next/navigation";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDeleteCategory } from "@/hook/useGetAllCategories";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Custom_link from "../inputs/Custom_link";
import { BsEye } from "react-icons/bs";
import Custom_Tooltip from "../ui/Custom_Tooltip";

const CategoryTableAction = ({ category }: { category: categoryInterface }) => {
  const client = useQueryClient();
  const router = useRouter();
  const { isPending, mutateAsync } = useDeleteCategory(category._id as string);
  return (
    <div className="min-w-fit flex items-center justify-start gap-2 ">
      <Custom_Button
        onclick={async () => {
          if (category._id) {
            await mutateAsync(category._id).then((res) => {
              toast.success(res.data.data.message);
              client.invalidateQueries({ queryKey: ["get-all-categories"] });
              router.refresh();
            });
          } else {
            toast.error("همچین دسته بندی ای وجود ندارد.");
          }
        }}
        disable={isPending}
        className="bg-error w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
        background="rgba(var(--color-error), var(--tw-bg-opacity))"
      >
        <FaRegTrashAlt />
      </Custom_Button>
      <Custom_Button
        onclick={() => router.push(`/admin/categories/edit/${category._id}`)}
        className="bg-warning w-[35px] h-[35px]  rounded-lg flex justify-center items-center text-white "
        background="rgba(var(--color-warning), var(--tw-bg-opacity))"
      >
        <FaEdit />
      </Custom_Button>
      <Custom_Tooltip title={`مشاهده ${category.title}`}>
        <Custom_link
          href={`/admin/categories/${category._id}`}
          classname="w-[45px] h-[45px] rounded-lg text-white drop-shadow-2xl flex items-center justify-center bg-secondary-900"
        >
          <BsEye />
        </Custom_link>
      </Custom_Tooltip>
    </div>
  );
};

export default CategoryTableAction;
