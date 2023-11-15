import { StyledTableCell, StyledTableRow } from "@/styles/table";
import { categoryInterface } from "@/types/category";
import { toPersianNumbers } from "@/utils/numConvertor";
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
import React, { ReactNode } from "react";
import Custom_link from "../inputs/Custom_link";
import CustomTablePagination from "./TablePagination";
import CategoryTableAction from "../table-actions/CategoryTableAction";

const CategoriesTable = ({
  rows,
  labels,
  additionalActions,
}: {
  labels: string[];
  rows: categoryInterface[];
  additionalActions?: (data: categoryInterface) => ReactNode | null;
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            overflow: "auto",
            background: "rgb(var(--color-primary-900))",
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
                <StyledTableCell
                  sx={{ maxWidth: "50px" }}
                  align="right"
                  component="td"
                  scope="row"
                >
                  {toPersianNumbers(i + 1)}
                </StyledTableCell>{" "}
                <StyledTableCell align="right" component="td" scope="row">
                  {row.title}
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
                    {additionalActions && additionalActions(row)}
                  </div>
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

export default CategoriesTable;
