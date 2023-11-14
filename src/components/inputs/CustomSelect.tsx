import {
  FormControl, 
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react"; 
import vazirFont from "@/common/local-fonts/VazirFont";
import Custom_HelperText from "./Custom_HelperText";

const CustomSelect = ({
  label,
  asyncData,
  onclickHandler,
  name,
  formik,
  PreData,
}: {
  PreData?: { name: string; data: any };
  formik: any;
  name: string;
  label: string;
  asyncData?: { name: string; data: any }[];
  onclickHandler: (val: any) => void;
}) => {
  const [Data, setData] = React.useState<string>("");
  const handleChange = (event: SelectChangeEvent<typeof Data>) => {
    const {
      target: { value },
    } = event;
    if (value !== Data) {
      setData(value);
    } else {
      setData("");
    }
  };
  useEffect(() => {
    if (PreData) {
      setData(PreData.name);
      formik.setFieldValue(name, PreData.data._id);
    }
  }, []);
  return (
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
        value={Data}
        inputProps={{ style: vazirFont.style }}
        renderValue={(val) => {
          return <span style={vazirFont.style}>{val}</span>;
        }}
      >
        {asyncData &&
          asyncData.map((item) => {
            return (
              <MenuItem
                onClick={() => onclickHandler(item.data)}
                value={item.name}
                key={item.name}
                style={vazirFont.style}
              >
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

export default CustomSelect;
