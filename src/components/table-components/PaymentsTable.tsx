import { paymentType } from "@/types/payment";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "@/styles/table";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import CustomTablePagination from "./TablePagination";
import moment from "jalali-moment";

const PaymentsTable = ({
  rows,
  labels,
}: {
  labels: string[];
  rows: paymentType[];
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
      <TableContainer sx={{ maxHeight: 440, direction: "rtl" }}>
        <Table
          stickyHeader
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            overflow: "auto",
            direction: "rtl",
          }}
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
            ).map((row, i) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbers(i + 1)}
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbers(row.invoiceNumber)}
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  {row.cart.productDetail.map((p) => (
                    <span key={p._id}>{p.title}/</span>
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbersWithComma(row.amount)}
                </StyledTableCell>{" "}
                <StyledTableCell align="right" component="td" scope="row">
                  {toPersianNumbers(
                    moment(row.createdAt).format("jYYYY/jMMM/DD HH:MM")
                  )}
                </StyledTableCell>{" "}
                <StyledTableCell align="right" component="td" scope="row">
                  {row.status === "COMPLETED" ? "موفق" : "ناموفق"}
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
};

export default PaymentsTable;
