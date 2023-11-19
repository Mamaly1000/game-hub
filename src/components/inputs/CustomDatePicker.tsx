import * as React from "react";
import { DatePicker, LocalizationProvider, faIR } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function CustomDatePicker({
  label,
  formik,
  changeHandler,
  value,
  name,
}: {
  name: string;
  value: Date | null | string;
  changeHandler: (val: Date) => void;
  formik: any;
  label: string;
}) {
  const [date, setDate] = React.useState<any>("");

  React.useEffect(() => {
    if (!value) {
      setDate("");
    }
  }, [value]);
  React.useEffect(() => {
    if (value) {
      setDate(typeof value === "string" ? value : value.getTime());
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...formik.getFieldProps(name)}
        onChange={(val: any) => {
          setDate(val);
          changeHandler(dayjs(val).toDate());
        }}
        label={label}
        defaultValue={dayjs(new Date())}
        value={dayjs(date)}
        localeText={
          faIR.components.MuiLocalizationProvider.defaultProps.localeText
        }
        formatDensity="spacious"
        slotProps={{
          textField: {
            helperText:
              formik.touched[name] && formik.errors[name]
                ? formik.errors[name]
                : "",
            variant: "filled",
            style: {
              borderColor: "rgb(var(--color-primary-900))",
              minWidth: "100%",
            },
          },
          layout: {
            sx: {
              "*": {
                color: "#ffffff !important",
              },
              backgroundColor: "rgb(var(--color-secondary-900)) !important",
              ".Mui-selected": {
                backgroundColor: "rgb(var(--color-primary-900)) !important",
              },
              ".Mui-disabled": {
                opacity: ".5 !important",
              },
            },
          },
          day: {
            sx: {
              backgroundColor: "rgb(var(--color-secondary-700)) !important",
              color: "#ffffff !important",
            },
          },
        }}
        className=" p-2 bg-primary-100 rounded-lg shadow-xl shadow-primary-400 dark:shadow-none dark:bg-mid_transparent dark:text-white text-secondary-300"
        disablePast
        displ
      />
    </LocalizationProvider>
  );
}
