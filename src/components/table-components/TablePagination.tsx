"use client";
import { toPersianNumbers } from "@/utils/numConvertor";
import React from "react";
import vazirFont from "@/common/local-fonts/VazirFont";

import { styled } from "@mui/material/styles";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { TablePagination, TableRow } from "@mui/material";
const StyledPaginationTableRow = styled(TableRow)(({ theme }) => ({
  ".MuiTablePagination-displayedRows": {
    ...vazirFont.style,
  },
  " .MuiTableCell-root": {
    minWidth: "100% !important",
    overflow: "visible !important",
    paddingInline: "10px !important",
  },
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  overflow: "visible !important",
}));
const CustomTablePagination = ({
  rows,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: {
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rows: Array<any>;
  rowsPerPage: number;
  page: number;
}) => {
  return (
    <StyledPaginationTableRow>
      <TablePagination
        sx={{
          ...vazirFont.style,
          display: "flex",
          justifyContent: "center",
          marginInline: "auto",
          minWidth: "100%",
        }}
        colSpan={1}
        width={"100%"}
        rowsPerPageOptions={[
          { label: toPersianNumbers(5), value: 5 },
          { label: toPersianNumbers(10), value: 10 },
          { label: toPersianNumbers(25), value: 25 },
          { label: "همه", value: -1 },
        ]}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "تعداد در هر صفحه",
            "aria-labelledby": "تعداد در هر صفحه",
          },
          native: true,
          label: "تعداد در هر صفحه",
          "aria-label": "تعداد در هر صفحه",
          style: { ...vazirFont.style },
          color: "primary",
        }}
        align="center"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        labelRowsPerPage={
          <span style={vazirFont.style} className=" font-bold">
            تعداد در هر صفحه
          </span>
        }
        labelDisplayedRows={(pinfo) => {
          return (
            toPersianNumbers(pinfo.page) +
            " از " +
            toPersianNumbers(pinfo.count / rowsPerPage - 1) +
            " - " +
            toPersianNumbers(pinfo.from) +
            " تا " +
            toPersianNumbers(pinfo.to)
          );
        }}
        nextIconButtonProps={{
          style: {
            transform: "rotateZ(180deg)",
          },
        }}
        backIconButtonProps={{
          style: {
            transform: "rotateZ(180deg)",
          },
        }}
        style={vazirFont.style}
      />
    </StyledPaginationTableRow>
  );
};

export default CustomTablePagination;
