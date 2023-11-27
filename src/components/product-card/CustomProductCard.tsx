"use client";
import { Avatar, CardHeader, Divider } from "@mui/material";
import React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardContentList from "./CardContentList";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { productInterface } from "@/types/product";
import moment from "jalali-moment";
import { gradientGenerator } from "@/utils/gradientGenerator";
import RTL_Creator from "../ui/RTL_Creator";
import { StyledCard } from "@/styles/Card";
import Custom_link from "../inputs/Custom_link";
import Link from "next/link";
import { toPersianNumbers } from "@/utils/numConvertor";
import PriceDisplay from "./PriceDisplay";
const CustomProductCard = ({ product }: { product: productInterface }) => {
  return (
    <RTL_Creator>
      <StyledCard
        sx={{
          maxWidth: { xs: "100%", sm: 250, md: 345 },
          minWidth: { xs: "100%", sm: 250, md: 345 }, 
          minHeight: { xs: "fit-content", sm: 500, md: 460 },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: gradientGenerator() }} aria-label="recipe">
              {product.brand.slice(0, 1)}
            </Avatar>
          }
          action={
            <Custom_link
              href={`/products/${product.slug}`}
              classname="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary-900 drop-shadow-2xl"
            >
              <ReadMoreIcon />
            </Custom_link>
          }
          title={
            <Link href={`/products/${product.slug}`}>
              {product.title.slice(0, 20) + "..."}
            </Link>
          }
          subheader={
            <span>
              {toPersianNumbers(
                moment(product.createdAt).format("jYYYY/jMM/jDD")
              )}
            </span>
          }
        />
        <Link href={`/products/${product.slug}`}>
          <CardMedia
            component="img"
            height="194"
            sx={{ maxHeight: "194px", minHeight: "194px" }}
            image={product.imageLink}
            alt={product.title}
          />
        </Link>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            flexDirection: "column",
            gap: 2,
          }}
          component="div"
        >
          <Typography variant="body2">
            {product.description.slice(0, 50)}...
          </Typography>
          <Divider
            sx={{
              borderColor: "#ffffff",
              borderBottom: "2px solid #ffffff",
              minWidth: "100%",
            }}
          />
          <Typography variant="body2" component="div">
            <PriceDisplay
              price={{
                discount: product.discount,
                offPrice: product.offPrice,
                price: product.price,
              }}
            />
          </Typography>
        </CardContent>
        <CardContentList product={product} />
      </StyledCard>
    </RTL_Creator>
  );
};

export default CustomProductCard;
