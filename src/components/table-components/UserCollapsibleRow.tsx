import { StyledTableCell, StyledTableRow } from "@/styles/table";
import { UserInterface } from "@/types/User";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Custom_link from "../inputs/Custom_link";
import vazirFont from "@/common/local-fonts/VazirFont";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import moment from "jalali-moment";
import AdminProductTableRow from "./AdminProductTableRow";
import TableSample from "./TableSample";
import { productInterface } from "@/types/product";

const UserCollapsibleRow = ({
  row,
  labels,
  i,
}: {
  i: number;
  labels: string[];
  row: UserInterface;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow key={row._id}>
        <StyledTableCell sx={{ maxWidth: "100px !important" }} align="center">
          {row.likedProducts && row.likedProducts.length > 0 && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <KeyboardArrowUp color="primary" />
              ) : (
                <KeyboardArrowDown color="primary" />
              )}
            </IconButton>
          )}
          {toPersianNumbers(i + 1)}
        </StyledTableCell>
        <StyledTableCell align="right" component="td" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell
          align="right"
          component="td"
          scope="row"
          className="line-clamp-2"
        >
          {row.email}
        </StyledTableCell>
        <StyledTableCell align="right" component="td" scope="row">
          {toPersianNumbers(row.phoneNumber)}
        </StyledTableCell>{" "}
        <StyledTableCell
          sx={{ minWidth: "150px" }}
          align="right"
          component="td"
          scope="row"
        >
          {row.isVerifiedPhoneNumber ? "فعال" : "غیرفعال"}
        </StyledTableCell>{" "}
        <StyledTableCell
          sx={{ minWidth: "200px" }}
          align="right"
          component="td"
          scope="row"
        >
          {toPersianNumbers(moment(row.createdAt).format("jYYYY/jMM/DD HH:MM"))}
        </StyledTableCell>{" "}
        <StyledTableCell
          sx={{ minWidth: "350px" }}
          align="right"
          component="td"
          scope="row"
        >
          {row.biography || "خالی"}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {row.isActive ? "فعال" : "غیر فعال"}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {row.role}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {row._id}
        </StyledTableCell>
      </StyledTableRow>
      <TableRow
        sx={{ minWidth: "100%", background: "rgb(var(--color-secondary-800))" }}
      >
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.likedProducts && row.likedProducts.length > 0 && (
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  dir="rtl"
                  align="right"
                  fontFamily={vazirFont.style.fontFamily}
                >
                  محصولات لایک شده
                </Typography>
                <TableSample
                  TableRowData={(row: productInterface, _i) => {
                    return <AdminProductTableRow key={row._id} product={row} />;
                  }}
                  labels={labels}
                  rows={row.likedProducts}
                  displayPagination={false}
                  sticky={false}
                />
              </Box>
            )}
            {row.cart && row.cart.products && row.cart.products.length > 0 && (
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  dir="rtl"
                  align="right"
                  fontFamily={vazirFont.style.fontFamily}
                >
                  محصولات سبد خرید
                </Typography>
                <TableSample
                  TableRowData={(
                    row: {
                      productId: productInterface;
                      quantity: number;
                      _id: string;
                    },
                    i
                  ) => {
                    return (
                      <AdminProductTableRow
                        key={row._id}
                        product={row.productId}
                      />
                    );
                  }}
                  labels={labels}
                  displayPagination={false}
                  sticky={false}
                  rows={row.cart.products}
                />
              </Box>
            )}
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default UserCollapsibleRow;
