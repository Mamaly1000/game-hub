import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { StyledMenuComponent } from "@/styles/MenuStyle";
import { Logout } from "@mui/icons-material";
import { useLogout } from "@/hook/useLogout";

export default function Custom_Menu({
  children,
  links,
  onClick,
  logout = false,
}: {
  logout?: boolean;
  links: { name: string; route: string; icon: React.ReactNode }[];
  children: React.ReactNode;
  onClick: (link: {
    name: string;
    route: string;
    icon: React.ReactNode;
  }) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutateAsync, isPending } = useLogout();
  const logoutHandler = async () => {
    await mutateAsync();
  };
  return (
    <React.Fragment>
      {
        <Button style={{ all: "unset" }} onClick={handleClick}>
          {children}
        </Button>
      }
      <StyledMenuComponent
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {links.map((link) => (
          <MenuItem
            onClick={(e) => {
              handleClose();
              onClick(link);
            }}
            sx={{
              minWidth: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            {link.name} {link.icon}
          </MenuItem>
        ))}
        {logout && (
          <MenuItem
            onClick={logoutHandler}
            sx={{
              minWidth: "100%",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              color: "rgb(var(--color-error))",
            }}
          >
            خروج{" "}
            <Logout
              sx={{
                stroke: "rgb(var(--color-error))",
                fill: "rgb(var(--color-error))",
              }}
            />
          </MenuItem>
        )}
      </StyledMenuComponent>
    </React.Fragment>
  );
}
