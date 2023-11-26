import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgb(var(--color-secondary-800))",
  color: "#ffffff !important",
  "& *": {
    color: "#ffffff  ",
  },
  ".text-error": {
    color: "rgba(var(--color-error), var(--tw-text-opacity)) !important",
  },
}));
