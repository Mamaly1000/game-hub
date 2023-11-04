import LocalFont from "next/font/local";

const vazirFont = LocalFont({
  src: [
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-Black.ttf",
      style: "normal",
      weight: "900",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-ExtraLight.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "./../../../public/fonts/vazir/static/Vazirmatn-Thin.ttf",
      style: "normal",
      weight: "100",
    },
  ],
  variable: "--font-vazir",
  style: "normal",
  display: "block",
});
export default vazirFont;
