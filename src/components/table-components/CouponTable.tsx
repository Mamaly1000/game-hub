import { StyledTfooter, StyledThead } from "@/styles/table";
import { couponInterface } from "@/types/coupon";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { ReactNode } from "react";
import CustomTablePagination from "./TablePagination";
import SingleCouponRow from "./SingleCouponRow";

const CouponTable = ({
  rows,
  labels,
  additionalActions,
  actions,
}: {
  labels: string[];
  additionalActions?: (data: couponInterface) => ReactNode | null;
  rows: couponInterface[];
  actions: (data: couponInterface) => ReactNode;
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
              <SingleCouponRow
                key={row._id}
                i={i}
                labels={["نام محصول", "قیمت", "تخفیف", "قیمت نهایی", "عملیات"]}
                row={row}
                actions={actions}
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

export default CouponTable;
