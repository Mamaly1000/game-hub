"use client";
import { toPersianNumbers } from "@/utils/numConvertor";
import React from "react";
import vazirFont from "@/common/local-fonts/VazirFont";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { TablePagination } from "@mui/material";
import { StyledPaginationTableRow } from "@/styles/table";

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
    <StyledPaginationTableRow sx={{ minWidth: "500px" }}>
      <TablePagination
        sx={{
          ...vazirFont.style,
          display: "flex",
          justifyContent: "center",
          marginInline: "auto",
          minWidth: "100%",
          color: "#fff",
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
          label: "تعداد در هر صفحه",
          "aria-label": "تعداد در هر صفحه",
          style: { ...vazirFont.style },
          MenuProps: {
            sx: {
              ".MuiPaper-root": {
                backgroundColor: "rgb(var(--color-secondary-800))",
                ...vazirFont.style,
                color: "#fff",
              },
            },
          },
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
            toPersianNumbers(Math.ceil(pinfo.count / rowsPerPage - 1)) +
            " - " +
            toPersianNumbers(pinfo.from) +
            " تا " +
            toPersianNumbers(pinfo.to)
          );
        }}
      />
    </StyledPaginationTableRow>
  );
};

export default CustomTablePagination;
