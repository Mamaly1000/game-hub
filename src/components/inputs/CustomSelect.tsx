import { ImportContactsRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

const CustomSelect = () => {
  const [age, setAge] = React.useState<string[]>([]);
  const [text, setText] = useState("");
  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    const {
      target: { value },
    } = event;
    setAge(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const addSelect = () => {
    setAge([...age, text]);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={handleChange}
        multiple
        value={age}
        input={
          <Box>
            <Input
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button onClick={() => addSelect()}>
              <ImportContactsRounded />
            </Button>
            <Box>
              {age.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </Box>
          </Box>
        }
        inputComponent="address"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
