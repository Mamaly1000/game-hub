import { productInterface } from "@/types/product";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import moment from "jalali-moment";
import React, { useState } from "react";
import Custom_LineChart from "./Custom_LineChart";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { LineSeriesType } from "@mui/x-charts";

const DisplayProductsChart = ({
  products = null,
}: {
  products: productInterface[] | null;
}) => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
  const series: MakeOptional<LineSeriesType, "type">[] = [
    {
      data: products?.map((p) => p.price),
      color: "rgb(var(--color-primary-900))",
      yAxisKey: "right-axis",
      label: "قیمت محصول",
      valueFormatter: (val: any) => {
        return toPersianNumbersWithComma(val) + " تومان";
      },
    },
    {
      data: products?.map((p) => new Date(p.createdAt).getTime()),
      color: "rgb(var(--color-success))",
      yAxisKey: "left-axis",
      label: "تاریخ ایجاد محصول",
      valueFormatter: (val: string | number) => {
        return toPersianNumbers(moment(+val).format("jYYYY/jMM/jDD"));
      },
    },
  ];

  return (
    <div className="min-w-full min-h-fit ">
      <div className="min-w-full flex items-start justify-start gap-3 flex-wrap p-5 max-h-[100px]">
        {series.map(
          (d) =>
            !!d.label && (
              <span
                key={d.id}
                className={`px-3 py-2 rounded-lg text-white font-semibold capitalize cursor-pointer ${
                  hiddenSeries.includes(d?.label) ? "opacity-50" : ""
                }`}
                onClick={() => {
                  if (d.label) {
                    if (hiddenSeries.includes(d.label)) {
                      setHiddenSeries(
                        [...hiddenSeries].filter((s) => s !== d.label)
                      );
                    } else {
                      setHiddenSeries([...hiddenSeries, d.label]);
                    }
                  }
                }}
                style={{ background: d.color }}
              >
                {d.label}
              </span>
            )
        )}
      </div>
      <Custom_LineChart
        series={series.filter((s) => !hiddenSeries.includes(s.label || ""))}
        xAxis={[
          {
            data: products?.map((p) => p.title),
            scaleType: "band",
            labelStyle: {
              fontSize: 14,
              transform: `translateY(90deg)`,
            },
            tickLabelStyle: {
              angle: 90,
              textAnchor: "start",
              fontSize: 10,
            },
            valueFormatter: (val) => {
              return (val + "").slice(0, 20);
            },
          },
        ]}
        yAxis={[
          {
            stroke: "rgb(var(--color-primary-900))",
            id: "right-axis",
            scaleType: "linear",
            valueFormatter: (val) => {
              return toPersianNumbersWithComma(val) + " تومان";
            },
          },
          {
            stroke: "rgb(var(--color-success))",
            id: "left-axis",
            scaleType: "utc",
            valueFormatter: (val) => {
              return toPersianNumbers(moment(+val).format("jYYYY/jMM/jDD"));
            },
          },
        ]}
        leftAxis={"left-axis"}
        rightAxis={"right-axis"}
      />
    </div>
  );
};

export default DisplayProductsChart;
