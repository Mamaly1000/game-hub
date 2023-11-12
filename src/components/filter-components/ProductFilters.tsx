import React, { Suspense, useState } from "react";
import Loader from "../loading/Loader";
import Custom_list from "../ui/Custom_list";
import { categoryInterface } from "@/types/category";
import Custom_list_item from "../ui/Custom_list_item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import vazirFont from "@/common/local-fonts/VazirFont";
import { QueryCreator } from "@/lib/QueryCreator";

const ProductFilters = ({ links }: { links: categoryInterface[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").flat() || []
  );
  return (
    <Suspense fallback={<Loader />}>
      <Custom_list
        bgcolor="inherit"
        classname=" relative z-0   font-vazir "
        title="فیلتر محصولات"
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
                  if (newArray.length === 0) {
                    router.push(pathname);
                  } else {
                    router.push(
                      pathname +
                        "?" +
                        QueryCreator("category", newArray, searchParams)
                    );
                  }
                } else {
                  setSelectedCategories([
                    ...selectedCategories,
                    link.englishTitle,
                  ]);
                  router.push(
                    pathname +
                      "?" +
                      QueryCreator(
                        "category",
                        [...selectedCategories, link.englishTitle],
                        searchParams
                      )
                  );
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
    </Suspense>
  );
};

export default ProductFilters;
