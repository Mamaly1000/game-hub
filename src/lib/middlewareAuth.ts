import { checkOTP_responseType } from "@/types/OTP";
import { UserInterface } from "@/types/User";
import { NextRequest } from "next/server";

export const middlewareAuth = async (req: NextRequest) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/user/profile`;
  const TOKENCOOKIE = `${req.cookies.get("accessToken")?.name}=${
    req.cookies.get("accessToken")?.value
  }; ${req.cookies.get("accessToken")?.name}=${
    req.cookies.get("accessToken")?.value
  }`;
  const fetchOptions: RequestInit = {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: TOKENCOOKIE,
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
