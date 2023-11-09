"use client";
import Custom_link from "@/components/inputs/Custom_link";
import Badge from "@/components/ui/Badge";
import { useFetchUser } from "@/hook/useAuth";
import { UserInterface } from "@/types/User";
import React from "react";

const Header = () => {
  const { isLoading, data } = useFetchUser();
  const profile: UserInterface = data?.data.data;
  return (
    <header
      className={`z-[1000000000000] sticky top-0 min-w-full min-h-[50px] backdrop-blur-md  rounded-b-lg shadow-xl mb-2 flex items-center justify-center ${
        isLoading ? "animate-pulse blur-sm" : "animate-none blur-none"
      }`}
    >
      <nav className="min-w-full min-h-full">
        <ul className="min-w-full px-10 md:px-20 flex items-center justify-between gap-2   ">
          <li>
            <Custom_link classname="" href="/" text="خانه" />
          </li>
          <li>
            <Custom_link classname="" href="/products" text="محصولات" />
          </li>
          <li>
            <Custom_link classname="" href="/cart" text="سبد خرید">
              <Badge
                text={profile?.cart.payDetail.orderItems.length || 0}
                height={"25px"}
                width={"25px"}
                classname="bg-primary-900"
              />
            </Custom_link>
          </li>
          {profile ? (
            <li>
              <Custom_link
                classname=""
                href="/profile"
                text={profile.name || profile.email}
              >
                <img
                  className="max-w-[30px] max-h-[30px] rounded-full ring-1 ring-primary-900"
                  src={
                    profile.avatar ||
                    "https://avatars.githubusercontent.com/u/105161078?v=4"
                  }
                />
              </Custom_link>{" "}
            </li>
          ) : (
            <li>
              <Custom_link classname="" href="/auth" text="ورود" />
            </li>
          )}
          <li>
            <Custom_link classname="" href="/admin" text="ادمین" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
