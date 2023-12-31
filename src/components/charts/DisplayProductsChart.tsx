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
import Custom_RangeSlider from "../ui/Custom_RangeSlider";

const DisplayProductsChart = ({
  products = null,
}: {
  products: productInterface[] | null;
}) => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
  const [priceRange, setpriceRange] = useState<{
    min: number;
    max: number;
  }>({
    max: Math.max(...products!.map((p) => +p.price || 0)),
    min: Math.min(...products!.map((p) => +p.price || 0)),
  });
  const [dateRange, setdateRange] = useState<{ min: number; max: number }>({
    max:
      Math.max(...products!.map((p) => new Date(p.createdAt).getTime() || 0)) ||
      100,
    min:
      Math.min(...products!.map((p) => new Date(p.createdAt).getTime() || 0)) ||
      0,
  });
  const productsPrices = products
    ?.filter(
      (p) =>
        new Date(p.createdAt).getTime() >= dateRange.min &&
        new Date(p.createdAt).getTime() <= dateRange.max
    )
    .filter(
      (product) =>
        +product.price >= priceRange.min && +product.price <= priceRange.max
    )
    .map((p) => p.price);
  const createdProductsDate = products
    ?.filter(
      (p) =>
        new Date(p.createdAt).getTime() >= dateRange.min &&
        new Date(p.createdAt).getTime() <= dateRange.max
    )
    .filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    )
    ?.map((p) => new Date(p.createdAt).getTime());
  const series: MakeOptional<LineSeriesType, "type">[] = [
    {
      data: productsPrices,
      color: "rgb(var(--color-primary-900))",
      yAxisKey: "right-axis",
      label: "قیمت محصول",
      valueFormatter: (val: any) => {
        return toPersianNumbersWithComma(val) + " تومان";
      },
    },
    {
      data: createdProductsDate,
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
        {!!products?.length && (
          <div className="min-w-full md:min-w-[45%] md:max-w-[45%] flex items-center justify-center gap-3 flex-wrap ">
            <Custom_RangeSlider
              max={Math.max(...products!.map((p) => +p.price))}
              min={Math.min(...products!.map((p) => +p.price))}
              minVal={priceRange.min}
              maxVal={priceRange.max}
              setRange={(val) => {
                setpriceRange({
                  min: +val[0],
                  max: +val[1],
                });
              }}
              type="number"
              label="قیمت محصول"
            />{" "}
            <Custom_RangeSlider
              max={Math.max(
                ...products!.map((p) => new Date(p.createdAt).getTime() || 0)
              )}
              min={Math.min(
                ...products!.map((p) => new Date(p.createdAt).getTime() || 0)
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
              label="تاریخ ایجاد محصول"
            />
          </div>
        )}
      </div>
      {products &&
        productsPrices &&
        productsPrices?.length > 0 &&
        createdProductsDate &&
        createdProductsDate?.length > 0 && (
          <Custom_LineChart
            series={series.filter((s) => !hiddenSeries.includes(s.label || ""))}
            xAxis={[
              {
                data: products
                  ?.filter(
                    (p) =>
                      new Date(p.createdAt).getTime() >= dateRange.min &&
                      new Date(p.createdAt).getTime() <= dateRange.max
                  )
                  .filter(
                    (product) =>
                      product.price >= priceRange.min &&
                      product.price <= priceRange.max
                  )
                  .map((p) => p.title),
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
        )}
    </div>
  );
};

export default DisplayProductsChart;
