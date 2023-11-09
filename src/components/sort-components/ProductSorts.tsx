import React, { useState } from "react";
import Custom_list from "../ui/Custom_list";
import Custom_list_item from "../ui/Custom_list_item";
import { ListItemButton, ListItemText } from "@mui/material";
import vazirFont from "@/common/local-fonts/VazirFont";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { QueryCreator } from "@/lib/QueryCreator";

const sorts = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "oldest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

const ProductSorts = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchparams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(
    searchparams.get("sort") || ""
  );
  console.log(searchparams.get("sort"));

  return (
    <Custom_list
      bgcolor="inherit"
      classname="relative z-0 text-primary-900 font-vazir "
      title="مرتب سازی محصولات"
    >
      {sorts.map((sort) => {
        return (
          <Custom_list_item
            checked={selectedSort === sort.value}
            labelId={sort.id + ""}
            onchange={(e) => {
              if (sort.value === selectedSort) {
                setSelectedSort("");
                router.push(pathname);
              } else {
                setSelectedSort(sort.value);
                router.push(
                  pathname +
                    "?" +
                    QueryCreator("sort", sort.value, searchparams)
                );
              }
            }}
            key={sort.id}
          >
            <ListItemButton style={{ direction: "rtl" }}>
              <ListItemText
                style={{
                  direction: "rtl",
                  textAlign: "start",
                }}
                lang="fa-IR"
                id={sort.id + ""}
                primary={sort.label}
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

export default ProductSorts;
