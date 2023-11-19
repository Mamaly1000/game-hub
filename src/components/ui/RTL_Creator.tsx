import React, { ReactNode } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import vazirFont from "@/common/local-fonts/VazirFont";

const RTL_Creator = ({ children }: { children: ReactNode }) => {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const rtlTheme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: vazirFont.style.fontFamily,
    },
  });
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default React.memo(RTL_Creator);
