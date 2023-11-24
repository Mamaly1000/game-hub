"use client";
import React, { useEffect, useState } from "react";
import vazirFont from "@/common/local-fonts/VazirFont";
import numConvertor from "@/utils/numConvertor";
import { TextField } from "@mui/material";
import styled, { StyleSheetManager } from "styled-components";
import stylisRTLPlugin from "stylis-plugin-rtl";

const Div = styled.div`
  min-width: 100%;
  * {
    text-align: left !important;
  }
  .css-2y464i-MuiInputBase-root-MuiFilledInput-root::after,
  label:focused {
    border-color: rgb(var(--color-primary-900)) !important;
    color: rgb(var(--color-primary-900)) !important;
    font-family: var(--font-vazir) !important;
  }
`;
const Normal_textfield = ({
  label,
  value,
  setValue,
  name,
  onError,
}: {
  onError: (e: React.ChangeEvent<any>) => { value: boolean; message: string };
  name: string;
  value: string;
  label: string;
  setValue: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const [display, setDisplay] = useState({
    persian_value: "",
    english_value: "",
  });
  const [error, setError] = useState({ value: false, message: "" });
  useEffect(() => {
    setDisplay({
      english_value: numConvertor("en", value),
      persian_value: numConvertor("fa", value),
    });
  }, [value]);
  useEffect(() => {
    if (value && value.length === 0) {
      setDisplay({ english_value: "", persian_value: "" });
    }
  }, [value]);
  const errorHandling = (e: React.ChangeEvent<any>) => {
    if (e.target.value.length === 0) {
      setError(onError(e));
    } else {
      setError({ value: false, message: "" });
    }
  };

  return (
    <StyleSheetManager stylisPlugins={[stylisRTLPlugin]}>
      <Div className=" p-2 bg-primary-100 rounded-lg shadow-xl shadow-primary-400">
        <TextField
          fullWidth
          className="font-vazir"
          type="text"
          id="filled-basic"
          name={name}
          label={label}
          variant="filled"
          error={error.value}
          helperText={error.message}
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
            setValue(e);
            setDisplay({
              persian_value: numConvertor("fa", e.target.value),
              english_value: numConvertor("en", e.target.value),
            });
            errorHandling(e);
          }}
          InputProps={{
            style: vazirFont.style,
          }}
          onFocus={errorHandling}
          onBlur={errorHandling}
          onClick={errorHandling}
          onBeforeInput={errorHandling}
        />
      </Div>
    </StyleSheetManager>
  );
};

export default Normal_textfield;
