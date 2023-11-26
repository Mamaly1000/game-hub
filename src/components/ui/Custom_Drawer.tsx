import { DrawerHeader, StyledSweapDrawer } from "@/styles/DrawerStyle";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
const drawerBleeding = 56;

const Custom_Drawer = ({
  open,
  setOpen,
  children,
  header,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  header: string;
}) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <StyledSweapDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerHeader>{header}</DrawerHeader>
      {children}
    </StyledSweapDrawer>
  );
};

export default Custom_Drawer;
