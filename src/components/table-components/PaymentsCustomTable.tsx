import {
  StyledTableCell,
  StyledTableRow,
  StyledTfooter,
  StyledThead,
} from "@/styles/table";
import { adminPaymentInterface } from "@/types/payment";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
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
import moment from "jalali-moment";
import React from "react";
import CustomTablePagination from "./TablePagination";
import SingleCollapsibleRow from "./SingleCollapsibleRow";

const PaymentsCustomTable = ({
  rows,
  labels,
}: {
  rows: adminPaymentInterface[];
  labels: string[];
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
      <TableContainer sx={{ maxHeight: 600, direction: "rtl" }}>
        <Table
          stickyHeader
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            overflow: "auto",
            direction: "rtl",
            background: "rgb(var(--color-primary-900))",
          }}
          aria-label="collapsible table"
        >
          <StyledThead>
            <TableRow>
              {labels.map((l) => {
                return (
                  <TableCell align="right" key={l}>
                    {l}
                  </TableCell>
                );
              })}
            </TableRow>
          </StyledThead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <SingleCollapsibleRow
                key={row._id}
                i={i}
                labels={[
                  "نام محصول",
                  "قیمت",
                  "تخفیف",
                  "قیمت نهایی",
                  "تعداد",
                  "لینک محصول",
                ]}
                row={row}
              />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <StyledTfooter
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
          </StyledTfooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PaymentsCustomTable;
