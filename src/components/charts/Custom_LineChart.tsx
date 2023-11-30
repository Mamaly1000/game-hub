import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import RTL_Creator from "../ui/RTL_Creator";

const Custom_LineChart = () => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  return (
    <RTL_Creator>
      <LineChart
        height={300}
        series={[
          { data: pData, label: "pv" },
          { data: uData, label: "uv" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{ overflow: "hidden" }}
        tooltip={{
          slotProps: {
            itemContent: {
              sx: {
                background: "red",
              },
            },
          },
        }}
      />
    </RTL_Creator>
  );
};

export default Custom_LineChart;
