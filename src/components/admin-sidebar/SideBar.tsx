"use client";
import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import { PiUsersFourDuotone } from "react-icons/pi";
import { MdCategory, MdOutlineDashboard } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { RiCoupon3Fill, RiSecurePaymentLine } from "react-icons/ri";
import Custom_list from "../ui/Custom_list";
import Custom_list_item from "../ui/Custom_list_item";
import Custom_link from "../inputs/Custom_link";
import { ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
const SideBar = () => {
  const router = useRouter();
  const links = [
    { name: "صفحه اصلی", route: "/", icon: <HiOutlineHome /> },
    { name: "داشبورد", route: "/admin", icon: <MdOutlineDashboard /> },
    { name: "کاربران", route: "/admin/users", icon: <PiUsersFourDuotone /> },
    { name: "محصولات", route: "/admin/products", icon: <BsBoxes /> },
    { name: "دسته بندی", route: "/admin/categories", icon: <MdCategory /> },
    { name: "سفارشات", route: "/admin/payments", icon: <RiSecurePaymentLine /> },
    { name: "کد تخفیف", route: "/admin/coupons", icon: <RiCoupon3Fill /> },
  ];
  return (
    <div className="col-span-2 row-span-full  flex items-start justify-start gap-3 flex-col max-h-screen min-h-screen overflow-auto  text-white bg-secondary-800 p-5">
      <Custom_list classname="" title="داشبورد ادمین" bgcolor="inherit">
        {links.map((link) => {
          return (
            <Custom_list_item
              secondaryAction={
                typeof link.icon === "string" ? (
                  <img src={link.icon} />
                ) : (
                  link.icon
                )
              }
              checked={false}
              labelId={link.name}
              onchange={() => {}}
              key={link.name}
            >
              <ListItemButton onClick={() => router.push(link.route)}>
                <Custom_link
                  href={link.route}
                  classname=" text-primary-900"
                  text={link.name}
                />
              </ListItemButton>
            </Custom_list_item>
          );
        })}
      </Custom_list>
    </div>
  );
};

export default SideBar;
