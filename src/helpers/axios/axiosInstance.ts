import setAccessToken from "@/app/services/actions/setAccessToken";
import { getNewAccessToken } from "@/app/services/auth.services";
import { authKey } from "@/constants/authKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken && accessToken !== "undefined") {
      config.headers.Authorization = accessToken
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const config = error.config;
    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;

      const accessToken = getFromLocalStorage(authKey);

      if (!accessToken || accessToken === "undefined") {
        // No access token present, and no refresh token available for renewal
        return Promise.reject(error);
      }

      try {
        const response = await getNewAccessToken();
        const newAccessToken = response?.data?.accessToken;
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        setToLocalStorage(authKey, newAccessToken);
        setAccessToken(newAccessToken);

        // Retry the request with the new access token
        return instance(config);
      } catch (refreshError) {
        // Handle token refresh error, e.g., redirect to login page
        return Promise.reject(refreshError);
      }
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      return Promise.reject(responseObject);
    }
  }
);

export { instance };
