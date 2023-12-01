import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { productInterface, singleProductInterface } from "@/types/product";
import { Custom_Divider } from "../cart-components/PayDetail";
import Custom_list from "../ui/Custom_list";
import { ListItem } from "@mui/material";
import { StylesTypo } from "@/styles/Typo";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import Custom_link from "../inputs/Custom_link";
import RTL_Creator from "../ui/RTL_Creator";
import { ViewAgenda } from "@mui/icons-material";
import { BsEye } from "react-icons/bs";

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

export default function CustomizedAccordions({
  products = [],
  title,
}: {
  title: string;
  products: Array<productInterface | singleProductInterface> | null | undefined;
}) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <RTL_Creator>
      <div className="min-w-full flex flex-col items-start justify-start gap-3">
        <h3 className="text-white">{title}</h3>
        <Custom_Divider classname="bg-primary-900 border-primary-900" />
        {products?.map((p) => (
          <Accordion
            key={p._id}
            expanded={expanded === p.title}
            onChange={handleChange(p.title)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              color="inherit"
            >
              <StylesTypo sx={{ color: "#fff" }}>
                {p.title.slice(0, 25)}
              </StylesTypo>
            </AccordionSummary>
            <AccordionDetails>
              <Custom_list
                title="اطلاعات بیشتر"
                classname="min-w-full"
                bgcolor="inherit"
              >
                {[
                  {
                    name: "قیمت",
                    value: toPersianNumbersWithComma(p.price),
                  },
                  {
                    name: "دسته بندی",
                    value: p.category?.title,
                  },
                  {
                    name: "تعداد",
                    value: toPersianNumbers(p.quantity || p.countInStock),
                  },
                  {
                    name: "برند",
                    value: p.brand,
                  },
                  {
                    name: "مشاهده محصول",
                    value: p.slug,
                    link: true,
                  },
                ].map(
                  (sp, i) =>
                    !!sp.value && (
                      <ListItem
                        sx={{
                          minWidth: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                        key={i + sp.name}
                      >
                        <StylesTypo>{sp.name}</StylesTypo>
                        {!!sp.value &&
                          (!!sp.link ? (
                            <Custom_link
                              classname="w-[30px] h-[30px] flex items-center justify-center rounded-lg text-white bg-warning drop-shadow-2xl"
                              href={`/products/${sp.value}`}
                            >
                              <BsEye />
                            </Custom_link>
                          ) : (
                            <StylesTypo>{sp.value}</StylesTypo>
                          ))}
                      </ListItem>
                    )
                )}
              </Custom_list>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </RTL_Creator>
  );
}
