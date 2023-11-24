"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RTL_Creator from "./RTL_Creator";

export default function CustomAccordian({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <RTL_Creator>
      <Accordion
        sx={{ background: "rgb(var(--color-secondary-900))", color: "#ffffff" }}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ stroke: "#ffffff" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{description}</Typography>
        </AccordionDetails>
      </Accordion>
    </RTL_Creator>
  );
}
