import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useTransition } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Custom_Button from "./Custom_Button";
import vazirFont from "@/common/local-fonts/VazirFont";
import Custom_HelperText from "./Custom_HelperText";
import { productInterface } from "@/types/product";
const CustomMultipleSelect = ({
  label,
  asyncData,
  name,
  formik,
  setDataChange,
  displayInput = true,
  valueType = "tag",
}: {
  valueType?: "tag" | "product";
  displayInput?: boolean;
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
      setData(
        [
          ...(typeof value === "string"
            ? value.split(",").filter((i) => i !== "" || i.length !== 0)
            : value.filter((i) => i !== "" || i.length !== 0)),
        ].filter((i) => i !== "" || i.length !== 0)
      );
      setDataChange([
        ...(typeof value === "string"
          ? value.split(",").filter((i) => i !== "" || i.length !== 0)
          : value.filter((i) => i !== "" || i.length !== 0)),
      ]);
    }
  };

  useEffect(() => {
    if (formik.values[name] && valueType !== "product") {
      setData(formik.values[name]);
    }
    if (formik.values[name] && valueType === "product") {
      setData(formik.values[name].map((p: productInterface) => p.title));
      formik.setFieldValue(
        name,
        formik.values[name].map((p: productInterface) => p._id)
      );
    }
  }, []);

  return (
    <FormControl
      className=" p-2 bg-primary-100 rounded-lg shadow-xl shadow-primary-400 dark:shadow-none dark:bg-mid_transparent dark:text-white text-secondary-300"
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
        renderValue={(vals) => {
          return (
            <div className="flex flex-wrap gap-2 items-start justify-start">
              {vals
                .filter((i) => i.length > 0)
                .map((v) => (
                  <span
                    key={v}
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
        {displayInput && (
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
                    setCustomData(
                      [...CustomData, text].filter(
                        (i) => i !== "" || i.length !== 0
                      )
                    );
                    setData(
                      [...Data, text].filter((i) => i !== "" || i.length !== 0)
                    );
                    setDataChange(
                      [...Data, text].filter((i) => i !== "" || i.length !== 0)
                    );
                    setText("");
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
        )}
        {!transition ? (
          CustomData.map((val, i) => (
            <MenuItem key={val + i} style={vazirFont.style} value={val}>
              {val}
            </MenuItem>
          ))
        ) : (
          <MenuItem value={"input"} className="text-primary-900 font-extrabold">
            ....
          </MenuItem>
        )}
        {asyncData &&
          asyncData.map((item) => {
            return (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
      </Select>
      {formik.touched[name] && formik.errors[name] && (
        <Custom_HelperText>{formik.errors[name]}</Custom_HelperText>
      )}
    </FormControl>
  );
};

export default React.memo(CustomMultipleSelect);
