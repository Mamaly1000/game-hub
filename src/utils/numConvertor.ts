"use client";
export default function numConvertor(lang: "fa" | "en", n: string): string {
  if (n.length > 0 && n && lang) {
    return lang === "en" ? toenglishNumber(n) : toPersianNumbers(n);
  } else {
    return "";
  }
}
const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianNumbersWithComma(n: any) {
  const numWithCommas = numberWithCommas(n);
  const persianNumber = toPersianNumbers(numWithCommas);
  return persianNumber;
}

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toPersianNumbers(n: any) {
  return n.toString().replace(/\d/g, (x: any) => farsiDigits[parseInt(x)]);
}

const toenglishNumber = (string: string): string => {
  return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (c): string => {
    return (c.charCodeAt(0) & 0xf) + "";
  });
};
