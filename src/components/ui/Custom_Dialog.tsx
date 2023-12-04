"use client";
import { useTheme } from "@mui/material/styles";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { BootstrapDialog } from "@/styles/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { toPersianNumbers } from "@/utils/numConvertor";
const Custom_Dialog = ({
  btnElement,
  open,
  setOpen,
  Modal_title,
  contexts = [],
  children,
  modalActions,
}: {
  children?: ReactNode;
  contexts?: string[];
  Modal_title: string;
  btnElement?: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalActions?: ReactNode;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      {btnElement}
      <BootstrapDialog
        fullScreen={fullScreen}
        open={open}
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>{Modal_title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {contexts.map((text, i) => {
            return (
              <DialogContentText key={text + i} gutterBottom>
                {toPersianNumbers(i + 1) + " - " + text}
              </DialogContentText>
            );
          })}
          {children}
        </DialogContent>
        <DialogActions>{modalActions}</DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
};

export default Custom_Dialog;
