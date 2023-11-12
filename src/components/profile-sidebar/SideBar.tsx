"use client";
import React, { Fragment, ReactNode } from "react";
import { TbUserStar } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi";
import Custom_link from "../inputs/Custom_link";
import { MdPayment } from "react-icons/md";
import { Divider } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import Custom_Button from "../inputs/Custom_Button";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useLogout } from "@/hook/useLogout";
const SideBar = () => {
  const items: {
    name: string;
    route: string;
    icon: ReactNode | string;
  }[] = [
    {
      name: "صفحه اصلی",
      route: "/",
      icon: <HiOutlineHome />,
    },
    {
      icon: <CgProfile />,
      name: "پروفایل",
      route: "/profile",
    },
    {
      name: "اطلاعات کاربری",
      route: "/profile/me",
      icon: <TbUserStar />,
    },
    {
      name: "اطلاعات پرداخت ها",
      route: "/profile/payments",
      icon: <MdPayment />,
    },
  ];
  const { mutate } = useLogout();
  return (
    <div className="col-span-3 p-5 flex flex-col items-start justify-start gap-2 text-white bg-secondary-800 min-h-screen max-h-screen overflow-y-auto">
      {items.map((i) => {
        return (
          <Fragment key={i.route}>
            <Custom_link
              classname="flex flex-row-reverse items-center justify-start gap-3 text-primary-900"
              href={i.route}
              text={i.name}
            >
              {typeof i.icon === "string" ? <img src={i.icon || ""} /> : i.icon}
            </Custom_link>
            <Divider className="bg-primary-900 border-primary-900 border-b-[1px] min-w-full" />
          </Fragment>
        );
      })}
      <Custom_Button
        btn_type="button"
        className="flex flex-row-reverse items-center justify-end gap-3 bg-error min-w-full rounded-lg px-3 py-2"
        text="خروج از حساب"
        type="error"
        onclick={() => {
          mutate();
        }}
      >
        <RiLogoutBoxLine />
      </Custom_Button>
    </div>
  );
};

export default SideBar;
