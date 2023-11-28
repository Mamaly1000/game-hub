import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ReactNode from "react";
import RTL_Creator from "./RTL_Creator";
import { StyledMenuComponent } from "@/styles/MenuStyle";

export default function Custom_Menu({
  children,
  links,
  onClick,
}: {
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

  return (
    <RTL_Creator>
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
              minWidth: "140px",
              maxWidth: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            {link.name} {link.icon}
          </MenuItem>
        ))}
      </StyledMenuComponent>
    </RTL_Creator>
  );
}
