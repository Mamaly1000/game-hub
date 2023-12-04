"use client";
import React, { Fragment } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Sort } from "@mui/icons-material";
import vazirFont from "@/common/local-fonts/VazirFont"; 
import ProductFilters from "../filter-components/ProductFilters";
import ProductSorts from "../sort-components/ProductSorts";
import { categoryInterface } from "@/types/category";
import Custom_Drawer from "../ui/Custom_Drawer";
import Custom_Icon_Button from "../inputs/Custom_Icon_Button";

const MobileSidebar = ({ categories }: { categories: categoryInterface[] }) => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          padding: "1.25rem",
          ...vazirFont.style,
          justifyContent: "space-between",
          gap: 5,
          flexDirection: { xs: "wrap" },
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          محصولات
        </Typography>
        <Custom_Icon_Button
          onClick={handleDrawerOpen}
          background="rgb(var(--color-primary-900))"
        >
          <Sort sx={{ color: "#ffffff" }} />
        </Custom_Icon_Button>
      </Box>
      <Custom_Drawer
        open={open}
        setOpen={setOpen}
        header="فیلتر و دسته بندی محصولات"
      >
        <Divider />
        <ProductFilters links={categories} />
        <Divider />
        <ProductSorts />
      </Custom_Drawer>
    </Fragment>
  );
};

export default MobileSidebar;
