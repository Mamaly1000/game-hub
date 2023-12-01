import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import moment from "jalali-moment";

export default function Custom_RangeSlider({
  min,
  max,
  setRange,
  type,
  minVal,
  maxVal,
  label,
}: {
  type: "number" | "date";
  min: any;
  max: any;
  setRange: (val: number[]) => void;
  minVal: any;
  maxVal: any;
  label: string;
}) {
  const [value, setValue] = React.useState([max, min]);
  const handleChange = (newValue: number | number[]) => {
    setRange(newValue as number[]);
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300, fontSize: ".8rem" }}>
      <Slider
        max={max}
        min={min}
        value={[minVal, maxVal]}
        valueLabelDisplay="auto"
        onChangeCommitted={(_e, val) => {
          handleChange(val as number[]);
        }}
        valueLabelFormat={(val) => {
          return type === "number"
            ? toPersianNumbersWithComma(val) + " تومان"
            : toPersianNumbers(moment(val).format("jYYYY/jMM/jDD-MM:HH:SS"));
        }}
        sx={{ color: "rgb(var(--color-primary-900))" }}
      />
      {label} :
      <span>
        {type === "number"
          ? toPersianNumbersWithComma(minVal) + " تومان"
          : toPersianNumbers(moment(minVal).format("jYYYY/jMM/jDD-MM:HH:SS"))}
      </span>{" "}
      -{" "}
      <span>
        {type === "number"
          ? toPersianNumbersWithComma(maxVal) + " تومان"
          : toPersianNumbers(moment(maxVal).format("jYYYY/jMM/jDD-MM:HH:SS"))}
      </span>
    </Box>
  );
}
