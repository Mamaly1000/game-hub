import { Menu, styled } from "@mui/material";
import vazirFont from "@/common/local-fonts/VazirFont";

export const StyledMenuComponent = styled(Menu)(({ theme }) => ({
  ...vazirFont.style,
  "& .MuiMenu-list": {
    color: theme.palette.common.white,
    background: "rgb(var(--color-secondary-800))",
  },
  marginBottom: "10px",
}));
