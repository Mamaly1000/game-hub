"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
import {
  AdminPanelSettings,
  Home,
  Login,
  Logout,
  ShoppingBasket,
} from "@mui/icons-material";
import { useLogout } from "@/hook/useLogout";
import InventoryIcon from "@mui/icons-material/Inventory";
import { toPersianNumbers } from "@/utils/numConvertor";
import Badge from "@/components/ui/Badge";
import { useFetchUser } from "@/hook/useAuth";
import { UserInterface } from "@/types/User";
import { Slide, useScrollTrigger } from "@mui/material";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ResponsiveAppBar(props: any) {
  const { mutate } = useLogout();
  const { isLoading, data } = useFetchUser();
  const profile: UserInterface = data?.data.data;
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const pages = [
    { href: "/", text: "خانه", icon: <Home /> },
    { href: "/products", text: "محصولات", icon: <InventoryIcon /> },
    {
      href: "/cart",
      text: "سبد خرید",
      icon: <ShoppingBasket />,
      amount: profile?.cart.payDetail.orderItems.length || 0,
    },
  ];
  const settings = profile
    ? [
        {
          text: "ورود به پنل",
          icon: <AdminPanelSettings />,
          fn: () =>
            profile
              ? router.push(profile.role === "ADMIN" ? `/admin` : "/profile")
              : router.push("/auth"),
        },
        {
          text: "خروج",
          icon: <Logout />,
          fn: () => mutate(),
        },
      ]
    : [
        {
          text: "ورود",
          icon: <Login />,
          fn: () => router.push("/auth"),
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
      <HideOnScroll {...props}>
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
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          minWidth: "120px",
                          position: "relative",
                        }}
                        textAlign="center"
                      >
                        {page.text} {page.icon}{" "}
                        {!!page.amount && (
                          <Badge
                            classname=" absolute end-[10px] bottom-[-50%] w-[20px] h-[20px] rounded-full drop-shadow-2xl bg-primary-900 text-white flex items-center justify-center"
                            text={toPersianNumbers(page.amount)}
                          />
                        )}
                      </Typography>
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
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      position: "relative",
                    }}
                  >
                    {page.text} {page.icon}{" "}
                    {!!page.amount && (
                      <Badge
                        classname=" absolute end-[0] bottom-[0%] w-[20px] h-[20px] rounded-full drop-shadow-2xl bg-primary-900 text-white flex items-center justify-center"
                        text={toPersianNumbers(page.amount)}
                      />
                    )}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="نمایش تنظیمات">
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
                      key={setting?.text}
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
                          minWidth: "120px",
                        }}
                        textAlign="center"
                      >
                        {setting?.text} {setting?.icon}
                      </Typography>
                    </MenuItem>
                  ))}
                </StyledMenuComponent>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </RTL_Creator>
  );
}
export default ResponsiveAppBar;
