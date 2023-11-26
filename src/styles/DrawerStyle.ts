import { SwipeableDrawer, styled } from "@mui/material";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
export const StyledSweapDrawer = styled(SwipeableDrawer)(() => ({
  background: "rgba(0 0 0 /.4)",
  "& .MuiDrawer-paperAnchorBottom": {
    color: "#ffffff !important",
    background: "rgb(var(--color-secondary-800)) !important",
  },
}));
