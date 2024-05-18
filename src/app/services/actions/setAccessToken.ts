"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authKey } from "@/constants/authKey";

const setAccessToken = (token: string, option?: any) => {
  cookies().set(authKey, token);
  if (option && option.redirect) {
    redirect(option.redirect);
  }
};
export default setAccessToken;
