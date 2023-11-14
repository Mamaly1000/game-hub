import vazirFont from "@/common/local-fonts/VazirFont";
import numConvertor, { toPersianNumbers } from "@/utils/numConvertor";
import { TextField } from "@mui/material";
import React, { useState, useTransition } from "react";
import styled from "styled-components";
import RTL_Creator from "../ui/RTL_Creator";

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
}: {
  onchangeType: "custom" | "formik";
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

  return (
    <RTL_Creator>
      <Div className=" p-2 bg-primary-100 rounded-lg shadow-xl shadow-primary-400">
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
            setTransition(() => {
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
            });
          }}
          InputProps={{
            style: vazirFont.style,
          }}
        />
      </Div>
    </RTL_Creator>
  );
};

export default React.memo(Custom_textFiled);
