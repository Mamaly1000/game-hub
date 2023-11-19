import { createTheme } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useMemo } from "react";
import { ThemeProvider, useTheme } from "styled-components";

const CustumJalaliDatePicker = () => {
  const existingTheme = useTheme();
  const [date, setDate] = React.useState<any>("");
  const theme = useMemo(() => createTheme(existingTheme), [existingTheme]);
  return (
    <ThemeProvider theme={theme}>
      {date}
      <LocalizationProvider
        adapterLocale="fa"
        dateAdapter={AdapterMomentJalaali}
      >
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label="Date Picker"
            onChange={(val, ctx) => {
              console.log(val);
              console.log(ctx);
            }}
          />
        </DemoContainer>{" "}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CustumJalaliDatePicker;
