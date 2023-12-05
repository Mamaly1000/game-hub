"use client";
import React, { Fragment, ReactNode } from "react";
import { TbUserStar } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi";
import Custom_link from "../inputs/Custom_link";
import { MdPayment } from "react-icons/md";
import { Box, Divider, ListItemButton } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import Custom_Button from "../inputs/Custom_Button";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useLogout } from "@/hook/useLogout";
import Custom_list from "../ui/Custom_list";
import Custom_list_item from "../ui/Custom_list_item";
import { useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";
export const ProfileLinks: {
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
const SideBar = () => {
  const { mutateAsync, isPending } = useLogout();
  const logoutHandler = async () => {
    await mutateAsync();
  };
  const router = useRouter();
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
      <Custom_list classname="" title="داشبورد کاربری" bgcolor="inherit">
        {ProfileLinks.map((link) => {
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
