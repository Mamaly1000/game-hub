import vazirFont from "@/common/local-fonts/VazirFont";
import numConvertor, { toPersianNumbers } from "@/utils/numConvertor";
import { TextField } from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import styled from "styled-components";

const Div = styled.div`
  min-width: 100%;

  .css-2y464i-MuiInputBase-root-MuiFilledInput-root::after,
  label:focused {
    border-color: rgb(var(--color-primary-900)) !important;
    color: rgb(var(--color-primary-900)) !important;
    font-family: var(--font-vazir) !important;
  }
`;

const Custom_textFiled = ({
  label,
  formik,
  value,
  setValue,
  name,
  type,
  onchangeType,
  real_type = "text",
}: {
  real_type?: "text" | "number";
  onchangeType?: "custom" | "formik";
  type: React.HTMLInputTypeAttribute | undefined;
  name: string;
  value: string;
  label: string;
  formik?: any;
  setValue?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const [_transition, setTransition] = useTransition();
  const [display, setDisplay] = useState({
    persian_value: "",
    english_value: "",
  });

  useEffect(() => {
    if (value === "" || value.length === 0) {
      setDisplay({ english_value: "", persian_value: "" });
    }
    if (!!value || value.length > 0) {
      setDisplay({
        english_value: numConvertor("en", value),
        persian_value: toPersianNumbers(value),
      });
    }
  }, [value]);

  return (
    <Div className="p-2 rounded-lg bg-mid_transparent text-white">
      <TextField
        {...formik.getFieldProps(name)}
        fullWidth
        type={type}
        label={label}
        variant="filled"
        error={formik.touched[name] && formik.errors[name] ? true : false}
        helperText={
          formik.touched[name] && formik.errors[name] && formik.errors[name]
        }
        InputLabelProps={{
          style: vazirFont.style,
        }}
        value={display.persian_value}
        FormHelperTextProps={{
          style: {
            ...vazirFont.style,
            fontSize: ".8rem",
          },
        }}
        onChange={(e) => {
          if (real_type === "text") {
            if (setValue) {
              setValue(e);
            }
            if (!setValue) {
              formik.setFieldValue(name, numConvertor("en", e.target.value));
            }
            setDisplay({
              english_value: numConvertor("en", e.target.value),
              persian_value: toPersianNumbers(e.target.value),
            });
          }
          if (real_type === "number") {
            if (!isNaN(+numConvertor("en", e.target.value))) {
              if (setValue) {
                setValue(e);
              }
              if (!setValue) {
                formik.setFieldValue(name, numConvertor("en", e.target.value));
              }
              setDisplay({
                english_value: numConvertor("en", e.target.value),
                persian_value: toPersianNumbers(e.target.value),
              });
            }
          }
        }}
        InputProps={{
          style: vazirFont.style,
        }}
      />
    </Div>
  );
};

export default React.memo(Custom_textFiled);
