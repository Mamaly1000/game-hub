"use client";
import vazirFont from "@/common/local-fonts/VazirFont";
import numConvertor from "@/utils/numConvertor";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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
  const [display, setDisplay] = useState({
    persian_value: "",
    english_value: "",
  });
  useEffect(() => {
    if (value.length === 0) {
      setDisplay({ english_value: "", persian_value: "" });
    }
  }, [value]);
  return (
    <RTL_Creator>
      <Div className=" p-2 bg-primary-100 rounded-lg shadow-xl shadow-primary-400">
        <TextField
          {...formik.getFieldProps(name)}
          fullWidth
          className="font-vazir"
          type="type"
          id="filled-basic"
          label={label}
          variant="filled"
          error={formik.touched[name] && formik.errors[name] ? true : false}
          helperText={
            formik.touched[name] && formik.errors[name] && formik.errors[name]
          }
          style={{ direction: "rtl", fontFamily: vazirFont.style.fontFamily }}
          lang="fa"
          InputLabelProps={{
            dir: "rtl",
            style: {
              direction: "rtl",
              textAlign: "start",
              fontFamily: vazirFont.style.fontFamily,
            },
          }}
          value={display.persian_value}
          FormHelperTextProps={{
            style: {
              fontFamily: vazirFont.style.fontFamily,
              fontWeight: 600,
              fontSize: ".8rem",
            },
          }}
          onChange={(e) => {
            if (setValue && onchangeType === "custom") {
              setValue(e);
            }
            setDisplay({
              persian_value: numConvertor("fa", e.target.value),
              english_value: numConvertor("en", e.target.value),
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

export default Custom_textFiled;
