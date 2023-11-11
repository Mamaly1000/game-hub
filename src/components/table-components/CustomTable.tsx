"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { toPersianNumbers } from "@/utils/numConvertor";
import vazirFont from "@/common/local-fonts/VazirFont";
import { singleCartProductInterface } from "@/types/product";
import CustomTablePagination from "./TablePagination";
import Link from "next/link";
import AddToCart from "../cart-components/AddToCart";
import Custom_link from "../inputs/Custom_link";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(var(--color-primary-900))",
    ...vazirFont.style,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
    ...vazirFont.style,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(var(--color-secondary-800))",
    color: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgb(var(--color-primary-800))",
    color: "white",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  ".MuiTablePagination-displayedRows": {
    background: "red",
  },
  ...vazirFont.style,
  color: "white",
}));

export default function CustomizedTables({
  rows,
  labels,
}: {
  labels: string[];
  rows: singleCartProductInterface[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          sx={{ maxWidth: "100%", minWidth: "100%", overflow: "auto" }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              {labels.map((label) => (
                <StyledTableCell key={label} align="right">
                  {label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="right" component="td" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbers(row.quantity)}
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbers(row.price)}
                </StyledTableCell>{" "}
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbers(row.discount)}
                </StyledTableCell>{" "}
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbers(row.offPrice)}
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  <Custom_link
                    text={"مشاهده محصول"}
                    href={`/products/${row.slug}`}
                    classname="bg-warning px-3 py-2 rounded-lg text-center flex items-center justify-center drop-shadow-2xl"
                  />
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  <AddToCart redirect={false} product={row} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomTablePagination
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rows={rows}
              rowsPerPage={rowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
