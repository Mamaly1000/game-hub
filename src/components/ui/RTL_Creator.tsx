"use client";
import React, { ReactNode } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import vazirFont from "@/common/local-fonts/VazirFont";

const rtlTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: vazirFont.style.fontFamily,
    allVariants: {
      color: "white", 
      stroke: "white",
    },
  },
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const RTL_Creator = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={rtlTheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};

export default React.memo(RTL_Creator);
