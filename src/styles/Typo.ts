import { Typography, styled } from "@mui/material";
import vazirFont from "@/common/local-fonts/VazirFont";

export const StylesTypo = styled(Typography)(() => {
  return {
    color: "#ffffff !important",
    fontFamily: vazirFont.style.fontFamily,
    fontSize: "inherit !important",
    textAlign: "inherit",
  };
});
