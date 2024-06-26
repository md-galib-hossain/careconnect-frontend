// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { getUserInfo } from "../auth.services";
import { decodedToken } from "@/utils/jwt";
export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // cache: "no-store",
      credentials : "include"
    }
  );
  const userInfo = await res.json();
if(userInfo?.data?.accessToken){
  const user = decodedToken(userInfo?.data?.accessToken) 
 console.log(user)
  setAccessToken(userInfo?.data?.accessToken,{redirect : `/dashboard/${user?.role?.toLowerCase()}`})
}

  return userInfo;
};
