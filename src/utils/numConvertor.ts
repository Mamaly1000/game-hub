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
