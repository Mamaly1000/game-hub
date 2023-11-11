"use client";
import React, { useState } from "react";
import Custom_Button from "../inputs/Custom_Button";
import { BiSolidLike } from "react-icons/bi";
import { productInterface } from "@/types/product";
import toast from "react-hot-toast";
import { likeProductService } from "@/services/productServices";
const LikeButton = ({
  classname,
  product,
}: {
  product: productInterface;
  classname: string;
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
    <Custom_Button
      btn_type="button"
      className={`${liked ? "bg-error" : "bg-primary-900"} ${classname} ${
        loading ? "animate-pulse" : "animate-none"
      }`}
      text=""
      type="primary"
      disable={loading}
      onclick={likeHandler}
    >
      <BiSolidLike />
    </Custom_Button>
  );
};

export default LikeButton;
