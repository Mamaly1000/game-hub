import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numConvertor";
import { LineSeriesType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import moment from "jalali-moment";
import React, { useState } from "react";
import Custom_LineChart from "./Custom_LineChart";
import Custom_RangeSlider from "../ui/Custom_RangeSlider";
import { UserInterface } from "@/types/User";

const UsersChart = ({ users = null }: { users: UserInterface[] | null }) => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
  const [addedProductsRange, setAddedProductsRange] = useState<{
    min: number;
    max: number;
  }>({
    max: Math.max(...users!.map((p) => +p.likedProducts.length || 0)),
    min: Math.min(...users!.map((p) => +p.likedProducts.length || 0)),
  });
  const [dateRange, setdateRange] = useState<{ min: number; max: number }>({
    max:
      Math.max(...users!.map((p) => new Date(p.createdAt).getTime() || 0)) ||
      100,
    min:
      Math.min(...users!.map((p) => new Date(p.createdAt).getTime() || 0)) || 0,
  });
  const likedProducts = users
    ?.filter(
      (p) =>
        new Date(p.createdAt).getTime() >= dateRange.min &&
        new Date(p.createdAt).getTime() <= dateRange.max
    )
    .filter(
      (user) =>
        user.likedProducts.length >= addedProductsRange.min &&
        user.likedProducts.length <= addedProductsRange.max
    )
    ?.map((p) => p.likedProducts.length);
  const registeredData = users
    ?.filter(
      (p) =>
        new Date(p.createdAt).getTime() >= dateRange.min &&
        new Date(p.createdAt).getTime() <= dateRange.max
    )
    .filter(
      (user) =>
        user.likedProducts.length >= addedProductsRange.min &&
        user.likedProducts.length <= addedProductsRange.max
    )
    ?.map((p) => new Date(p.createdAt).getTime());
  const series: MakeOptional<LineSeriesType, "type">[] = [
    {
      data: likedProducts,
      color: "rgb(var(--color-primary-900))",
      yAxisKey: "right-axis",
      label: "تعداد مصولات لایک شده",
      valueFormatter: (val: any) => {
        return toPersianNumbersWithComma(val || 0) + " عدد";
      },
    },
    {
      data: registeredData,
      color: "rgb(var(--color-success))",
      yAxisKey: "left-axis",
      label: "تاریخ ثبت نام",
      valueFormatter: (val: any) => {
        return toPersianNumbers(moment(+val).format("jYYYY/jMM/jDD-HH:MM"));
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
        {!!users?.length && (
          <div className="min-w-full md:min-w-[45%] md:max-w-[45%] flex items-center justify-center gap-3 flex-wrap ">
            <Custom_RangeSlider
              max={Math.max(...users!.map((p) => +p.likedProducts.length))}
              min={Math.min(...users!.map((p) => +p.likedProducts.length))}
              minVal={addedProductsRange.min}
              maxVal={addedProductsRange.max}
              setRange={(val) => {
                setAddedProductsRange({
                  min: +val[0],
                  max: +val[1],
                });
              }}
              type="number"
              label="مبلغ سفارش"
            />{" "}
            <Custom_RangeSlider
              max={Math.max(
                ...users!.map((p) => new Date(p.createdAt).getTime() || 0)
              )}
              min={Math.min(
                ...users!.map((p) => new Date(p.createdAt).getTime() || 0)
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
      {users &&
        likedProducts &&
        likedProducts?.length > 0 &&
        registeredData &&
        registeredData?.length > 0 && (
          <Custom_LineChart
            series={series.filter((s) => !hiddenSeries.includes(s.label || ""))}
            xAxis={[
              {
                data: users?.map((user) => user.name || user.email),
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
              },
            ]}
            yAxis={[
              {
                stroke: "rgb(var(--color-primary-900))",
                id: "right-axis",
                scaleType: "linear",
                valueFormatter: (val) => {
                  return toPersianNumbersWithComma(val || 0) + " عدد";
                },
              },
              {
                stroke: "rgb(var(--color-success))",
                id: "left-axis",
                scaleType: "time",
                valueFormatter: (val: any) => {
                  return toPersianNumbers(
                    moment(+val).format("jYYYY/jMM/jDD-HH:MM")
                  );
                },
              },
            ]}
            leftAxis={"left-axis"}
            rightAxis={"right-axis"}
          />
        )}
    </div>
  );
};

export default UsersChart;
