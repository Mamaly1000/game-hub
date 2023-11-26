"use client";
import React, { useState } from "react";
import { productInterface } from "@/types/product";
import toast from "react-hot-toast";
import { likeProductService } from "@/services/productServices";
import Custom_Icon_Button from "../inputs/Custom_Icon_Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
const LikeButton = ({
  classname,
  product,
}: {
  product: productInterface;
  classname?: string;
}) => {
  const [liked, setLiked] = useState(product.isLiked);
  const [loading, setLoading] = useState(false);
  const likeHandler = async () => {
    try {
      setLoading(true);
      const { data } = await likeProductService(product._id);
      setLiked((prev) => !prev);
      toast.success(data.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Custom_Icon_Button
      className={`${classname} ${loading ? "animate-pulse" : "animate-none"}`}
      disable={loading}
      onClick={likeHandler}
      background={liked ? "rgb(var(--color-error))" : "auto"}
    >
      <FavoriteIcon />
    </Custom_Icon_Button>
  );
};

export default LikeButton;
