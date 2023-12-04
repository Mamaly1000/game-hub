"use client";
import React, { useEffect, useState } from "react";
import vazirFont from "@/common/local-fonts/VazirFont";
import numConvertor from "@/utils/numConvertor";
import { TextField } from "@mui/material";
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
    if (value && value.length === 0) {
      setDisplay({ english_value: "", persian_value: "" });
    } else {
      setDisplay({
        english_value: numConvertor("en", value),
        persian_value: numConvertor("fa", value),
      });
    }
  }, [value]);
  const errorHandling = (e: React.ChangeEvent<any>) => {
    if (e.target.value && e.target.value.length === 0) {
      setError(onError(e));
    } else {
      setError({ value: false, message: "" });
    }
  };

  return (
    <Div className=" p-2 bg-mid_transparent text-white rounded-lg text-start ">
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
        style={vazirFont.style}
        InputLabelProps={{
          style: {
            fontFamily: vazirFont.style.fontFamily,
            color: "#ffffff",
          },
        }}
        value={display.persian_value}
        FormHelperTextProps={{
          style: vazirFont.style,
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
          style: {
            ...vazirFont.style,
            color: "#ffffff",
          },
        }}
        onFocus={errorHandling}
        onBlur={errorHandling}
        onClick={errorHandling}
        onBeforeInput={errorHandling}
      />
    </Div>
  );
};

export default Normal_textfield;
