import { Dialog, styled } from "@mui/material";
import vazirFont from "@/common/local-fonts/VazirFont";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    "& *": {
      color: theme.palette.common.white,
    },
  },
  "& .MuiDialogContent-dividers": {
    borderColor: theme.palette.common.white,
  },
  "& .MuiDialogActions-root": {
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    background: "rgb(var(--color-secondary-900))",
    color: theme.palette.common.white,
    minWidth: "300px",
  },
}));
