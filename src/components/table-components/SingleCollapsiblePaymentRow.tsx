import React from "react";

const SingleCollapsiblePaymentRow = () => {
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
        </StyledTableCell>
      </StyledTableRow>
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
                  {row.cart.productDetail.map((product) => (
                    <StyledTableRow key={product._id}>
                      <StyledTableCell align="right" component="th" scope="row">
                        {product.title}
                      </StyledTableCell>
                      <StyledTableCell>
                        {toPersianNumbersWithComma(product.price)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {toPersianNumbersWithComma(product.discount)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {toPersianNumbersWithComma(product.offPrice)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {toPersianNumbersWithComma(product.quantity)}
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
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default SingleCollapsiblePaymentRow;
