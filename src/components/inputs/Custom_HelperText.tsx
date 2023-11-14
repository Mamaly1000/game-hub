import React, { ReactNode } from "react";
import vazirFont from "@/common/local-fonts/VazirFont";
import { FormHelperText } from "@mui/material";

const Custom_HelperText = ({ children }: { children: ReactNode }) => {
  return (
    <FormHelperText
      style={{
        ...vazirFont.style,
        color: "rgb(var(--color-error))",
        fontSize: ".75rem",
        fontWeight: "800",
      }}
    >
      {children}
    </FormHelperText>
  );
};

export default Custom_HelperText;
