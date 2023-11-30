import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { useFetchUser } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { Home } from "@mui/icons-material";
import Custom_Tooltip from "../ui/Custom_Tooltip";
import Custom_Menu from "../ui/Custom_Menu";
import { adminLinks } from "./SideBar";
import { ROLES } from "@/types/common";
import { ProfileLinks } from "../profile-sidebar/SideBar";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  transition: "all .13s linear",
  "&:hover": {
    background: "inherit",
    scale: "1.1",
  },
});

export default function BottomAppBar({
  children,
  displayAddBtn = false,
  customIcon,
  tooltipTitle,
  mainOnClick,
}: {
  tooltipTitle?: string;
  displayAddBtn?: boolean;
  children?: React.ReactNode;
  customIcon?: {
    fn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: React.ReactNode;
    background: string;
  };
  mainOnClick?: () => void;
}) {
  const router = useRouter();
  const { isLoading, data } = useFetchUser();
  const role: ROLES | null = data?.data.data.user.role;

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        sx={{
          pb: "50px",
          background: "inherit",
          color: "inherit",
          position: "relative",
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {children}
      </Paper>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          display: { md: "none" },
          background: "rgb(var(--color-secondary-800))",
        }}
      >
        <Toolbar>
          <Custom_Menu
            links={role === "ADMIN" ? adminLinks : ProfileLinks}
            onClick={(link) => {
              router.push(link.route);
            }}
          >
            <Custom_Tooltip title="منو">
              <IconButton color="inherit" aria-label="open drawer">
                <MenuIcon />
              </IconButton>
            </Custom_Tooltip>
          </Custom_Menu>
          {displayAddBtn && (
            <Custom_Tooltip title={tooltipTitle || ""}>
              <StyledFab
                color="inherit"
                sx={{
                  background:
                    customIcon?.background || "rgb(var(--color-success))",
                }}
                aria-label="add"
                onClick={(e) => {
                  if (customIcon) {
                    customIcon.fn(e);
                  }
                  if (mainOnClick) {
                    mainOnClick();
                  }
                }}
              >
                {customIcon?.icon || <AddIcon />}
              </StyledFab>
            </Custom_Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Custom_Tooltip title="خانه">
            <IconButton
              onClick={() =>
                router.push(role === "ADMIN" ? "/admin" : "/profile")
              }
              color="inherit"
            >
              <Home />
            </IconButton>
          </Custom_Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
