import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

export default function ReadOnlyDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="تاریخ امروز">
        <StaticDateTimePicker
          readOnly
          sx={{
            maxWidth: "95% !important",
            fontSize: "1rem",
            background: "transparent",
            "*": { color: "#ffffff !important" },
            overflow: "hidden",
            ".Mui-selected": {
              backgroundColor: "rgb(var(--color-primary-900)) !important",
              background: "rgb(var(--color-primary-900)) !important",
            },
            ".MuiTabs-indicator": {
              backgroundColor: "rgb(var(--color-primary-900)) !important",
            },
            "& .MuiDateTimePickerTabs-root": {
              maxWidth: "95% !important",
            },
          }}
          defaultValue={dayjs(new Date(Date.now()))}
          ampmInClock={false}
          slotProps={{
            actionBar: {
              hidden: true,
              sx: { display: "none" },
            },
            toolbar: {
              sx: {
                maxWidth: "100%",
                ".Mui-selected": {
                  backgroundColor: "transparent !important",
                },
                ".MuiPickersToolbar-content": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column-reverse",
                },
                ".MuiTypography-overline": {
                  display: "none",
                },
              },
            },
            layout: {
              sx: {
                maxWidth: "95% !important",
                ".MuiDateCalendar-root": {
                  maxWidth: "95% !important",
                  float: "right",
                  marginInlineEnd: "50px",
                },
              },
            },
          }}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}
