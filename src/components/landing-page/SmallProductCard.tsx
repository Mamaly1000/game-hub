import { productInterface } from "@/types/product";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const SmallProductCard = ({ product }: { product: productInterface }) => {
  return (
    <Card
      className="min-w-[150px] min-h-[150px] relative flex items-center justify-center"
      sx={{ maxWidth: 345 }}
    >
      <CardActionArea className="min-w-[150px] min-h-[150px] relative flex items-center justify-center">
        <CardMedia
          component="img"
          image={product.imageLink}
          alt={product.title}
          className="absolute z-0 object-cover"
        />
        {/* <CardContent className="relative z-10 font-vazir min-w-full ">
          <Typography gutterBottom variant="h5" component="div">
            {product.category.title}
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
};

export default SmallProductCard;
