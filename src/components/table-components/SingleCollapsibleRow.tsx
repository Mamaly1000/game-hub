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
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { adminPaymentInterface, paymentType } from "@/types/payment";
import Custom_link from "../inputs/Custom_link";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";

import moment from "jalali-moment";
import vazirFont from "@/common/local-fonts/VazirFont";
import { StyledTableCell, StyledTableRow } from "@/styles/table";
import { FaEye } from "react-icons/fa";
import TableSample from "./TableSample";
import { productInterface } from "@/types/product";
import AdminProductTableRow from "./AdminProductTableRow";
const SingleCollapsibleRow = ({
  row,
  labels,
  i,
}: {
  i: number;
  labels: string[];
  row: paymentType | adminPaymentInterface;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow key={row._id}>
        <StyledTableCell sx={{ maxWidth: "100px !important" }} align="center">
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
          {toPersianNumbers(i + 1)} {" - "}
          {toPersianNumbers(row.invoiceNumber)}
        </StyledTableCell>
        <StyledTableCell
          sx={{ minWidth: "350px" }}
          align="right"
          component="td"
          scope="row"
          className="line-clamp-2"
        >
          {row.description}
        </StyledTableCell>
        <StyledTableCell align="right" component="td" scope="row">
          {row.user.name}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {row.user.email}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {toPersianNumbers(row.user.phoneNumber)}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {toPersianNumbersWithComma(row.amount)}
        </StyledTableCell>{" "}
        <StyledTableCell
          sx={{ minWidth: "200px" }}
          align="right"
          component="td"
          scope="row"
        >
          {toPersianNumbers(
            moment(row.createdAt).format("jYYYY/jMMM/DD HH:MM")
          )}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {row.status === "COMPLETED" ? "موفق" : "ناموفق"}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          <Custom_link
            classname="w-[45px] h-[45px] rounded-full  drop-shadow-2xl bg-warning flex items-center justify-center"
            href={`/admin/payments/${row._id}`}
          >
            <FaEye />
          </Custom_link>
        </StyledTableCell>
      </StyledTableRow>
      {row.cart && row.cart.productDetail && (
        <TableRow sx={{ background: "rgb(var(--color-secondary-800))" }}>
          <StyledTableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  dir="rtl"
                  align="right"
                  fontFamily={vazirFont.style.fontFamily}
                >
                  محصولات خریداری شده
                </Typography>
                <TableSample
                  TableRowData={(row: productInterface, _i) => {
                    return <AdminProductTableRow product={row} />;
                  }}
                  labels={labels}
                  rows={row.cart.productDetail}
                  displayPagination={false}
                  sticky={false}
                />
              </Box>
            </Collapse>
          </StyledTableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default SingleCollapsibleRow;
