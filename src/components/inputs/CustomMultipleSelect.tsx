import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useTransition } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import RTL_Creator from "../ui/RTL_Creator";
import Custom_Button from "./Custom_Button";
import vazirFont from "@/common/local-fonts/VazirFont";
import Custom_HelperText from "./Custom_HelperText";
const CustomMultipleSelect = ({
  label,
  asyncData,
  name,
  formik,
  setDataChange,
}: {
  name: string;
  formik: any;
  setDataChange: (vals: string[]) => void;
  asyncData?: { name: string; data: unknown }[];
  label: string;
}) => {
  const [transition, usetransition] = useTransition();
  const [Data, setData] = React.useState<string[]>([]);
  const [CustomData, setCustomData] = React.useState<string[]>([]);
  const [text, setText] = React.useState<string>("");
  const handleChange = (event: SelectChangeEvent<typeof Data>) => {
    const {
      target: { value },
    } = event;
    if (value[value.length - 1] !== "input") {
      setData(typeof value === "string" ? value.split(",") : value);
      setDataChange(typeof value === "string" ? value.split(",") : value);
    }
  };
  return (
    <RTL_Creator>
      <FormControl
        className=" p-2 bg-primary-100 rounded-lg shadow-xl shadow-primary-400"
        fullWidth
      >
        <InputLabel
          style={vazirFont.style}
          id="demo-simple-select-label"
          sx={{ direction: "rtl" }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Data"
          onChange={handleChange}
          multiple
          value={Data}
          MenuProps={{
            style: {
              background: "rgba(0 0 0 /.3)",
            },
            draggable: true,
          }}
          renderValue={(vals) => {
            return (
              <div className="flex flex-wrap gap-2 items-start justify-start">
                {vals.map((v) => (
                  <span
                    style={vazirFont.style}
                    className="p-1 rounded-lg text-[.8rem] text-white bg-primary-900 drop-shadow-2xl"
                  >
                    {v}
                  </span>
                ))}
              </div>
            );
          }}
        >
          <MenuItem
            className="flex items-center justify-start gap-2"
            value={"input"}
            onClick={undefined}
          >
            <TextField
              id="standard-basic"
              label="نام تگ"
              variant="standard"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              InputLabelProps={{ style: vazirFont.style }}
              inputProps={{
                style: {
                  ...vazirFont.style,
                  borderColor: "rgb(var(--color-primary-900))",
                },
              }}
            />
            <Custom_Button
              onclick={() => {
                usetransition(() => {
                  if (!CustomData.includes(text)) {
                    setCustomData([...CustomData, text]);
                    setData([...Data, text]);
                    setDataChange([...Data, text]);
                  }
                });
              }}
              className="bg-success px-2 py-2 rounded-lg"
            >
              <IoMdAdd />
            </Custom_Button>
            <Custom_Button
              className="bg-error px-2 py-2 rounded-lg"
              onclick={() =>
                usetransition(() => {
                  setText("");
                })
              }
            >
              <IoMdRemove />
            </Custom_Button>
          </MenuItem>
          {!transition ? (
            CustomData.map((val) => (
              <MenuItem style={vazirFont.style} value={val}>
                {val}
              </MenuItem>
            ))
          ) : (
            <MenuItem
              value={"input"}
              className="text-primary-900 font-extrabold"
            >
              ....
            </MenuItem>
          )}
          {asyncData &&
            asyncData.map((item) => {
              return <MenuItem value={item.name}>{item.name}</MenuItem>;
            })}
        </Select>
        {formik.touched[name] &&
          formik.errors[name] && (
            <Custom_HelperText>{formik.errors[name]}</Custom_HelperText>
          )}
      </FormControl>
    </RTL_Creator>
  );
};

export default React.memo(CustomMultipleSelect);
