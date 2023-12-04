import { adminPaymentInterface } from "@/types/payment";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import { LineSeriesType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import moment from "jalali-moment";
import React, { useEffect, useState } from "react";
import Custom_LineChart from "./Custom_LineChart";
import Custom_RangeSlider from "../ui/Custom_RangeSlider";

const PaymentsChart = ({
  payments = null,
}: {
  payments: adminPaymentInterface[] | null;
}) => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    max: Math.max(...payments!.map((p) => +p.amount || 0)),
    min: Math.min(...payments!.map((p) => +p.amount || 0)),
  });
  const [dateRange, setdateRange] = useState<{ min: number; max: number }>({
    max:
      Math.max(...payments!.map((p) => new Date(p.createdAt).getTime() || 0)) ||
      100,
    min:
      Math.min(...payments!.map((p) => new Date(p.createdAt).getTime() || 0)) ||
      0,
  });
  const chartData = payments
    ?.filter(
      (p) =>
        new Date(p.createdAt).getTime() >= dateRange.min &&
        new Date(p.createdAt).getTime() <= dateRange.max
    )
    ?.map((p) => p.amount)
    .filter((amount) => amount >= priceRange.min && amount <= priceRange.max);
  const series: MakeOptional<LineSeriesType, "type">[] = [
    {
      data: chartData,
      color: "rgb(var(--color-primary-900))",
      yAxisKey: "right-axis",
      label: "مبلغ سفارش",
      valueFormatter: (val: any) => {
        return toPersianNumbersWithComma(val || 0) + " تومان";
      },
    },
  ];

  return (
    <div className="min-w-full min-h-fit ">
      <div className="min-w-full p-5 max-h-[200px] min-h-fit flex items-center justify-center gap-3 flex-wrap">
        <div className="min-w-full md:min-w-[45%] md:max-w-[45%] flex items-start justify-start gap-3 flex-wrap ">
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
        {!!payments?.length && (
          <div className="min-w-full md:min-w-[45%] md:max-w-[45%] flex items-center justify-center gap-3 flex-wrap ">
            <Custom_RangeSlider
              max={Math.max(...payments!.map((p) => +p.amount || 0)) || 100}
              min={Math.min(...payments!.map((p) => +p.amount || 0)) || 0}
              minVal={priceRange.min}
              maxVal={priceRange.max}
              setRange={(val) => {
                setPriceRange({
                  min: +val[0],
                  max: +val[1],
                });
              }}
              type="number"
              label="مبلغ سفارش"
            />{" "}
            <Custom_RangeSlider
              max={Math.max(
                ...payments!.map((p) => new Date(p.createdAt).getTime() || 0)
              )}
              min={Math.min(
                ...payments!.map((p) => new Date(p.createdAt).getTime() || 0)
              )}
              minVal={dateRange.min}
              maxVal={dateRange.max}
              setRange={(val) => {
                setdateRange({
                  min: +val[0],
                  max: +val[1],
                });
              }}
              type="date"
              label="تاریخ سفارش"
            />
          </div>
        )}
      </div>
      {payments && chartData && chartData?.length > 0 && (
        <Custom_LineChart
          series={series.filter((s) => !hiddenSeries.includes(s.label || ""))}
          xAxis={[
            {
              data: payments?.map((p) => new Date(p.createdAt)),
              scaleType: "time",
              labelStyle: {
                fontSize: 14,
                transform: `translateY(90deg)`,
              },
              tickLabelStyle: {
                angle: 90,
                textAnchor: "start",
                fontSize: 10,
              },
              valueFormatter: (val: any) => {
                return toPersianNumbers(
                  moment(val).format("jYYYY/jMM/jDD-MM:HH:SS")
                );
              },
            },
          ]}
          yAxis={[
            {
              stroke: "rgb(var(--color-primary-900))",
              id: "right-axis",
              scaleType: "linear",
              valueFormatter: (val) => {
                return toPersianNumbersWithComma(val || 0) + " تومان";
              },
            },
          ]}
          leftAxis={null}
          rightAxis={"right-axis"}
        />
      )}
    </div>
  );
};

export default PaymentsChart;
