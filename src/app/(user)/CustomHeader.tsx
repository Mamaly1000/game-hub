"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import vazirFont from "@/common/local-fonts/VazirFont";
import { useRouter } from "next/navigation";
import RTL_Creator from "@/components/ui/RTL_Creator";
import { StyledMenuComponent } from "@/styles/MenuStyle";
import { CgProductHunt } from "react-icons/cg";
import {
  AdminPanelSettings,
  Home,
  Logout,
  ShoppingBasket,
} from "@mui/icons-material";
import { useLogout } from "@/hook/useLogout";

function ResponsiveAppBar() {
  const { mutate } = useLogout();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const pages = [
    { href: "/", text: "خانه", icon: <Home /> },
    { href: "/products", text: "محصولات", icon: <CgProductHunt /> },
    { href: "/cart", text: "سبد خرید", icon: <ShoppingBasket /> },
  ];
  const settings = [
    {
      text: "ورود به پنل",
      icon: <AdminPanelSettings />,
      fn: () => router.push("/admin"),
    },
    {
      text: "خروج",
      icon: <Logout />,
      fn: () => mutate(),
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (href?: string | undefined | null) => {
    setAnchorElNav(null);
    href && router.push(href);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <RTL_Creator>
      <AppBar
        sx={{
          background: "rgb(var(--color-secondary-800))",
          ...vazirFont.style,
          top: 0,
          left: 0,
        }}
        position="sticky"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GAME-HUB
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <StyledMenuComponent
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{
                  display: { xs: "block", md: "none" },
                  background: "rgba(0 0 0 /.3)",
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={() => handleCloseNavMenu(page.href)}
                  >
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              </StyledMenuComponent>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GAME-HUB
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.text}
                  onClick={() => handleCloseNavMenu(page.href)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.text}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://avatars.githubusercontent.com/u/105161078?v=4"
                  />
                </IconButton>
              </Tooltip>
              <StyledMenuComponent
                sx={{ mt: "45px", background: "rgba(0 0 0 /.3)" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.text}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.fn();
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minWidth: "100%",
                      }}
                      textAlign="center"
                    >
                      {setting.text} {setting.icon}
                    </Typography>
                  </MenuItem>
                ))}
              </StyledMenuComponent>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </RTL_Creator>
  );
}
export default ResponsiveAppBar;
