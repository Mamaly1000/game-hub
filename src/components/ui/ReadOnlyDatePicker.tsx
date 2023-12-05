import * as React from "react";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

export default function ReadOnlyDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="تاریخ امروز">
        <StaticDateTimePicker
          readOnly
          sx={{
            maxWidth: "250px !important",
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
              ampm: false,
            },
            layout: {
              sx: {
                ".MuiDateCalendar-root": {
                  maxWidth: "250px !important",
                },
              },
            },
            tabs: {
              hidden: true,
            },
            nextIconButton: {
              hidden: true,
              disabled: true,
              sx: { display: "none" },
            },
            previousIconButton: {
              hidden: true,
              sx: { display: "none" },
              disabled: true,
            },
            switchViewButton: {
              hidden: true,
              disabled: true,
              sx: { display: "none" },
            },
            calendarHeader: {
              sx: {
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              reduceAnimations: true,
              disabled: true,
              disableFuture: true,
              disablePast: true,
            },
            day: {
              classes: {
                selected:
                  "max-w-[30px] min-w-[30px] max-h-[30px] min-h-[30px] rounded-full flex items-center justify-center",
              },
              disabled: true,
              sx: {
                cursor: "default !important",
              },
            },
          }}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}
