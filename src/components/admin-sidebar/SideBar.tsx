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
import { Box, ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Logout } from "@mui/icons-material";
import { useLogout } from "@/hook/useLogout";
export const adminLinks = [
  { name: "فروشگاه", route: "/", icon: <HiOutlineHome /> },
  { name: "داشبورد", route: "/admin", icon: <MdOutlineDashboard /> },
  {
    name: "مانیتورینگ",
    route: "/admin/monitoring",
    icon: <BarChartIcon sx={{ maxWidth: 18 }} />,
  },
  { name: "کاربران", route: "/admin/users", icon: <PiUsersFourDuotone /> },
  { name: "محصولات", route: "/admin/products", icon: <BsBoxes /> },
  { name: "دسته بندی", route: "/admin/categories", icon: <MdCategory /> },
  { name: "سفارشات", route: "/admin/payments", icon: <RiSecurePaymentLine /> },
  { name: "کد تخفیف", route: "/admin/coupons", icon: <RiCoupon3Fill /> },
];

const SideBar = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogout();
  const logoutHandler = async () => {
    await mutateAsync();
  };
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        fontSize: {
          md: ".9rem",
          lg: "1rem",
        },
        padding: {
          md: ".75rem",
          lg: "1.25rem",
        },
      }}
      className=" col-span-2 row-span-full  items-start justify-start gap-3 flex-col max-h-screen min-h-screen overflow-auto  text-white bg-secondary-800 md:p-3 md:text-[.8rem] lg:text-[1] lg:p-5"
    >
      <Custom_list classname="" title="داشبورد ادمین" bgcolor="inherit">
        {adminLinks.map((link) => {
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
        <Custom_list_item
          secondaryAction={
            <Logout
              sx={{
                stroke: "rgb(var(--color-error))",
                fill: "rgb(var(--color-error))",
              }}
            />
          }
          checked={false}
          onchange={logoutHandler}
        >
          <ListItemButton
            sx={{ color: "rgb(var(--color-error))" }}
            onClick={logoutHandler}
          >
            خروج از حساب{" "}
          </ListItemButton>
        </Custom_list_item>
      </Custom_list>
    </Box>
  );
};

export default SideBar;
