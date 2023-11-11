"use client";
import starkString from "starkstring";
export default function numConvertor(lang: "fa" | "en", n: string): string {
  if (n.length > 0 && n && lang) {
    return lang === "en"
      ? starkString(n).englishNumber().toString()
      : starkString(n).persianNumber().toString();
  } else {
    return "";
  }
}
const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianNumbersWithComma(n: any) {
  const numWithCommas = numberWithCommas(n); // 1000,2343
  const persianNumber = toPersianNumbers(numWithCommas);
  return persianNumber;
}

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toPersianNumbers(n: any) {
  return n.toString().replace(/\d/g, (x: any) => farsiDigits[parseInt(x)]);
}
