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
        <StyledTableCell sx={{minWidth:"150px"}} align="right" component="td" scope="row">
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
                <Table
                  sx={{ minWidth: "100%" }}
                  size="small"
                  aria-label="purchases"
                >
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
                    {row.likedProducts.map((product) => (
                      <StyledTableRow key={product._id}>
                        <StyledTableCell
                          align="right"
                          component="th"
                          scope="row"
                        >
                          {product.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(product.price)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(product.discount)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(product.offPrice)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(product.countInStock)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Custom_link
                            href={`/products/{product.slug}`}
                            classname=""
                            text="مشاهده محصول"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
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
                <Table
                  sx={{ minWidth: "100%" }}
                  size="small"
                  aria-label="purchases"
                >
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
                    {row.cart.products.map((product) => (
                      <StyledTableRow key={product.productId._id}>
                        <StyledTableCell
                          align="right"
                          component="th"
                          scope="row"
                        >
                          {product.productId.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(product.productId.price)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(
                            product.productId.discount
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(
                            product.productId.offPrice
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {toPersianNumbersWithComma(
                            product.productId.countInStock
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Custom_link
                            href={`/products/${product.productId.slug}`}
                            classname=""
                            text="مشاهده محصول"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default UserCollapsibleRow;
