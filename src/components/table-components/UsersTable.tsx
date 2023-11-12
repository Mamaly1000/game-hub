import { StyledTfooter, StyledThead } from "@/styles/table";
import { UserInterface } from "@/types/User";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import CustomTablePagination from "./TablePagination";
import UserCollapsibleRow from "./UserCollapsibleRow";

const UsersTable = ({
  users,
  labels,
}: {
  labels: string[];
  users: UserInterface[];
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

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
            background: "rgb(var(--color-secondary-800))",
            color: "#ffffff",
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
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((user, i) => (
              <UserCollapsibleRow
                key={user._id}
                i={i}
                labels={[
                  "نام محصول",
                  "قیمت",
                  "تخفیف",
                  "قیمت نهایی",
                  "تعداد",
                  "لینک محصول",
                ]}
                row={user}
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
              rows={users}
              rowsPerPage={rowsPerPage}
            />
          </StyledTfooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsersTable;
