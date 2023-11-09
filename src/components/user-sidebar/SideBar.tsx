"use client";
import { categoryInterface } from "@/types/category";
import React, { useCallback, useState } from "react";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Custom_list from "../ui/Custom_list";
import Custom_list_item from "../ui/Custom_list_item";
import vazirFont from "@/common/local-fonts/VazirFont";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SideBar = ({ links }: { links: categoryInterface[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").flat() || []
  );

  return (
    <Custom_list
      classname="col-span-3 row-span-full relative z-0 text-primary-900 font-vazir"
      bgcolor="rgb(var(--color-primary-100))"
    >
      {links.map((link) => {
        return (
          <Custom_list_item
            key={link._id}
            checked={selectedCategories.includes(link.englishTitle)}
            labelId={link._id}
            onchange={(_e) => {
              if (selectedCategories.includes(link.englishTitle)) {
                const newArray = selectedCategories.filter(
                  (c) => c !== link.englishTitle
                );
                setSelectedCategories(newArray);
                const params = new URLSearchParams(searchParams);
                if (newArray.length === 0) {
                  router.push(pathname);
                } else {
                  params.set("category", newArray + "");
                  router.push(pathname + "?" + params.toString());
                }
              } else {
                setSelectedCategories([
                  ...selectedCategories,
                  link.englishTitle,
                ]);
                const params = new URLSearchParams(searchParams);
                params.set(
                  "category",
                  [...selectedCategories, link.englishTitle] + ""
                );
                router.push(pathname + "?" + params.toString());
              }
            }}
          >
            <ListItemButton style={{ direction: "rtl" }}>
              {link.icon.sm && (
                <ListItemAvatar>
                  <Avatar alt={link.description} src={link.icon.sm} />
                </ListItemAvatar>
              )}
              <ListItemText
                style={{
                  direction: "rtl",
                  textAlign: "start",
                }}
                lang="fa-IR"
                id={link._id}
                primary={link.title}
                primaryTypographyProps={{
                  fontFamily: vazirFont.style.fontFamily,
                  fontWeight: 400,
                }}
              />
            </ListItemButton>
          </Custom_list_item>
        );
      })}
    </Custom_list>
  );
};

export default SideBar;
