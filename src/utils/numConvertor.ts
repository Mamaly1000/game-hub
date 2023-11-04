import starkString from "starkstring";
export default function numConvertor(lang: "fa" | "en", n: string): string {
  if (n.length > 0) {
    return lang === "en"
      ? starkString(n).englishNumber().toString()
      : starkString(n).persianNumber().toString();
  } else {
    return "";
  }
}
