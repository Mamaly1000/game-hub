import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Custom_Divider } from "../cart-components/PayDetail";
import Custom_list from "../ui/Custom_list";

import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import RTL_Creator from "../ui/RTL_Creator";
import { BsEye } from "react-icons/bs";
import { adminPaymentInterface } from "@/types/payment";
import CustomizedAccordions from "./ProductAccordian";
import moment from "jalali-moment";
import { Box } from "@mui/material";
import { StylesTypo } from "@/styles/Typo";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  background: "rgb(var(--color-secondary-800))",
  minWidth: "100%",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function PaymentsAccordian({
  payments = [],
  title,
}: {
  title: string;
  payments: Array<adminPaymentInterface> | null | undefined;
}) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <RTL_Creator>
      <div className="min-w-full flex flex-col items-start justify-start gap-3">
        <h3>{title}</h3>
        <Custom_Divider classname="bg-primary-900 border-primary-900" />
        {payments?.map((p) => (
          <Accordion
            key={p._id}
            expanded={expanded === p._id}
            onChange={handleChange(p._id)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>
                شماره فاکتور {toPersianNumbers(p.invoiceNumber)}
              </Typography>
            </AccordionSummary>
            <Box
              sx={{
                minWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <StylesTypo>مبلغ</StylesTypo>
              <StylesTypo>{toPersianNumbersWithComma(p.amount)}</StylesTypo>
            </Box>
            <Custom_Divider />
            <Box
              sx={{
                minWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <StylesTypo>در تاریخ</StylesTypo>
              <StylesTypo>
                {toPersianNumbers(
                  moment(+p.paymentDate).format("jYYYY/jMM/jDD-HH:MM")
                )}
              </StylesTypo>
            </Box>
            <Custom_Divider />
            <Box
              sx={{
                minWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <StylesTypo>وضعیت</StylesTypo>
              <StylesTypo>{p.status}</StylesTypo>
            </Box>
            <Custom_Divider />
            <AccordionDetails>
              <Custom_list
                title="اطلاعات بیشتر"
                classname="min-w-full"
                bgcolor="inherit"
              >
                <CustomizedAccordions
                  products={p.cart.productDetail as any}
                  title="محصولات مربوط به سفارش"
                />
              </Custom_list>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </RTL_Creator>
  );
}
