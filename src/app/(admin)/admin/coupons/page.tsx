"use client";
import BottomAppBar from "@/components/admin-sidebar/BottomSideBar";
import CreateCouponForm from "@/components/forms/CreateCouponForm";
import EditCouponForm from "@/components/forms/EditCouponForm";
import PageHeader from "@/components/headers/PageHeader";
import Custom_Button from "@/components/inputs/Custom_Button";
import Loader from "@/components/loading/Loader";
import CouponTable from "@/components/table-components/CouponTable";
import {
  useCreateCoupon,
  useDeleteCoupon,
  useGetAllCoupons,
  useUpdateCoupon,
} from "@/hook/useCoupon";
import { couponInterface, createCouponInterface } from "@/types/coupon";
import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync: DeleteMutate } = useDeleteCoupon();
  const { isPending: createPending, mutateAsync: createMutate } =
    useCreateCoupon();
  const { isPending: updatePending, mutateAsync: updateMutate } =
    useUpdateCoupon();
  const { data, isLoading, error, refetch } = useGetAllCoupons();
  const [selectedCoupon, setSelectedCoupon] = useState<couponInterface | null>(
    null
  );
  const CreateCouponHandler = async (
    vals: createCouponInterface,
    setValue?: React.Dispatch<SetStateAction<boolean>>
  ) => {
    await createMutate({
      amount: vals.amount,
      code: vals.code,
      expireDate: new Date(vals.expireDate as Date).toISOString(),
      productIds: vals.productIds,
      type: vals.type,
      usageLimit: vals.usageLimit,
    }).then((res) => {
      toast.success(res.data.data.message);
      if (setValue) {
        setValue(false);
      }
    });
  };
  const updateCouponHandler = async (
    vals: createCouponInterface,
    setValue?: React.Dispatch<SetStateAction<boolean>>
  ) => {
    if (selectedCoupon) {
      await updateMutate({ id: selectedCoupon._id, vals }).then((res) => {
        toast.success(res.data.data.message);
        router.refresh();
        refetch();
        if (setValue) setValue(false);
      });
    }
  };
  const coupons: couponInterface[] | null = data?.data.data.coupons;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box>
        <h1>{error.message}</h1>
        <Custom_Button
          className="bg-primary-900"
          disable={isLoading}
          onclick={() => refetch()}
        >
          لطفا دوباره امتحان کنید
        </Custom_Button>
      </Box>
    );
  }
  if (!coupons) {
    return (
      <Box>
        <Custom_Button disable={isLoading} onclick={() => router.push("/auth")}>
          لطفا ابتدا لاگین کنید
        </Custom_Button>
      </Box>
    );
  }

  return (
    <BottomAppBar
      displayAddBtn
      tooltipTitle="ایجاد کد جدید"
      mainOnClick={() => setOpenModal(true)}
    >
      <PageHeader>لیست کدهای تخفیف</PageHeader>

      <EditCouponForm
        value={selectedCoupon}
        setValue={setSelectedCoupon}
        loading={updatePending}
        submitHandler={updateCouponHandler}
      />
      <CouponTable
        labels={[
          "کد تخفیف",
          "نوع",
          "مقدار تخفیف",
          "مقدار",
          "ظرفیت",
          "تاریخ انقضا",
          "فعال",
          "عملیات",
        ]}
        rows={coupons || []}
        actions={(data) => {
          return (
            <div className="min-w-fit flex gap-3 items-center justify-start">
              <Custom_Button
                className="w-[35px] h-[35px] rounded-lg bg-error text-white"
                onclick={async () =>
                  await DeleteMutate(data._id).then((res) => {
                    toast.success(res.data.data.message);
                    refetch();
                    router.refresh();
                  })
                }
              >
                <Delete />
              </Custom_Button>{" "}
              <Custom_Button
                className="w-[35px] h-[35px] rounded-lg bg-warning text-white"
                onclick={() => {
                  setSelectedCoupon(data);
                }}
              >
                <Edit />
              </Custom_Button>
            </div>
          );
        }}
      />
      <CreateCouponForm
        open={openModal}
        setOpen={setOpenModal}
        loading={createPending}
        submitHandler={CreateCouponHandler}
      />
    </BottomAppBar>
  );
};

export default page;
