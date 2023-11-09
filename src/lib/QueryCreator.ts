import { ReadonlyURLSearchParams } from "next/navigation";

export const QueryCreator = (
  name: string,
  value: string | string[],
  searchParams: ReadonlyURLSearchParams
): string => {
  const params = new URLSearchParams(searchParams);
  params.set(name, typeof value === "object" ? value + "" : value);
  return params.toString();
};
