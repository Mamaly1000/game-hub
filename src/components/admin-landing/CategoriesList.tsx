import React from "react";
import Custom_list from "../ui/Custom_list";
import { categoryInterface } from "@/types/category";
import { ListItem } from "@mui/material";
import { StylesTypo } from "@/styles/Typo";
import { toPersianNumbers } from "@/utils/numConvertor";
import moment from "jalali-moment";

const CategoriesList = ({
  categories,
}: {
  categories: categoryInterface[] | null;
}) => {
  return (
    <div className="min-w-full max-w-full bg-secondary-800 rounded-[5px] drop-shadow-2xl min-h-full">
      <Custom_list
        classname="min-w-full"
        title="لیست دسته بندی ها"
        bgcolor="inherit"
        callToAction={{
          link: "/admin/categories",
          text: "مشاهده همه",
        }}
      >
        {categories?.map((c) => (
          <CategoryListItem category={c} key={c._id} />
        ))}
      </Custom_list>
    </div>
  );
};

export default CategoriesList;

export const CategoryListItem = ({
  category,
}: {
  category: categoryInterface;
}) => {
  return (
    <ListItem
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        fontSize: ".8rem",
        textAlign: "start",
      }}
    >
      <StylesTypo sx={{ minWidth: "120px" }}>{category.title}</StylesTypo>
      <StylesTypo
        sx={{ minWidth: "120px", display: { xs: "none", sm: "block" } }}
      >
        {category.englishTitle}
      </StylesTypo>
      <StylesTypo
        sx={{ minWidth: "120px", display: { xs: "none", md: "block" } }}
      >
        {category.description}
      </StylesTypo> 
      <StylesTypo>
        {toPersianNumbers(
          moment(category.createdAt).format("jYYYY/jMM/jDD-HH:MM")
        )}
      </StylesTypo>
    </ListItem>
  );
};
