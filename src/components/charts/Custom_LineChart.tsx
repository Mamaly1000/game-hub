import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import RTL_Creator from "../ui/RTL_Creator";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { LineSeriesType } from "@mui/x-charts/models/seriesType";
import { AxisConfig } from "@mui/x-charts";
const sample = [1, 10, 30, 50, 70, 90, 100, 90, 100, 456];

const Custom_LineChart = ({
  series = [],
  yAxis,
  xAxis,
  height = 500,
  leftAxis,
  rightAxis,
}: {
  leftAxis: string | null;
  rightAxis: string | null;
  yAxis?: MakeOptional<AxisConfig, "id">[] | undefined;
  xAxis?: MakeOptional<AxisConfig, "id">[] | undefined;
  series?: MakeOptional<LineSeriesType, "type">[];
  height?: number;
}) => {
  return (
    <RTL_Creator>
      <LineChart
        xAxis={xAxis}
        yAxis={yAxis}
        series={series}
        leftAxis={leftAxis}
        rightAxis={rightAxis}
        height={height}
        tooltip={{
          classes: {
            table:
              "bg-secondary-900 border-[2px] max-w-[200px] sm:max-w-[300px] md:max-w-[400px]",
            valueCell: "text-[.5rem]",
            cell: "text-[.5rem]",
            markCell: "text-[.5rem]",
            mark: "text-[.5rem]",
          },
        }}
        axisHighlight={{
          x: "line",
          y: "line",
        }}
        slotProps={{
          legend: { hidden: true },
          axisLine: {
            color: "#ffffff",
            stroke: "#ffffff",
          },
          lineHighlight: {
            style: {
              color: "#ffffff",
              fill: "#ffffff",
              stroke: "#ffffff",
            },
          },
        }}
      />
    </RTL_Creator>
  );
};

export default Custom_LineChart;
