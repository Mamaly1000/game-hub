import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const toStringCookies = (
  cookies: RequestCookies | ReadonlyRequestCookies
): string => {
  let str = "";
  cookies.getAll().forEach((element: any) => {
    str += `${element.name}=${element.value};`;
  });
  return str;
};
