import { StyledTableCell, StyledTableRow } from "@/styles/table";
import { couponInterface } from "@/types/coupon";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
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
import moment from "jalali-moment";
import React, { ReactNode } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Custom_link from "../inputs/Custom_link";
import vazirFont from "@/common/local-fonts/VazirFont";
const SingleCouponRow = ({
  row,
  labels,
  i,
  actions,
}: {
  actions: (data: couponInterface) => ReactNode;
  i: number;
  labels: string[];
  row: couponInterface;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow key={row._id}>
        <StyledTableCell sx={{ maxWidth: "100px !important" }} align="right">
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
          {row.code}
        </StyledTableCell>
        <StyledTableCell align="right" component="td">
          {row.type}
        </StyledTableCell>
        <StyledTableCell align="right" component="td" scope="row">
          {toPersianNumbersWithComma(row.amount)}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {toPersianNumbers(row.usageCount)}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {toPersianNumbers(row.usageLimit)}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {toPersianNumbers(
            moment(row.expireDate).locale("fa").format("dddd-YYYY/MMM/DD-HH:MM")
          )}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {row.isActive ? (
            <DoneIcon
              sx={{
                background: "rgb(var(--color-success))",
                width: 45,
                height: 45,
                padding: 1,
                borderRadius: "50%",
                color: "#fff",
              }}
            />
          ) : (
            <CloseIcon
              sx={{
                background: "rgb(var(--color-error))",
                width: 45,
                height: 45,
                padding: 1,
                borderRadius: "50%",
                color: "#fff",
              }}
            />
          )}
        </StyledTableCell>{" "}
        <StyledTableCell align="right" component="td" scope="row">
          {actions(row)}
        </StyledTableCell>{" "}
      </StyledTableRow>
      <TableRow sx={{ background: "rgb(var(--color-secondary-800))" }}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          align="right"
        >
          {row.productIds && row.productIds.length > 0 && (
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
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <StyledTableRow>
                      {labels.map((l) => {
                        return (
                          <StyledTableCell key={l} align="right">
                            {l}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {row.productIds &&
                      row.productIds.map((product) => (
                        <StyledTableRow key={product._id}>
                          <StyledTableCell
                            sx={{ minWidth: "200px" }}
                            align="right"
                            component="th"
                            scope="row"
                          >
                            {product.title}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {toPersianNumbersWithComma(product.price || 0)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {toPersianNumbersWithComma(product.discount || 0)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {toPersianNumbersWithComma(product.offPrice || 0)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Custom_link
                              href={`/products/${product.slug}`}
                              classname="px-3 py-2 rounded-lg bg-warning text-center flex items-center justify-center"
                              text="مشاهده محصول"
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          )}
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default SingleCouponRow;
