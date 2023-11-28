import { StyledTableCell, StyledTableRow } from "@/styles/table";
import { productInterface } from "@/types/product";
import { toPersianNumbersWithComma } from "@/utils/numConvertor";
import React from "react";
import Custom_link from "../inputs/Custom_link";

const AdminProductTableRow = ({ product }: { product: productInterface }) => {
  return (
    <StyledTableRow key={product._id}>
      <StyledTableCell align="right" component="th" scope="row">
        {product.title}
      </StyledTableCell>
      <StyledTableCell align="right">
        {toPersianNumbersWithComma(!!product.price ? product.price : 0)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {toPersianNumbersWithComma(!!product.discount ? product.discount : 0)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {toPersianNumbersWithComma(!!product.offPrice ? product.offPrice : 0)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {toPersianNumbersWithComma(
          !!product.countInStock
            ? product.countInStock
            : !!product.quantity
            ? product.quantity
            : 0
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Custom_link
          href={`/products/${product.slug}`}
          classname="bg-warning px-2 py-1 rounded-lg flex items-center justify-center"
          text="مشاهده محصول"
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AdminProductTableRow;
