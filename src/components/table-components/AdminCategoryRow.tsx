import { StyledTableCell, StyledTableRow } from "@/styles/table";
import { toPersianNumbers } from "@/utils/numConvertor";
import React from "react";
import CategoryTableAction from "../table-actions/CategoryTableAction";
import { categoryInterface } from "@/types/category";

const AdminCategoryRow = ({
  row,
  i,
}: {
  i: number;
  row: categoryInterface;
}) => {
  return (
    <StyledTableRow key={row._id}>
      <StyledTableCell
        sx={{ maxWidth: "50px" }}
        align="right"
        component="td"
        scope="row"
      >
        {toPersianNumbers(i + 1) + " "}-{" " + row.title}
      </StyledTableCell>
      <StyledTableCell align="right" component="td" scope="row">
        {row.description}
      </StyledTableCell>
      <StyledTableCell align="right" component="td" scope="row">
        {row.englishTitle}
      </StyledTableCell>{" "}
      <StyledTableCell align="right" component="td" scope="row">
        {row.type}
      </StyledTableCell>{" "}
      <StyledTableCell
        sx={{ minWidth: "180px" }}
        align="right"
        component="td"
        scope="row"
      >
        <div className="min-w-fit flex items-center justify-start gap-2">
          <CategoryTableAction category={row} />
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AdminCategoryRow;
