import { checkOTP_responseType } from "@/types/OTP";
import { toStringCookies } from "@/utils/toStringCookies";
import { NextRequest } from "next/server";

export const middlewareAuth = async (req: NextRequest) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/user/profile`;
  const fetchOptions: RequestInit = {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: toStringCookies(req.cookies),
    },
  };
  let UserData = await fetch(url, fetchOptions)
    .then((res) => res.json())
    .then((res: checkOTP_responseType) => {
      if (res.statusCode === 200) {
        return res?.data?.user;
      }
      if (res.statusCode === 401) {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.response);
      return null;
    });

  return { UserData };
};
