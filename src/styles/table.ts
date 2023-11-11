import vazirFont from "@/common/local-fonts/VazirFont";
import {
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
export const StyledPaginationTableRow = styled(TableRow)(({ theme }) => ({
  ".MuiTablePagination-displayedRows": {
    ...vazirFont.style,
  },
  " .MuiTableCell-root": {
    minWidth: "100% !important",
    overflow: "visible !important",
    paddingInline: "10px !important",
  },
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  overflow: "visible !important",
}));
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(var(--color-primary-900))",
    ...vazirFont.style,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
    ...vazirFont.style,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(var(--color-secondary-800))",
    color: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgb(var(--color-primary-800))",
    color: "white",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  ".MuiTablePagination-displayedRows": {
    background: "red",
  },
  ...vazirFont.style,
  color: "white",
}));
export const StyledThead = styled(TableHead)(() => {
  return {
    ".MuiTableCell-root": {
      background: "rgb(var(--color-primary-900))",
      color: "#ffffff",
      ...vazirFont.style,
    },
  };
});
export const StyledTfooter = styled(TableFooter)(() => {
  return { 
    color: "#ffffff",
    ...vazirFont.style,
    ".MuiTableCell-root": {
      ...vazirFont.style,
    }, 
  };
});
