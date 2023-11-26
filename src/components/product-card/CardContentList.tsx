"use client";
import {
  Box,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { productInterface } from "@/types/product";
import Custom_list from "../ui/Custom_list";
import Custom_list_item from "../ui/Custom_list_item";
import { toPersianNumbers } from "@/utils/numConvertor";
import Custom_Icon_Button from "../inputs/Custom_Icon_Button";
import AddToCart from "../cart-components/AddToCart";
import LikeButton from "./LikeButton";

const CardContentList = ({ product }: { product: productInterface }) => {
  const [expanded, setExpanded] = React.useState(false);
  const data = [
    {
      text: "دسته بندی",
      value: product.category.title,
    },
    {
      text: "تعداد موجود",
      value: toPersianNumbers(product.countInStock),
    },
    {
      text: "تعداد لایک ها",
      value: toPersianNumbers(product.likesCount),
    },
    {
      text: "بازدید",
      value: toPersianNumbers(product.numReviews),
    },
    {
      text: "تگ ها",
      value: (
        <div className="flex justify-end items-start gap-2 flex-wrap">
          {product.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-lg bg-primary-900 drop-shadow-2xl"
            >
              {t}
            </span>
          ))}
        </div>
      ),
    },
  ];
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Fragment>
      <CardActions disableSpacing>
        <LikeButton product={product} />
        <Custom_Icon_Button
          onClick={() =>
            navigator.share({
              url: `/products/${product.slug}`,
              text: product.description,
              title: product.title,
            })
          }
        >
          <ShareIcon />
        </Custom_Icon_Button>
        <Custom_Icon_Button onClick={handleExpandClick}>
          <ExpandMoreIcon
            sx={{ transform: expanded ? "rotateX(180deg)" : "rotateX(0deg)" }}
          />
        </Custom_Icon_Button>
        <AddToCart product={product} redirect={false} />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Custom_list classname="" title="اطلاعات بیشتر" bgcolor="inherit">
            {data.map((d) => (
              <Custom_list_item key={d.text}>
                <Box
                  sx={{
                    minWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="span"
                    className="whitespace-nowrap"
                  >
                    {d.text} :
                  </Typography>
                  <Typography variant="subtitle1" component="span">
                    {d.value}
                  </Typography>
                </Box>
              </Custom_list_item>
            ))}
          </Custom_list>
        </CardContent>
      </Collapse>
    </Fragment>
  );
};

export default CardContentList;
