import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";

export const storeUserInfo = (accessToken:string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken: string | any = getFromLocalStorage(authKey);
  
  if (authToken && authToken !== 'undefined') {
    const decodedData: any = decodedToken(authToken);
    return { ...decodedData, role: decodedData?.role?.toLowerCase() };
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  const authToken: any = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};


export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
     url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     withCredentials: true,
  });
};




