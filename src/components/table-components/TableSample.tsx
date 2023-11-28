import { StyledTfooter, StyledThead } from "@/styles/table";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import CustomTablePagination from "./TablePagination";

const TableSample = ({
  rows,
  labels,
  TableRowData,
  displayPagination = true,
  sticky = true,
}: {
  sticky?: boolean;
  displayPagination?: boolean;
  TableRowData: (row: any, i: number) => ReactNode;
  labels: string[];
  rows: Array<any>;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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
      <TableContainer
        sx={{
          maxHeight: 600,
          direction: "rtl",
          background: "rgb(var(--color-secondary-800))",
        }}
      >
        <Table
          stickyHeader={sticky}
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            overflow: "auto",
            direction: "rtl",
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
            {(rowsPerPage > 0 && displayPagination
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => TableRowData(row, i))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {displayPagination && (
            <StyledTfooter
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgb(var(--color-secondary-800))",
                color: "#ffffff",
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
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableSample;
