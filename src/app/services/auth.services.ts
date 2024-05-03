import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return { ...decodedData, role: decodedData?.role.toLowerCase() };
  }
};

export const isLoggedIn = () => {
  const authToken: any = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};
export const removeUser = () => {
  console.log("kk")
  return removeFromLocalStorage(authKey);
};