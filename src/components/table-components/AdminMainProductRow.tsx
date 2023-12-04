import { StyledTableCell, StyledTableRow } from "@/styles/table";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import React from "react";
import Custom_link from "../inputs/Custom_link";
import AddToCart from "../cart-components/AddToCart";
import { productInterface, singleCartProductInterface } from "@/types/product";
import TableActions from "../table-actions/TableActions";
import { ROLES } from "@/types/common";

const AdminMainProductRow = ({
  row,
  role = "ADMIN",
}: {
  row: singleCartProductInterface | productInterface;
  role?: ROLES;
}) => {
  return (
    <StyledTableRow key={row._id}>
      <StyledTableCell align="right" component="td" scope="row">
        {row.title}
      </StyledTableCell>
      <StyledTableCell align="right" component="td" scope="row">
        {toPersianNumbers(
          (row.quantity && toPersianNumbers(row.quantity)) ||
            (row.countInStock && toPersianNumbers(row?.countInStock))
        )}
      </StyledTableCell>
      <StyledTableCell align="right" component="td" scope="row">
        {toPersianNumbersWithComma(row.price)}
      </StyledTableCell>{" "}
      <StyledTableCell align="right" component="td" scope="row">
        {toPersianNumbersWithComma(row.discount)}
      </StyledTableCell>{" "}
      <StyledTableCell align="right" component="td" scope="row">
        {toPersianNumbersWithComma(row.offPrice)}
      </StyledTableCell>
      <StyledTableCell align="right" component="td" scope="row">
        <Custom_link
          text={"مشاهده محصول"}
          href={`/products/${row.slug}`}
          classname="bg-warning px-3 py-2 rounded-lg text-center flex items-center justify-center drop-shadow-2xl"
        />
      </StyledTableCell>
      <StyledTableCell
        sx={{ minWidth: "180px" }}
        align="right"
        component="td"
        scope="row"
      >
        <div className="min-w-fit flex items-center justify-start gap-2">
          <AddToCart redirect={false} product={row} />
          {role === "ADMIN" && <TableActions data={row} />}
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AdminMainProductRow;
